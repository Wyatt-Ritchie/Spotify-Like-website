$(document).ready(function(){
    
    let signedIn = false;
    let play = false;
    let favoutite = false;
    let mute = false;
    let hidden = true;
    var albumList = ["7EP.png", "After Hours_The Weekend.jpg", "Hollywood's Bleeding", "Lewis_Capaldi_-_Divinely_Uninspired_to_a_Hellish_Extent", "The Kids Are Coming"];
    updateSignInButton();
    
    $('#about-bar').hide();
    

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
        if(play == false){
            updatePlayButton();
            play = true;
        }else{
            updatePlayButton();
            play = false;
        }
        console.log("Clicked");
    })
    $('#favourite').click(function(){
        updateFavouriteButton();
    })
    $('#volume').click(function(){
        updateVolumeButton();
    })

    $('img').hover(function(){
        let artistName = $(this).parent().children("#artist").text();
        let songName = $(this).parent().children("#song").text();
        let imgSrc = $(this).attr('src');
        $('#info-bar-image').attr('src', imgSrc);
        document.getElementById('artist-name').innerHTML = artistName;
        document.getElementById('song-name').innerHTML = songName;
       
        if(hidden == false){
            $('#about-bar').hide();
            hidden = true;
        }else{
            $('#about-bar').show();
            hidden = false;
        }
        console.log("hovering" + " " + imgSrc);
    })
    function updateSignInButton(){
        if(signedIn == false){
            $('#sign-in-text').html('Sign In');
        }else{
            $("#sign-in-text").html("Sign Out");
        }    
    }

    function updatePlayButton(){
        if(play == false){
            $('#pauseAndPlay').removeClass('fa fa-play-circle fa-3x');
            $('#pauseAndPlay').addClass('fa fa-pause-circle fa-3x');
        }else{
            $('#pauseAndPlay').removeClass('fa fa-pause-circle fa-3x');
            $("#pauseAndPlay").addClass("fa fa-play-circle fa-3x");
        } 
    }

    function updateFavouriteButton(){
        if(favoutite==false){
            $('#star').removeClass('fa fa-star-half');
            $('#star').addClass('fa fa-star');
            favoutite = true;
        }else{
            $('#star').removeClass('fa fa-star');
            $('#star').addClass('fa fa-star-half');
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