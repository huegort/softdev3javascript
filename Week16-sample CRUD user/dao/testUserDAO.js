var userDAO = require('./UserDAO.js');


 userDAO.delete('joe', function(result){
     userDAO.insert({username:'joe',password:'123',email:'hi mom'},function(result){
         console.log("done?");
         userDAO.changeEmail({username:'joe',password:'123',email:'hi dad'});
         userDAO.changePassword({username:'joe',password:'456',email:'hi dad'});

     })
 })

userDAO.getAll(function(result){
    console.log(JSON.stringify(result));
})

userDAO.findByUsername('harry',function(result){
    console.log(JSON.stringify(result));
})
