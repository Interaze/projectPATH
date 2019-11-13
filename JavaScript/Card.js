//Card.js

$(document).ready(function(){
    $(".hvr").hover(
        function(){
        console.log("add");
        $(this).removeClass("col-lg-3");
        $(this).addClass("col-lg-4");
    },
        function(){
        console.log("remove");
        $(this).removeClass("col-lg-4");
        $(this).addClass("col-lg-3");
    });
});

$(document).ready(function(){
    $(".card-body .btn").hover(
        function(){
        $(this).addClass("active");
    },
        function(){
        $(this).removeClass("active");
    });
});
