function SignUp() {
    $.ajax({
        type: 'POST',
        url: "../Processes/SignUp.php",
        data: $("#formSignUp").serialize(),
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '1'){
                alert('Error: ' + obj.msg);
            }
            else if(obj.Error == '0'){
                SignInStatus()
                $("#signUp").modal("hide");
                //alert('Success: ' + obj.msg);
            }
            else{
                alert('Error: Unable to Receive Response');
            }
        }
    });
}

function SignIn() {
    $.ajax({
        type: 'POST',
        url: "../Processes/SignIn.php",
        data: $("#formSignIn").serialize(),
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '1'){
                alert('Error: ' + obj.msg);
            }
            else if(obj.Error == '0'){
                //alert('Success: ' + obj.msg);
                SignInStatus();
                $("#logIn").modal("hide");
            }
            else{
                alert('Error: Unable to Receive Response');
            }
        }
    });
}

function SignInStatus(){
    $.ajax({
        type: 'POST',
        url: "../Processes/SignInStatus.php",
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '0' && obj.isSignedIn == 'true'){
                alert('Signed In as: ' + obj.UserName);
                $('#userButton').html(obj.UserName);
                $('#userButton').attr("data-target", "#userForm");
            }
            else{
                alert('Not Signed In');
                $('#userButton').html("Log In");
                $('#userButton').attr("data-target", "#logIn");
            }
            $("#userForm").modal("hide");
            $("#signUp").modal("hide");
            $("#logIn").modal("hide");
        }
    });
}

function logOut(){
    $.ajax({
        type: 'POST',
        url: "../Processes/LogOut.php",
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(!obj.Error == '0' && !obj.isSignedOut == 'true'){
                alert('Error: ' . obj.msg);
            }
            SignInStatus();
        }
    });
}

$("form").submit(function(e){
    event.preventDefault();// using this page stop being refreshing
});
