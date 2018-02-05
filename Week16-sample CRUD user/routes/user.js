var express = require('express');
var router = express.Router();
var userDAO = require('../dao/userDAO');

router.post('/create',function(req,res){
    var user = req.body;
    userDAO.insert(user, function(result){
        res.redirect("/users.html");
    });


});
router.post('/changePassword',function(req,res){
    var user = req.body;
    var user = req.body;
    userDAO.changePassword(user, function(result){
        res.send(result)
    });

});
router.post('/changeEmail',function(req,res){
    var user = req.body;
    userDAO.changeEmail(user, function(result){
       res.send(result)
    });

});
router.get('/getAll',function(req,res){
    userDAO.getAll(function(result){
        res.send(result);
    })

});
router.get('/findByUsername/:username',function(req,res){
    var username = req.param("username");
    userDAO.findByUsername(username,function(result){
        res.send(result);
    })

});
router.delete('/:username',function(req,res){
    var username = req.param("username");
    userDAO.delete(username,function(result){
        res.send(result);
    })

});



module.exports = router;