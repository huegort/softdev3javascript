var express = require('express');
var router = express.Router();

var counter = 0;
var cars={1:{id:1,reg:'123MO123',make:'ford',model:'modeo'}}

/* GET car listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cars));
    console.log("in cars home");
});
router.get('/:id', function(req, res, next) {
    var id = req.param("id");
    console.log("got param "+id);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cars[id]));

});
router.post('/create', function(req, res, next) {
    console.log(req.body);
    var car = req.body;
    // put into a database
    cars[car.id] = car;
    res.sendFile("C:\\Users\\ITS\\WebstormProjects\\softdev3javascript\\Week09-express2\\public\\index.html");
});

module.exports = router;