var companyDAO = require('./dao/companyDAO');


companyDAO.findById(1, function(result){
    console.log(JSON.stringify(result));
})