$( "#diagram" ).click(function() {
    UI();
});

window.addEventListener('beforeunload', (event) => {
    event.returnValue = `Are you sure you want to leave?`;
});
//https://dev.to/chromiumdev/sure-you-want-to-leavebrowser-beforeunload-event-4eg5

var svg = d3.select("svg");

var width = document.getElementById("diagram").clientWidth,
height = document.getElementById("diagram").clientHeight,
radius = 6;

svg.append('defs').append('marker')
    .attrs({'id':'arrowhead',
        'viewBox':'-0 -5 10 10',
        'refX':17,
        'refY':0,
        'opacity': 0.9,
        'orient':'auto',
        'markerWidth':6,
        'markerHeight':6,
        'xoverflow':'visible'})
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#000')
    .attr("viewBox", [0, 0, width, height])
    .style('stroke','none');

    var body = d3.select("body");
    var GlobalGraph;

    body.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 2])
        .translateExtent([[-312,-312], [width + 312, height + 312]])
        .on("zoom", zoomed));

    function zoomed() {
        svg.attr("transform", d3.event.transform);
    }

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(150).strength(1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

const urlParams = new URLSearchParams(window.location.search);
var desiredGraph = "";

if(urlParams.has('user') && urlParams.has('graph')){
    var tempFormat = "api/Users/"+urlParams.get('user')+"/"+urlParams.get('graph')+".json?nocache=" + (new Date()).getTime();
    desiredGraph = tempFormat;
}
else{
    desiredGraph = "Default/empty.json?nocache=" + (new Date()).getTime();
}

d3.json(desiredGraph, function (error, graph) {
    //if (error) throw error; removed for default graph functionallity, but held incase of fallback
    GlobalGraph = graph;
    render(graph);
});

var attempt = 0;

function render(graph){
    let promise = new Promise(function(resolve, reject){
        links = graph.links;
        nodes = graph.nodes;
        console.log(links);
        console.log(nodes);
        link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("onmouseover", function (d) {return "setSelEdge(\""+d.source+"to"+d.target+"\")"})
            .attr("onmouseout", "setSelEdge(null)")
            .attr("source", function (d) {return d.source})
            .attr("target", function (d) {return d.target})
            .attr("id", function (d) {return d.source+"to"+d.target})
            .attr('marker-end','url(#arrowhead)');

        link
            .append("title")
            .text(function (d) {return d.type;});

        $(".link").after("<line class=\"clickForgive\"></line>");

        edgepaths = svg.selectAll(".edgepath")
            .data(links)
            .enter()
            .append('path')
            .attr("source", function (d) {return d.source})
            .attr("target", function (d) {return d.target})
            .attrs({
                    'class': 'edgepath',
                    'fill-opacity': 0,
                    'stroke-opacity': 0,
                    'id': function (d, i) {return 'edgepath' + i}
                })
            .style("pointer-events", "none");

        edgelabels = svg.selectAll(".edgelabel")
            .data(links)
            .enter()
            .append('text')
            .attr("source", function (d) {return d.source})
            .attr("target", function (d) {return d.target})
            .style("pointer-events", "none")
            .attrs({
                'class': 'edgelabel',
                'id': function (d, i) {return 'edgelabel' + d.source + "to" + d.target},
                'font-size': 10,
                'fill': '#000'
            });

        edgelabels
            .append('textPath')
            .attr('xlink:href', function (d) {return '#edgepath' + d.source + "to" + d.target})
            .style("text-anchor", "middle")
            .style("pointer-events", "none")
            .attr("startOffset", "50%")
            .text(function (d) {return d.type});

        node = svg
            .selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .style("fill", "#f44336")
            .style("border","#000")
            .attr("onmouseover", function (d) {return "setSelVertex(\""+d.id+"\")"})
            .attr("onmouseout", "setSelVertex(null)")
            .attr("id", function (d) {return "Vertex"+d.id})
            .call(
                d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                );

        node
            .append("circle")
            .attr("r", 15)
            .style("fill", "#f54336")

        node
            .append("text")
            .attr("dy", 5.5)
            .attr("dx", -5)
            .style("user-select","none")
            .style("fill","#000")
            .text(function (d) {return d.name;});

        simulation
            .nodes(nodes)
            .on("tick", tick)
            .force('link')
            .links(graph.links);
    });

    promise.then(
        function(result) {
            console.log("success");
        },
        function(error) {
            if(attempt < 3){
                attempt++;
                alert("failed to find graph, loading default");
                d3.json("Default/empty.json", function (error, graph) {
                    if (error) throw error;
                    GlobalGraph = graph;
                    render(graph);
                });
            }
            else{
                alert("rendering of graph failed, unfortunately the default graph could not be resolved with sufficient time");
            }
        }
    );
}

function tick() {
    node
        .attr("transform", function (d) {return "translate(" + Math.max(radius, Math.min(width - radius, d.x)) + ", " + Math.max(radius, Math.min(height - radius, d.y)) + ")";})
        .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        edgepaths.attr('d', function (d) {
        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    edgelabels.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
            var bbox = this.getBBox();

            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            return 'rotate(180 ' + rx + ' ' + ry + ')';
        }
        else {
            return 'rotate(0)';
        }
    });

    var $select = $(".link");
    var $div = $(".clickForgive");

    var attributes = $select.prop("attributes");

    // loop through <select> attributes and apply them on <div>
    $.each(attributes, function() {
        $div.attr(this.name, this.value);
        $div.attr("class","clickForgive");
    });
    //https://stackoverflow.com/questions/6753362/how-to-copy-all-the-attributes-of-one-element-and-apply-them-to-another
}

