$(document).ready(function(){
    let hasAccount = true;
    let username = "";
    let password = "";
    let repeatPass = "";
    let email = "";
    $('#sign-up-section').slideUp();
    $('#sign-in-alert').hide();

    $('#has-account').click(function(){
        if(hasAccount == true){
            hasAccount = false;
            hideSignUp();
        }else{
            hasAccount = true;
            hideSignUp();
        }
    })

    $('#sign-in-button').click(function(){
        if(hasAccount == true){
            if(($('#username').val() == "") || ($('#password').val() == "")){
                $('#sign-in-alert').show();
                $('#username').addClass('is-danger');
                $('#password').addClass('is-danger');
            }else{
                $('#sign-in-alert').hide();
                $('#username').removeClass('is-danger');
                $('#password').removeClass('is-danger');
                username = $('#username').val();
                password= $('#password').val();
                
                window.location.replace("Final_Project.html")

                // Now check to see if the username and password match someone in the db.
                // if they do match, send to homepage while signed in
                // if they don't match, try again I guess
            }
        }else{
            username = $('#username').val();
            password = $('#password').val();
            repeatPass = $('#repeat-pass').val();
            email = $('#email').val();

            // Create a user with this information. Check to make sure the passwords match
            // then send back to the homepage
            window.location.replace("Final_Project.html")
        }
        
        
        
    })

    function hideSignUp(){
        if(hasAccount==false){
            $('#sign-up-section').slideDown();
            $('#sign-in-title').text('Sign Up');
            $('#has-account').text("Already have an account?");
        }else{
            $('#sign-up-section').slideUp();
            $('#sign-in-title').text('Sign In');
            $('#has-account').text("Don't have an account?");
        }
    }
})