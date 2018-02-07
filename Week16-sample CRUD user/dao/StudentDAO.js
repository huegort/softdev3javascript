var DAOHelper = require('./DAOHelper.js');

var studentDAO={

    getAll:function(callback) {
        var sql= "select * from student;"
        DAOHelper.callSQL(sql,[],"GetAll",callback);
    },
    findById:function(id,callback){
        var sql= "select * from student where id = ?;"
        DAOHelper.callSQL(sql,[id],"FindByUsername",callback);
    },
    insert:function(student,callback){
        var sql= "insert into student (id, firstname, age) values (?,?,?)"
        DAOHelper.callSQL(sql,[student.id,student.firstname, student.age],"insert",callback);
    },
    update:function(student,callback){
        var sql = "update student set ? where id = ?;"
        DAOHelper.callSQL(sql,[student, student.id],"update",callback);
    },

    delete:function(id,callback){
        var sql = "delete from student where id = ?;"

        DAOHelper.callSQL(sql,[id],"delete",callback);
    }


    // the others are the same
}

module.exports= studentDAO;