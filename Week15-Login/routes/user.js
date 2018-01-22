var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');



router.post("/create", function(req,res,next){
    console.log("in create "+JSON.stringify(req.body));
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;

    userDAO.create(user,function(){
        res.send({create:true});
    })

});

router.get("/", function(req,res,next){
    console.log("in getAll");
    userDAO.getAll(function (result) {
        res.send(result);
    })



})


module.exports = router;