var http = require('http');
var url = require('url');
var fs = require('fs');

var options = {
    docroot :"public/",
    defaultPage :"index.html"
}
var routing=[{route:"/car",processingFunction: displayAllCars},
    {route:"/films",processingFunction: displayAllFilms},
            ]

var server = http.createServer( function (request, response) {
    var parsedUrl = url.parse(request.url);
    var pathname = parsedUrl.pathname;
    var method = parsedUrl.method;
    console.log("got a request to "+method+pathname.toString());
    if (pathname == "/"){pathname = pathname+":"+options.defaultPage;}

    for (var i = 0; i< routing.length ; i++){
        var route = routing[i].route;
        if (pathname == route){
            var functionToCall = routing[i].processingFunction;
            functionToCall(request, response);
            return
        }

    }
        var fileName = pathname.substr(1);
        var filePath = options.docroot + fileName;
        console.log(filePath);
        fs.readFile(filePath, function (err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});

                //console.log(err);
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data.toString());

            }
            response.end();
        })


});
server.listen("3001");

console.log("Server running2");

function displayAllCars(req, res){
    res.write("display all cars");
    res.end();
}
function displayAllFilms(req, res){
    res.write("display all films");
    res.end();
}