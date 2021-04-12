<html lang="en">
<head>
    <title>Home</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A free toolkit for Developing and Testing different algorithms.">
    <meta name="keywords" content="Graph Building,Algorithms,SandBox,D3.js,HTML,CSS,JS">
    <meta name="author" content="Christopher Scully">
    <link rel="stylesheet" href="StyleSheets/MainStyle.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="StyleSheets/UI.css">
    <link rel="stylesheet" href="StyleSheets/custom-css-bootstrap-magic-2019-11-09.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body onload="SignInStatus(&quot;api/SignInStatus.php&quot;);">
    <?php include ('navBar.html'); ?>
    <div class="container bg-pale p-3">
        <h2>Find A Graph:</h2>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control redFocus col-lg-10 col-md-8 col-sm-7" type="search" placeholder="Search to be added in future" aria-label="Search">
            <button class="btn btn-danger my-2 col-lg-2 col-md-4 col-sm-5" type="submit" disabled="disabled">Search</button>
        </form>
        <h1 class="display-4 mt-4 mb-4 ml-5">
            <u>Example Graphs:</u>
        </h1>
        <div class="cards d-flex align-content-end flex-wrap col-lg-11 mx-auto">
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0">
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Default Graph</h5>
                <p class="card-text">Here is the standard graph to be used by people to start out</p>
                <a href="BuildAGraph.php" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0" col-md-4>
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Graph D</h5>
                <p class="card-text">Here's a modified Graph for you to view.</p>
                <a href="BuildAGraph.php?user=f&graph=d" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0" col-md-4>
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Graph B</h5>
                <p class="card-text">Here's a graph of B</p>
                <a href="BuildAGraph.php?user=f&graph=b" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0">
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Graph C</h5>
                <p class="card-text">here's a graph slightly altered</p>
                <a href="BuildAGraph.php?user=f&graph=c" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0">
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Graph hehe</h5>
                <p class="card-text">Here's another Graph for you</p>
                <a href="BuildAGraph.php?user=f&graph=hehe" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0">
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">Graph F</h5>
                <p class="card-text">Here's a grately altered Graph.</p>
                <a href="BuildAGraph.php?user=f&graph=newGraph" class="btn btn-primary">View Graph</a>
            </div>
        </div>
        <div class="card hvr mt-3 mb-3 m-1 col-lg-3 col-md-5 bg-pale p-0">
            <img class="card-img-top" src="https://dummyimage.com/4:3x1080/ffffff/ff0000.png" alt="Card image cap">
            <div class="card-body bg-pale p-4">
            <h5 class="card-title">The OG Graph</h5>
                <p class="card-text">Here's the graph I spent days messing around with to get this site working.</p>
                <a href="BuildAGraph.php?user=f&graph=test" class="btn btn-primary">View Graph</a>
            </div>
        </div>
    </div>
    </div>
    <?php include ('footer.html'); ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="JavaScript/Modals.js" type="text/javascript"></script>
    <script src="JavaScript/Card.js"></script>
    <script src="JavaScript/Forms.js" type="text/javascript"></script>

</body>
</html>
