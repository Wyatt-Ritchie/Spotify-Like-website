$(document).ready(function () {
    let hasAccount = true;
    let username = "";
    let password = "";
    let repeatPass = "";
    $('#sign-up-section').slideUp();
    $('#sign-in-alert').hide();

    $('#has-account').click(function () {
        if (hasAccount == true) {
            hasAccount = false;
            hideSignUp();
        } else {
            hasAccount = true;
            hideSignUp();
        }
    })

    $('#sign-in-button').click(function () {
        if (hasAccount == true) {
            if (($('#username').val() == "") || ($('#password').val() == "")) {
                $('#sign-in-alert').show();
                $('#username').addClass('is-danger');
                $('#password').addClass('is-danger');
            } else {
                $('#sign-in-alert').hide();
                $('#username').removeClass('is-danger');
                $('#password').removeClass('is-danger');
                username = $('#username').val();
                password = $('#password').val();

                var URL = "http://localhost:3000/api/login?username=" + username + "&password=" + password;

                // Now check to see if the username and password match someone in the db.
                // if they do match, send to homepage while signed in
                // if they don't match, try again I guess
                $.ajax({
                    type: 'POST',
                    url: URL,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (response) {
                        window.location.replace("Final_Project.html")
                    },
                    error: function (xhr, status, err) {
                        alert(xhr.responseJSON.error);
                    }
                });


            }
        } else {
            if ($("#repeat-pass").val() != $("#password").val()) {
                $('#sign-in-alert').text("Both passwords must be identical.");
                $('#sign-in-alert').show();
                $('#repeat-pass').addClass('is-danger');
            }
            else if (($('#username').val() == "") || ($('#password').val() == "") || ($('#repeatPass').val() == "")) {
                $('#sign-in-alert').text("Fields must not be empty.");
                $('#sign-in-alert').show();
                $('#username').addClass('is-danger');
                $('#password').addClass('is-danger');
                $('#repeat-pass').addClass('is-danger');
            }
            else {
                $('#sign-in-alert').hide();
                $('#username').removeClass('is-danger');
                $('#password').removeClass('is-danger');
                $('#repeat-pass').removeClass('is-danger');
                username = $('#username').val();
                password = $('#password').val();
                repeatPass = $('#repeat-pass').val();
                var URL = "http://localhost:3000/api/processRegistration?username=" + username + "&password=" + password;

                // Create a user with this information. Check to make sure the passwords match
                // then send back to the homepage
                $.ajax({
                    type: 'POST',
                    url: URL,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (response) {
                        //alert(response);
                        //alert("SUCCESS")
                        //alert(JSON.stringify(response));
                        window.location.replace("Final_Project.html")
                    },
                    error: function (xhr, status, err) {
                        alert(err, "ERROR");
                    }
                });

            }
        }



    })

    function hideSignUp() {
        if (hasAccount == false) {
            $('#sign-up-section').slideDown();
            $('#sign-in-title').text('Sign Up');
            $('#sign-in-text').text('Sign Up');
            $('#has-account').text("Already have an account?");
        } else {
            $('#sign-up-section').slideUp();
            $('#sign-in-title').text('Sign In');
            $('#sign-in-text').text('Sign In');
            $('#has-account').text("Don't have an account?");
        }
    }
})