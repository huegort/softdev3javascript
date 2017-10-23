var http = require('http');
var fs = require('fs');
var url = require('url');


var options ={
    docroot:"public/",
    defaultPage:"index.html"
};
var routing = {
    GET:[{path:"/function1",processingFunction:do1},{path:"/listusers",processingFunction:listUsers}],
    POST:[],
    DELETE:[]};
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
    console.log(pathsToCheck);
    for (var i =0; i <pathsToCheck.length ;i++){
        if (pathname == pathsToCheck[i].path){
            console.log("found dynamic page: "+pathname);
            pathsToCheck[i].processingFunction(response);
            return;
        }
    }

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

function do1(res){
    res.write("do1");
    res.end();
}
function listUsers(){
    res.write("list users");
    res.end();
}
// Console will print the message
console.log('Server running at http://127.0.0.1:8089/');