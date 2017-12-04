var express = require('express');
var formidable = require('formidable');
var    http = require('http');
var    util = require('util');
var router = express.Router();
var dao = require('../dao/bSimpleDAO');

/* GET all students listing. */
router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain'});
        console.log(JSON.stringify(err));

        console.log(JSON.stringify(fields));
        console.log(JSON.stringify(files));
        res.send('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));
    });
    console.log("upload");
});
router.get('/download', function(req,res,next){
    console.log("upload");
})


module.exports = router;