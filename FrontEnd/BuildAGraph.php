<html lang="en">
<head>
    <title>Build A Graph</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Sketch out your own Graph.">
    <meta name="keywords" content="Graph Building,Algorithms,SandBox,D3.js,HTML,CSS,JS">
    <meta name="author" content="Christopher Scully">

    <link rel="stylesheet" href="StyleSheets/MainStyle.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="StyleSheets/UI.css">
    <link rel="stylesheet" href="StyleSheets/custom-css-bootstrap-magic-2019-11-09.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="StyleSheets/UI.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body onresize="setDimensions()" onload="setDimensions();SignInStatus(&quot;Processes/SignInStatus.php&quot;);">
    <?php include ('navBar.html'); ?>
    <div class="options position-fixed">
    <ul class="list-group list-group-flush btn-group-toggle" data-toggle="buttons">
        <div class="list-group-item text-primary p-0 tab border-0">
            <label class="btn btn-primary side-icon fa-stack fa-lg float-right mb-0 border-0 active" data-toggle="tooltip" data-placement="right" title="Move">
                <input type="radio" class="d-none" name="options" id="option0" autocomplete="off" value="0" checked>
                <i class="fa fa-arrows fa-lg" aria-hidden="true"></i>
            </label>
        </div>
        <div class="list-group-item text-primary p-0 tab border-0">
            <label class="btn btn-primary side-icon fa-stack fa-lg float-right mb-0 border-0" data-toggle="tooltip" data-placement="right" title="Add a Vertex">
                <input type="radio" class="d-none" name="options" id="option1" autocomplete="off" value="1">
                <i class="fa fa-plus-square fa-lg" aria-hidden="true"></i>
            </label>
        </div>
        <div class="list-group-item text-primary p-0 tab border-0">
            <label class="btn btn-primary side-icon fa-stack fa-lg float-right mb-0 border-0" data-toggle="tooltip" data-placement="right" title="Remove a Vertex">
                <input type="radio" class="d-none" name="options" id="option2" autocomplete="off" value="2">
                <i class="fa fa-plus-square fa-lg" aria-hidden="true"></i>
                <i class="fa fa-ban fa-stack-2x" aria-hidden="true"></i>
            </label>
        </div>
        <div class="list-group-item text-primary p-0 tab border-0">
            <label class="btn btn-primary side-icon fa-stack fa-lg float-right mb-0 border-0" data-toggle="tooltip" data-placement="right" title="Add an Edge">
                <input type="radio" class="d-none" name="options" id="option3" autocomplete="off" value="3">
                <i class="fa fa-arrows-h fa-2x" aria-hidden="true"></i>
            </label>
        </div>
        <div class="list-group-item text-primary p-0 tab border-0">
            <label class="btn btn-primary side-icon fa-stack fa-lg float-right mb-0 border-0" data-toggle="tooltip" data-placement="right" title="Sensative: Remove an Edge">
                <input type="radio" class="d-none" name="options" id="option4" autocomplete="off" value="4">
                <i class="fa fa-arrows-h fa-lg" aria-hidden="true"></i>
                <i class="fa fa-ban fa-stack-2x" aria-hidden="true"></i>
            </label>
        </div>
        </ul>
        <div class="list-group-item text-primary tab p-0 border-0">
            <label class="side-icon fa-stack fa-lg tab border-0"  data-toggle="tooltip" data-placement="right" title="Save">
                <input type="checkbox" class="d-none" name="weight" id="isWeight" autocomplete="off">
                <button class="btn btn-primary side-icon fa-stack fa-lg float-right border-0 shadow-none" data-toggle="modal" data-target="#graphSave" >
                <i class='fas fa-save'></i>
                </button>
            </label>
        </div>

    </div>

    <div class="algorithm position-fixed d-none d-md-block">
        <div class="card">
            <div class="card-header">
                Testing Console
            </div>
            <div class="card-body">
                <h5 class="card-title">Running an Algorithm</h5>
                <p class="card-text">In the future, I intend to establish running algorithms and animating them, for right now, I haw the graph interface established.</p>
                <select class="form-control form-control mb-2" disabled="disabled">
                    <option>Select an Algorithm</option>
                    <option disabled>───General Traversal───</option>
                    <option>BFS</option>
                    <option>DFS</option>
                    <option disabled>────Shortest Path────</option>
                    <option>Kruskal</option>
                    <option>Prim's</option>
                </select>
                <button type="submit" class="btn btn-danger" disabled>Run Algorithm</button>
            </div>
            <div class="card-footer text-muted" id="saveResponse">
                Log In To Save
            </div>
        </div>

        <div class="card mt-2">
            <div class="card-header">
                Graph Requirements
            </div>
            <div class="card-body requirements overflow-auto" id="Requirements">
                <h5 class="card-title mb-1 font-underline"><u>Current Requirements:</u></h5>
                <p><span class="icon fa fa-question-circle"></span> No Algorithm Selected</p>
                <!--<p><span class="icon fa fa-check-circle"></span> Is Acyclic</p>
                <p><span class="icon fa fa-times"></span> Is a directed graph</p>
                <p><span class="icon fa fa-question-circle"></span> Is something</p>
                <p><span class="icon fa fa-times"></span> Is a directed graph</p>
                <p><span class="icon fa fa-question-circle"></span> Is something</p>
                Saving for later project, sorrry :)-->
            </div>
        </div>
    </div>

    <svg id="diagram"></svg>

    <script>
        $("#navBuild").addClass("active");
    </script>

    <script src="https://d3js.org/d3.v4.min.js" type="text/javascript"></script>
    <script src="https://d3js.org/d3-selection-multi.v1.js"></script>
    <script src="JavaScript/UI.js" type="text/javascript">
    </script>
    <script src="JavaScript/Modals.js" type="text/javascript"></script>
    <script src="JavaScript/Forms.js" type="text/javascript"></script>
</body>
</html>
