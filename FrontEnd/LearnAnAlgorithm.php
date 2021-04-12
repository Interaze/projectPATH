<html lang="en">
<head>
    <title>Learn: </title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="keywords" content="Graph Building,Algorithms,SandBox,D3.js,HTML,CSS,JS,">
    <meta name="author" content="">

    <link rel="stylesheet" href="StyleSheets/MainStyle.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="StyleSheets/UI.css">
    <link rel="stylesheet" href="StyleSheets/custom-css-bootstrap-magic-2019-11-09.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .text-pale{
            color: white;
        }
        h1.requirements{
            white-space: pre-wrap;
        }

        ul.requirements{
            list-style-type: square;
        }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body onload="SignInStatus(&quot;api/SignInStatus.php&quot;);">
    <?php include ('navBar.html'); ?>
    <div class="jumbotron jumbotron-fluid bg-secondary mb-0 p-5">
        <h1 class="Display-1" id="algNameSpot">Loading</h1>
        <h3 class="Display-5 m-0" id="summarySpot"> "Loading"</h3>
        <h2 class="Display-4 mt-4" id="authorSpot">-Loading</h2>
        <a href="" class="btn btn-danger mt-3 text-decoration-none disabled" id="graphLinkSpot" >Algorithm Buttons: Currently Unsupported</a>
        <button class="btn btn-primary mt-3 disabled" id="saveSpot">Save</button>
        <button class="btn btn-secondary mt-3 disabled" id="reportSpot">Report</button>
    </div>
    <div class="jumbotron jumbotron-fluid bg-danger mb-0 p-5 text-pale">
        <h1 class="Display-3 font-weight-bold requirements"><u>Require<wbr>ments</u></h1>
        <ul class="requirements"><h1 id="requirementSpot">
            <li>Loading</li>
        </h1></ul>
    </div>
    <div class="jumbotron jumbotron-fluid bg-primary text-pale pl-3 pr-3 m-0 mt-0">
        <h1 class="Display-2 w-100 pl-5">Video Guide:</h1><br>
            <div class="container col-xs-12 col-sm-11 col-md-10 col-lg-8 padding-zero embed-responsive embed-responsive-16by9">
                <iframe src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"class="embed-responsive-item" id="videoSpot" allowfullscreen></iframe>
            </div>
    </div>
    <div class="jumbotron jumbotron-fluid bg-secondary m-0 p-5">
        <h1 class="Display-4 font-weight-bold"><u>Descrip<wbr>tion:</u></h1>
        <h3 class="Display-5 mb-3 m-0" id="detailsSpot"> "Loading"
        </h3>
        <hr>
        <h2 class="Display-5 mt-3" id="updatedSpot">Last Updated: Loading</h2>
    </div>
    <?php include ('footer.html'); ?>
    <script src="JavaScript/AlgorithmRender.js" type="text/javascript"></script>
    <script src="JavaScript/Modals.js" type="text/javascript"></script>
    <script src="JavaScript/Forms.js" type="text/javascript"></script>
    <script>
        $("#navLearn").addClass("active");
    </script>
</body>
</html>
