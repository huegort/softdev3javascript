var express = require('express');
var router = express.Router();
var dao = require('../../dao/bSimpleDAO');

/* GET all students listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    dao.getAll(function(result){
        //console.log(result);
        res.send(result);
    })
    //console.log("in students home");
});
router.get('/:id', function(req,res,next){
    var id = req.param("id");
    dao.findById(id,function(result){
        res.send(result[0]);
    })
})
router.delete('/:id', function(req,res,next){
    var id = req.param("id");
    dao.delete(id,function(result){
        res.send("{success:true}");
    })
})
router.post('/create', function(req,res,next){
    var student = req.body;
    dao.insert(student, function(result){
        res.send("done");
    })
})
router.post('/update', function(req,res,next){
    var student = req.body;
    dao.update(student, function(result){
        res.send("done");
    })
})

module.exports = router;