function setDimensions(){
    width = document.getElementById("diagram").clientWidth;
    height = document.getElementById("diagram").clientHeight;
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(1).restart();
    d.fx = d.x;
    d.fy = d.y;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function UI(){
    var userMode = document.querySelector('input[name="options"]:checked').value;
    switch (userMode) {
        case "0":
            settingEdge = false;
            //console.log("Move");
        break;
        case "1":
            settingEdge = false;
            addVertex();
        break;
        case "2":
            settingEdge = false;
            if(!selVertex){
                alert("Please Select A Vertex");
            }
            else{
                removeVertex(selVertex);
            }
        break;
        case "3":
            //console.log("Add A Edge");
            if(!selVertex){
                alert("Please Select A Vertex");
            }
            else{
                addEdge(selVertex);
            }
        break;
        case "4":
            settingEdge = false;
            if(!selEdge){
                alert("Please Select An Edge");
            }
            else{
                removeEdge(selEdge);
            }

        break;
        default:
            //console.log("Default");
            //console.log(userMode);
            settingEdge = false;
    }
}

var settingEdge = false;
var firstEdge = 0;
var secondEdge = 0;

function addEdge(selVert){
    if(settingEdge == true){
        settingEdge = false;
        secondEdge = selVert;
        if(firstEdge == secondEdge){
            alert("Error: Self Connected Vertexs Not Supported");
            return;
        }
        else{
            fixNums();
            //console.log("Vertex " + firstEdge + " and " + secondEdge);
            GlobalGraph.links.push({
                source: GlobalGraph.nodes[firstEdge-1],
                target: GlobalGraph.nodes[secondEdge-1],
                type: "test"
            });
            update(GlobalGraph);
            firstEdge = 0;
            secondEdge = 0;
            //console.log(GlobalGraph.links);
        }
    }
    else{
        firstEdge = selVert;
        secondEdge = 0;
        settingEdge = true;
    }
}

function addVertex(){
    if(GlobalGraph.nodes.length > 19){
        alert("20 node limit exceeded, please remove some nodes");
    }
    else{
        GlobalGraph.nodes.push({"name": GlobalGraph.nodes.length+1, "fx": mousex, "fy": mousey-72, "sticky": true,"id": GlobalGraph.nodes.length+1});
        update(GlobalGraph);
    }
}


function update(graph){
links = graph.links;
nodes = graph.nodes;
var promise = new Promise(function(resolve, reject){

    link = svg.selectAll(".link").remove().exit()
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("onmouseover", function (d) {return "setSelEdge(\""+d.source.name+"to"+d.target.name+"\")"})
        .attr("onmouseout", "setSelEdge(null)")
        .attr("source", function (d) {return d.source.name})
        .attr("target", function (d) {return d.target.name})
        .attr("id", function (d) {return d.source.name+"to"+d.target.name})
        .attr('marker-end','url(#arrowhead)');

    link
        .append("title")
        .text(function (d) {return d.type;});

    node = svg
        .selectAll(".node").remove().exit()
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .style("fill", "#f44336")
        .style("border","#000")
        .attr("onmouseover", function (d) {return "setSelVertex(\""+d.id+"\")"})
        .attr("onmouseout", "setSelVertex(null)")
        .attr("id", function (d) {return "Vertex"+d.id})
        .call(
            d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            );
    node
        .append("circle")
        .attr("r", 15)
        .style("fill", "#f54336")

    node
        .append("text")
        .attr("dy", 5.5)
        .attr("dx", -5)
        .style("user-select","none")
        .style("fill","#000")
        .text(function (d) {return d.name;});
});}

function fixNums(){
    //console.log(GlobalGraph.nodes);
    GlobalGraph.nodes.sort((a, b) => (a.id > b.id) ? 1 : -1);

    for(var i = 0; i < GlobalGraph.nodes.length; i++){
        if(GlobalGraph.nodes[i].id != i+1){
            GlobalGraph.nodes[i].id = i + 1;
            GlobalGraph.nodes[i].name = i+1;
        }
    }
}

function removeVertex(currVer){

    function connectedEdge(edg){
        if(edg.source.name == currVer || edg.target.name == currVer ){
            return true;
        }
        else{
            return false;
        }
    }

    var localIndex = GlobalGraph.nodes.findIndex(i => i.id == currVer);
    GlobalGraph.nodes.splice(localIndex,1);

    while((localIndex = GlobalGraph.links.findIndex(connectedEdge)) != -1){
        GlobalGraph.links.splice(localIndex,1);
    }

    fixNums();
    update(GlobalGraph);
    setSelVertex(null);
}

function removeEdge(currEdge){
    var tsource = document.getElementById(currEdge).getAttribute("source");
    var ttarget = document.getElementById(currEdge).getAttribute("target");

    function checkEdge(d) {
        if(d.source.name == tsource && d.target.name == ttarget){
            return true;
        }
        else{
            return false;
        }

    }
    var localIndex = GlobalGraph.links.findIndex(checkEdge);
    GlobalGraph.links.splice(localIndex,1);
    update(GlobalGraph);
    setSelEdge(null);
}

var selVertex = null;
var selEdge = null;

var mousex;
var mousey;

function setSelVertex(currentVertex){
    selVertex = currentVertex;
}

function setSelEdge(currentEdge){
    selEdge = currentEdge;
    //console.log(selEdge);
}

function findDocumentCoords(mouseEvent){
var xpos
var ypos;
if (mouseEvent){
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
}
else{
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
}
    mousex = xpos;
    mousey = ypos;
}

document.getElementById("diagram").onmousemove = findDocumentCoords;

//Mouse Coordinates By: https://nerdparadise.com/programming/javascriptmouseposition

function callSave(){
    GlobalGraph.storage[0] = document.getElementById("fileName").value;
    save(GlobalGraph.storage[0],GlobalGraph);
}

function save(name,rec){
    var newref = JSON.parse(JSON.stringify(GlobalGraph));;
    console.log(newref);
    for(var i = 0; i < rec.nodes.length; i++){
        delete newref.nodes[i].vx;
        delete newref.nodes[i].vy;
        delete newref.nodes[i].x;
        delete newref.nodes[i].y;
        delete newref.nodes[i].index;
    }
    console.log(newref);
    for(var j = 0; j < rec.links.length; j++){
        newref.links[j].source = rec.links[j].source.name;
        newref.links[j].target = rec.links[j].target.name;
    }
    newref.storage[0] = name;

    console.log(newref);

    $.ajax({
        type: 'POST',
        url: "api/Save.php",
        data: {hailmary: JSON.stringify(newref)},
        success: function (data) {
            var obj = jQuery.parseJSON(data)
            if(obj.Error == '0' && obj.isSaved == true && obj.isSignedIn == true){
                $("#saveResponse").html(obj.time);
            }
            else{
                if(obj.isSignedIn == 'false'){
                    $("#saveResponse").html("Save Failed: Need to Login");
                }
                else{
                    $("#saveResponse").html("Save Failed: " + obj.msg);
                }
            }
            $("#graphSave").modal('hide');
        }
    });
}
