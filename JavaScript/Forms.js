function SignUp(str) {
    //"../Processes/SignUp.php"
    $.ajax({
        type: 'POST',
        url: str,
        data: $("#formSignUp").serialize(),
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '1'){
                alert('Error: ' + obj.msg);
            }
            else if(obj.Error == '0'){
                SignInStatus(str)
                $("#signUp").modal("hide");
                //alert('Success: ' + obj.msg);
            }
            else{
                alert('Error: Unable to Receive Response');
            }
        }
    });
}

function SignIn(str) {
    //"../Processes/SignIn.php"
    $.ajax({
        type: 'POST',
        url: str,
        data: $("#formSignIn").serialize(),
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '1'){
                alert('Error: ' + obj.msg);
            }
            else if(obj.Error == '0'){
                //alert('Success: ' + obj.msg);
                SignInStatus(str);
                $("#logIn").modal("hide");
            }
            else{
                alert('Error: Unable to Receive Response');
            }
        }
    });
}

function SignInStatus(str){
    //"../Processes/SignInStatus.php"
    $.ajax({
        type: 'POST',
        url: "../Processes/SignInStatus.php",
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '0' && obj.isSignedIn == 'true'){
                //alert('Signed In as: ' + obj.UserName);
                $('#userButton').html(obj.UserName);
                $('#userButton').attr("data-target", "#userForm");
            }
            else{
                //alert('Not Signed In');
                $('#userButton').html("Log In");
                $('#userButton').attr("data-target", "#logIn");
            }
            $("#userForm").modal("hide");
            $("#signUp").modal("hide");
            $("#logIn").modal("hide");
        }
    });
}

function logOut(str){
    //"../Processes/LogOut.php"
    $.ajax({
        type: 'POST',
        url: str,
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(!obj.Error == '0' && !obj.isSignedOut == 'true'){
                alert('Error: ' . obj.msg);
            }
            SignInStatus(str);
        }
    });
}

$("form").submit(function(e){
    event.preventDefault();// using this page stop being refreshing
});
