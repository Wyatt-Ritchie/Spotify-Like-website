$(document).ready(function(){
    
    let signedIn = false;
    let play = false;
    let favoutite = false;
    let mute = false;
    let hidden = true;
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
        let imgSrc = $(this).attr('src');
        $('#info-bar-image').attr('src', imgSrc);
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
    let mongoose = require('mongoose');
});