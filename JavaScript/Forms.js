function Submit(str,frm) {
    $.ajax({
        type: 'POST',
        url: str,
        data: $(frm).serialize(),
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '1'){
              alert('Error: ' + obj.msg);
            }
            else if(obj.Error == '0'){
              alert('Success' + obj.msg);
              console.log(data);
            }
            else{
              alert('Error: Unable to Receive Response');
            }
        }
    });
}

$("form").submit(function(e){
    event.preventDefault();// using this page stop being refreshing
});
