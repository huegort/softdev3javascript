var express = require('express');
var router = express.Router();

router.get("/hi", function(req,res){
    res.send("hi there");
});
router.get("/test", function(req,res){
    res.render("fullPage/index");

})
router.get("/form/:name", function(req,res){
    var student = {id:12, name:"asdfsd",age:33,course:"asdfsd"};
    res.render("fullPage/form",{
        student:student
    });

})
router.get("/getAll", function(req,res){
    var cars = [{id:12,reg:"mo",make:"ford",model:"fiasta"},{id:123,reg:"D",make:"Kia",model:"kuga"}];
    res.render("fullPage/displayCars",{
        cars:cars
    });

})
module.exports = router