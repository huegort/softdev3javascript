var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');



router.get("/count", function(req,res,next){
   if (!req.session.count){
       req.session.count =0;
   }
   res.send(""+req.session.count++);

});

router.get("/set", function(req,res,next){
    if (req.session){
        req.session.check = true;
    }
    res.send("its set");

});
router.get("/unset", function(req,res,next){
    if (req.session){
        req.session.destroy(function(err){

        })

    }
    res.redirect('/login.html');

});

router.get("/checkSet", function(req,res,next){
    if (req.session && req.session.check){
        res.send("true");
    }
    res.send("false");

});


module.exports = router;