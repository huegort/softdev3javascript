var dao = require('./bSimpleDAO');

dao.insert({id:1,name:"joe"});

dao.getAll(function(result){
    console.log(JSON.stringify(result));
    // send response to client

})

dao.findById(1,function(result){
    console.log(JSON.stringify(result));
    // send response to client

})

dao.update({id:1,name:"updated Joe"});
dao.findById(1,function(result){
    console.log(JSON.stringify(result));
    // send response to client

});
dao.delete(1);
dao.findById(1,function(result){
    console.log(JSON.stringify(result));
    console.log("should get no students:"+result.length);

})
console.log("yo");