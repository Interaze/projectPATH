//Card.js

$(document).ready(function(){
    $(".hvr").hover(
        function(){
        $(this).removeClass("col-lg-3");
        $(this).addClass("col-lg-4");
    },
        function(){
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
