var dao = require('./bSimpleDAO');

dao.getAll(function(result){
    console.log(JSON.stringify(result));
    // send response to client

})
console.log("yo");