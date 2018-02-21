var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var fileDAO = require('../dao/fileDAO');
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
        var tempPath = files.fileToUpload.path;
        var file={};
        file.fileName= files.fileToUpload.name;
        file.fileType= files.fileToUpload.type;
        file.fileSize= fs.statSync(tempPath).size;

        var fileSize = fs.statSync(tempPath).size;
        fs.open(tempPath, 'r', function (status, fd) {
            if (status) {
                console.log(status.message);
                return;
            }
            var buffer = new Buffer(fileSize);
            fs.read(fd, buffer, 0, fileSize, 0, function (err, num) {
                file.buffer= buffer;
                fileDAO.create(file, function (result) {

                    res.writeHead(200, {'content-type': 'text/html'});
                    res.write('You can down load the file ');
                    res.write(""+ result.insertId); // convwert the int to string
                    res.end();
                    // we should probably delete the temp file here
                });
            });
        });
    });
});



router.get('/download/:id', function(req,res,next){
    var id = parseInt(req.param("id"));
    console.log(id);

    fileDAO.findById(id, function ( result) {
        console.log(JSON.stringify(result));
        var buffer = result[0].file;
        res.writeHead(200, {
            'Content-Type': result[0].file_type,
            'Content-disposition': 'attachment;filename=' + result[0].file_name,
            'Content-Length': buffer.byteLength
        });
        res.end(buffer);


    });



})


module.exports = router;