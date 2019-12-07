function SignUp(str) {
    //"Processes/SignUp.php"
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
    //"Processes/SignInStatus.php"
    if(str.includes("")){
        var str = "Processes/SignInStatus.php";
    }
    else{
        var str = "Processes/SignInStatus.php";
    }
    $.ajax({
        type: 'POST',
        url: str,
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '0' && obj.isSignedIn == 'true'){
                $('#userButton').html(obj.UserName);
                $('#userButton').attr("data-target", "#userForm");

                $('#saveResponse').html("Not Saved Yet");
            }
            else{
                $('#userButton').html("Log In");
                $('#userButton').attr("data-target", "#logIn");

            }
            $("#userForm").modal("hide");
            $("#signUp").modal("hide");
            $("#logIn").modal("hide");
            pullGraphs(str, obj.UserName);
        }
    });
}

function pullGraphs(str, usernm){
    if(str.includes("")){
        var str = "Processes/PullGraphs.php";
    }
    else{
        var str = "Processes/PullGraphs.php";
    }
    $.ajax({
        type: 'POST',
        url: str,
        data: "",
        success: function (data) {
            if(str.includes("")){
                str = "Processes/Delete.php";
            }
            else{
                str = "Processes/Delete.php";
            }
            var graphLink;
            if(str.includes("BuildAGraph.php")){
                graphLink = "BuildAGraph.php";
            }
            else{
                graphLink = "BuildAGraph.php";
            }
            var obj = jQuery.parseJSON(data)
            console.log(obj);
            if(obj.isSignedIn != 'false'){
                var result = "Graphs Made: ";
                for(var i = 0; i < obj.length; i++){
                    result = result + "<br><a href="+graphLink+"?user="+usernm+"&graph="+obj[i].slice(0, -5)+"><button type=\"button\" class=\"btn btn-primary mt-2 col-sm-12 col-md-6\">View: "+obj[i]+"</button></a><button type=\"button\" class=\"btn btn-danger mt-2 col-sm-12 col-md-6\" onclick=\"deletethis(&quot;"+str+"&quot;,&quot;"+obj[i]+"&quot;)\">Delete: "+obj[i]+"</button>";
                }
                $("#delGraphs").html(result);
            }
            else{
                $("#delGraphs").html("No Graphs Currently Visible")
            }
        }
    });
}

function deletethis(str, nme){
    SignInStatus(str);
    $.ajax({
        type: 'POST',
        url: str,
        data: {hailmary: nme},
        success: function (data) {
            if(data == true){

            }
            else{
                alert("delete failed, try again another time");
            }
        }
    });
}

function logOut(str){
    //"Processes/LogOut.php"
    $.ajax({
        type: 'POST',
        url: str,
        data: "",
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(!obj.Error == '0' && !obj.isSignedOut == 'true'){
                alert('Error: ' . obj.msg);
            }
            else{
                SignInStatus(str);
            }
        }
    });
}

$("form").submit(function(e){
    event.preventDefault();// using this page stop being refreshing
});
