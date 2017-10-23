var http = require('http');
var fs = require('fs');
var url = require('url');


var options ={
    docroot:"public/",
    defaultPage:"index.html"
};
var routing = {
    GET:[{path:"/getAll",processingFunction:getAll},{path:"/find",processingFunction:find}],
    POST:[{path:"/create",processingFunction:create},{path:"/update",processingFunction:update}],
    DELETE:[{path:"/",processingFunction:remove}]};
// Create a server
http.createServer( function (request, response) {
    //console.log(request);
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
    var method = request.method;



    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");
    console.log("Request method " + method + " received.");

    if (pathname=="/") pathname+=options.defaultPage;

    var pathsToCheck = routing[method];
    //console.log(pathsToCheck);
    for (var i =0; i <pathsToCheck.length ;i++){
         if (pathname.lastIndexOf(pathsToCheck[i].path,0)===0){
            console.log("found dynamic page: "+pathname);
            pathsToCheck[i].processingFunction(request,response);
            return;
        }
    }
    if (pathname=="/") pathname+=options.defaultPage;

    // Read the requested file content from file system
    fs.readFile(options.docroot+pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            //Page found
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});
            // Write the content of the file to response body
            response.write(data.toString());
        }
        // Send the response body
        response.end();
    });
}).listen(8089);

function getAll(request, response){
    console.log("getAll");
}
function find(request, response){
    console.log("find");
}
function update(request, response){
    console.log("update");
}
function create(request, response){
    var film = request.body.film;
    console.log(film);
    Film.create(film,function (err, film) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(film);
    });
}
function remove(request, response){
    console.log("delete");
}
// Console will print the message
console.log('Server running at http://127.0.0.1:8089/');