//var dao = require('./bSimpleDAO');
/* Welcome to call back hell
this is one way of making sure that the mysql calls happen in order
 */

var dao = require('./cSimpleDAOv2');

dao.insert({id:1,name:"joe"}, function(){
    dao.getAll(function(result){
        console.log(JSON.stringify(result));
        dao.findById(1,function(result){
            console.log(JSON.stringify(result));
            dao.update({id:1,name:"updated Joe"},function(){
                dao.findById(1,function(result){
                    console.log(JSON.stringify(result));
                    dao.findById(1,function(result){
                        console.log(JSON.stringify(result));
                        dao.delete(1, function(){
                            dao.findById(1,function(result){
                                console.log(JSON.stringify(result));
                                console.log("should get no students:"+result.length);

                            })

                        });

                    });

                });

            });

        })

    })

});


console.log("yo");