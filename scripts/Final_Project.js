$(document).ready(function(){
    
    let signedIn = false;
    updateSignInButton();

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

    function updateSignInButton(){
        if(signedIn == false){
            $('#sign-in-text').html('Sign In');
        }else{
            $("#sign-in-text").html("Sign Out");
        }    
    }
});