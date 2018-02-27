var express = require('express');
var userDAO = require('../dao/userDAO');

var router = express.Router;


router.post("/login", function(req, res){
    //sadsadgf
    if (userDAO.checkLogin()){
        render("page/welcome",{
            username: "joe"
        })
    }
})


module.exports = router;