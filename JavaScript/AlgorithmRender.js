//AlgoritmRender.js

const urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('user') && urlParams.has('algorithm')){
    var tempFormat = "../Users/"+urlParams.get('user')+"/"+urlParams.get('algorithm')+".json";

    $.getJSON(tempFormat, function( data ) {
        console.log(data);
    })
    .done(function( json ) {
        //console.log(json);
        $("#algNameSpot").html(json.Display[0].Title);
        $("#summarySpot").html("\""+json.Display[0].Summary+"\"");
        $("#authorSpot").html("-"+json.Display[0].Author);
        $("#graphLinkSpot").attr("href",json.Display[0].DefaultGraph);

        document.title = 'Learn: ' + json.Display[0].Title;

        var listInsert = "";
        for(var i = 0; i < json.Requirements.length; i++){
            if(json.Requirements[i].required){
                listInsert = "<li>Required: "+json.Requirements[i].required+"</li>" + listInsert;
            }
            else if(json.Requirements[i].recommended){
                listInsert = listInsert + "<li>Recomended: "+json.Requirements[i].recommended+"</li>";
            }
        }
        $("#requirementSpot").html(listInsert);

        $("#videoSpot").attr("src", json.Display[0].Video);

        $("#detailsSpot").html(json.Display[0].Details);
        $("#updatedSpot").html("Last Updated: " + json.Display[0].Updated);

    })
    .fail(function( jqxhr, textStatus, error ) {
        console.log(error);
        $('body').remove();
        alert("Sorry, We found a graph, but it appears to not be pulled currently");
    });
}
else{
    $('body').remove();
    alert("Sorry, We were unable to find this graph");
}
