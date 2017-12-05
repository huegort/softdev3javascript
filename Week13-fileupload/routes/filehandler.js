var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var mysql = require('mysql');
//var dao = require('../dao/bSimpleDAO');

router.post('/uploaddebug',function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/html'});
        console.log(JSON.stringify(err));

        console.log(JSON.stringify(fields));
        console.log(JSON.stringify(files));
        res.write('received upload:<br/>\n\n');
        res.write(files.fileToUpload.path + "<br/>\n");
        res.write(files.fileToUpload.name + "<br/>\n");
        res.write(files.fileToUpload.type + "<br/>\n");
        res.end();
    });
})


router.post('/uploadtofile', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var imgDirPath = "public/images/";
        var fileName = files.fileToUpload.name;
        // copy file into the images folder
        // we should check for file extensions, as this could allow cros site scripting attacks
        fs.rename(files.fileToUpload.path, imgDirPath + fileName, function (err, data) {
            if (err) throw err;

            res.writeHead(200, {'content-type': 'text/html'});
            res.write('You can down load the file ');
            res.write('<a href="/images/' + fileName + '">here</a>');
            res.end();

            console.log('complete ' + fileName);
        });
    });
});

router.post('/uploadtodb', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var fileName = files.fileToUpload.name;
        var fileType = files.fileToUpload.type;
        var tempPath = files.fileToUpload.path;
        var fileSize = fs.statSync(tempPath).size;
        fs.open(tempPath, 'r', function (status, fd) {
            if (status) {
                console.log(status.message);
                return;
            }


            var buffer = new Buffer(fileSize);
            fs.read(fd, buffer, 0, fileSize, 0, function (err, num) {
                var con = mysql.createConnection({
                    host:'localhost',
                    user:'root',
                    password:'',
                    database:'softdev3',
                });
                con.connect(function (err) {
                    if (err) throw err;
                    var query = "INSERT INTO files SET ?";
                    var values = {
                        file_name: fileName,
                        file_type: fileType,
                        file_size: fileSize,
                        file: buffer
                    };
                    con.query(query, values, function (er, da) {
                        if (er) throw er;
                        res.writeHead(200, {'content-type': 'text/html'});
                        res.write('You can down load the file ');
                        res.write('link here');
                        res.end();
                        // we should probably delete the temp file here

                    });
                });
            });
        });
        // copy file into the images folder
        // we should check for file extensions, as this could allow cros site scripting attacks

    });
});



router.get('/download/:id', function(req,res,next){
    var id = parseInt(req.param("id"));
    console.log(id);
    var con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'softdev3',
    });
    con.connect(function (err) {
        if (err) throw err;
        var query = "select * from files where id = ?";
        var values = [id];
        con.query(query, values, function (er, result) {
            console.log(JSON.stringify(result));
            if (err) throw err;
            var fileName = result[0].file_name;
            var fileSize = result[0].file_size;
            var fileType = result[0].file_type;
            var blob = result[0].file.data;
            console.log("file is "+JSON.stringify(result[0].file));
            console.log("blob is "+JSON.stringify(result[0].file));

            res.writeHead(200, {
                'Content-Type': fileType,
                'Content-disposition': 'attachment;filename=' + fileName,
                'Content-Length': blob.length
            });
            res.end(new Buffer(blob, 'binary'));

        });
    });



})


module.exports = router;