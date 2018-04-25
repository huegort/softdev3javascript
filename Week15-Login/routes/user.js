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

router.post("/login", function(req,res,next) {
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    //userDAO.checklogin(user,function(result){
    var canLogin = true // result.canLogin
    if (canLogin){
        req.session.check= true;
        req.username = user.username;
        res.redirect("/welcome.html");
    }else{
        res.redirect("/login.html");
    }
    //})
})

router.get("/", function(req,res,next){
    console.log("in getAll");
    userDAO.getAll(function (result) {
        res.send(result);
    })



})


module.exports = router;