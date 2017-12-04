var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var dao = require('../dao/bSimpleDAO');

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



router.get('/download', function(req,res,next){
    console.log("upload");
})


module.exports = router;