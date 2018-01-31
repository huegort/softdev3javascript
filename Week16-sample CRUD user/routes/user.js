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
    res.send('to be done 2');

});
router.post('/changeEmail',function(req,res){
    res.send('to be done 2');

});
router.get('/getAll',function(req,res){
    userDAO.getAll(function(result){
        res.send(result);
    })

});
router.get('/findByUsername/:username',function(req,res){
    res.send('to be done 5');

});
router.delete('/:username',function(req,res){
    res.send('to be done 5');

});



module.exports = router;