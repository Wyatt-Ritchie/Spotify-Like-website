$(document).ready(function(){
    
    let signedIn = false;
    let play = false;
    let favoutite = false;
    let mute = false;
    let hidden = true;
    let leftHidden = true;
    var elapsed_time = 0;
    updateSignInButton();
    var timer = null;
    var progBarIncrementVal = 0.0;

    $('#about-bar').hide();
    $('#side-bar').hide();
    $('.fa-play-circle').hide();

    $('#sign-in-button').click(function(){
        if(signedIn == false){
            signedIn = true;
            updateSignInButton();
        }else{
            signedIn = false;
            updateSignInButton();
        }
        console.log("Clicked");
    })
    $('#pauseAndPlay').click(function(){
        var player = document.getElementById('player')
        if(play == false){
            updatePlayButton();
            play = true;
            player.play();
            timer = setInterval(incrementSeconds, 1000);
        }else{
            updatePlayButton();
            play = false;
            player.pause();
            if(timer != null) {
                clearInterval(timer);
            }
        }
        console.log("Clicked");
    })
    $('#favourite').click(function(){
        updateFavouriteButton();
    })
    $('#volume').click(function(){
        updateVolumeButton();
    })

    $('#side-menu-button').click(function(){
        if(leftHidden == false){
            $('#side-bar').hide();
            leftHidden = true;
        }else{
            $('#side-bar').show();
            leftHidden = false;
        }
    })

    $('.images').parent().hover(function(){
        let artistName = $(this).children("#artist").text();
        let songName = $(this).children("#song").text();
        let imgSrc = $(this).children("img").attr('src');
        
        $('#info-bar-image').attr('src', imgSrc);
        document.getElementById('artist-name').innerHTML = artistName;
        document.getElementById('song-name').innerHTML = songName;
       
        if(hidden == false){
            $('#about-bar').hide();
            $(this).children('.fa-play-circle').hide();
            $(this).attr('style', 'background-color: rgb(26, 21, 29);  border: 1px solid  rgb(26, 21, 29);')

            hidden = true;
        }else{
            $('#about-bar').show();
            $(this).children('.fa-play-circle').show();
            $(this).attr('style', 'background-color: rgb(104, 45, 63); border: 1px solid pink;')
            hidden = false;
        }
        console.log("hovering" + " " + imgSrc);
    });
    $('.images').parent().click(function(){
        let imgSrc = $(this).children("img").attr('src');
        let artistName = $(this).children("#artist").text();
        let songName = $(this).children("#song").text();

        $('#playing-song').attr('src', imgSrc);
        document.getElementById('footer-artist-name').innerHTML = artistName;
        document.getElementById('footer-song-name').innerHTML = songName;
        document.getElementById('play-bar-song-name').innerHTML = songName;

        
        var player = document.getElementById('player')
        player.src = $(this).children("#srcPath").text();

        // Convert duration to minutes and seconds
        let duration = $(this).children("#duration").text();
        var minutes = Math.floor(duration / 60);
        var seconds = duration - minutes * 60;

        // Set total-time
        if(seconds.toString().length == 1) {
            $('#total-time').html(minutes + ":" + "0" + seconds);
        } else {
            $('#total-time').html(minutes + ":" + seconds);
        }

        // Reset the elapsed time
        $('#elapsed-time').html("0:00");
        elapsed_time = 0;
        if(timer != null) {
            clearInterval(timer);
        }

        // Start the timer
        timer = setInterval(incrementSeconds, 1000);

        // Set progress bar increment value and reset the progress bar
        progBarIncrementVal = 100 / duration;
        $('#bar').val(0);

        // Play the song and update the play button
        player.play();
        play = false;
        updatePlayButton();
        play = true;
    });

    function incrementSeconds() {
        elapsed_time += 1;
        var minutes = Math.floor(elapsed_time / 60);
        var seconds = elapsed_time - minutes * 60;
        if(seconds.toString().length == 1) {
            $('#elapsed-time').html(minutes + ":" + "0" + seconds);
        } else {
            $('#elapsed-time').html(minutes + ":" + seconds);
        }
        var curr_val = $('#bar').val();
        var new_val = Number(curr_val) + progBarIncrementVal;
        $('#bar').val(new_val);
    }

    function updateSignInButton(){
        if(signedIn == false){
            $('#sign-in-text').html('Sign In');
        }else{
            $("#sign-in-text").html("Sign Out");
        }    
    }

    function updatePlayButton(){
        if(play == false){
            $('#pauseAndPlay').removeClass('fa fa-play-circle-o fa-3x');
            $('#pauseAndPlay').addClass('fa fa-pause-circle fa-3x');
        }else{
            $('#pauseAndPlay').removeClass('fa fa-pause-circle fa-3x');
            $("#pauseAndPlay").addClass("fa fa-play-circle-o fa-3x");
        } 
    }

    function updateFavouriteButton(){
        if(favoutite==false){
            $('#star').removeClass('fa fa-star-o');
            $('#star').addClass('fa fa-star');
            favoutite = true;
        }else{
            $('#star').removeClass('fa fa-star');
            $('#star').addClass('fa fa-star-o');
            favoutite = false;
        }
    }

    function updateVolumeButton(){
        if(mute==false){
            $('#volume').removeClass('fa fa-volume-up fa-2x');
            $('#volume').addClass('fa fa-volume-off fa-2x');
            mute = true;
        }else{
            $('#volume').removeClass('fa fa-volume-off fa-2x');
            $('#volume').addClass('fa fa-volume-up fa-2x');
            mute = false;
        }
    }

    function displayRecommended(recList){
        // Displays the recommended songs (random)
        // requires a list of songs of length 4
        // loops through the list adding each song to the div
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/recommendedSongs',
            success: function(response) { 
                let stringified = JSON.stringify(response)
                let parsed = JSON.parse(stringified);
                for(var i=1; i<5; i++){
                    // the artist name
                    $('#rec' + i).children('#artist').html(parsed[i-1].artist.name);
                    // the song name
                    $('#rec' + i).children('#song').html(parsed[i-1].name);
                    // the album cover art
                    $('#rec' + i).children('img').attr('src', parsed[i-1].image);
                    // source path
                    $('#rec' + i).children('#srcPath').html(parsed[i-1].src);
                    // duration
                    $('#rec' + i).children('#duration').html(parsed[i-1].duration);
                }
            },
            error: function(xhr, status, err) {
                alert("ERROR", err);
            }
        });
        
    }

    function displayNew(newList){
        // Displays some songs that are new to the platform
        // requires a list of songs of length 4
        // loops through the list adding each song to the div
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/newSongs',
            success: function(response) { 
                let stringified = JSON.stringify(response)
                let parsed = JSON.parse(stringified);
                for(var i=1; i<5; i++){
                    // the artist name
                    $('#new' + i).children('#artist').html(parsed[i-1].artist.name);
                    // the song name
                    $('#new' + i).children('#song').html(parsed[i-1].name);
                    // the album cover art
                    $('#new' + i).children('img').attr('src', parsed[i-1].image);
                    // source path
                    $('#new' + i).children('#srcPath').html(parsed[i-1].src);
                    // duration
                    $('#new' + i).children('#duration').html(parsed[i-1].duration);
                }
            },
            error: function(xhr, status, err) {
                alert("ERROR", err);
            }
        });
    }
    

    function displayFavourite(favList){
        // Displays the most played songs by the user in the favourite section
        // requires a list of songs of length 4
        // loops through the list adding each song to the div
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/recommendedSongs',
            success: function(response) { 
                let stringified = JSON.stringify(response)
                let parsed = JSON.parse(stringified);
                for(var i=1; i<5; i++){
                    // the artist name
                    $('#fav' + i).children('#artist').html(parsed[i-1].artist.name);
                    // the song name
                    $('#fav' + i).children('#song').html(parsed[i-1].name);
                    // the album cover art
                    $('#fav' + i).children('img').attr('src', parsed[i-1].image);
                    // source path
                    $('#fav' + i).children('#srcPath').html(parsed[i-1].src);
                    // duration
                    $('#fav' + i).children('#duration').html(parsed[i-1].duration);
                }
            },
            error: function(xhr, status, err) {
                alert("ERROR", err);
            }
        });
        
    }

    function displayHot(hotList){
        // Displays what songs are hot right now
        // requires a list of songs of length 4
        // loops through the list adding each song to the div
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/topSongs',
            success: function(response) { 
                let stringified = JSON.stringify(response)
                let parsed = JSON.parse(stringified);
                for(var i=1; i<5; i++){
                    // the artist name
                    $('#hot' + i).children('#artist').html(parsed[i-1].artist.name);
                    // the song name
                    $('#hot' + i).children('#song').html(parsed[i-1].name);
                    // the album cover art
                    $('#hot' + i).children('img').attr('src', parsed[i-1].image);
                    // source path
                    $('#hot' + i).children('#srcPath').html(parsed[i-1].src);
                    // duration
                    $('#hot' + i).children('#duration').html(parsed[i-1].duration);
                }
            },
            error: function(xhr, status, err) {
                alert("ERROR", err);
            }
        });
    }

    displayRecommended();
    displayNew();
    displayFavourite();
    displayHot();
});