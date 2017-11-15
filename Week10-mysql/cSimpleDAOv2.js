var mysql = require('mysql');

var studentDAO={
    sqlGetAll: "select * from students;",
    sqlFindById: "select * from students where id = ?;",
    sqlInsert: "insert into students (id, name) values (?,?);",
    sqlUpdate: "update students set ? where id = ?;",
    sqlDelete: "delete from students where id =?;",
    // note that these methods are all the same except the sql and the data
    // in studentDAO2 we simplify that
    getAll:function(callback) {
       callSQL(this.sqlGetAll,[],"GetAll",callback);
    },
    findById:function(id,callback){
        callSQL(this.sqlFindById,[id],"FindById",callback);
    },
    insert:function(student,callback){
        callSQL(this.sqlInsert,[student.id,student.name],"insert",callback);
    },
    update:function(student,callback){
        callSQL(this.sqlUpdate,[student,student.id],"Update",callback);
    },
    delete:function(id,callback){
        callSQL(this.sqlDelete,[id],"delete",callback);
    }


    // the others are the same
}

function getConnection(){
    return  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'softdev3',
    });
}
function handleErrorandLog(err, name, result){
    if(err){
        console.log(err.sql);
        throw err;
    }
    console.log(name+": " + JSON.stringify(result));
}
function callSQL(sql, data, logInfo, callback){
    var con = getConnection();
    con.connect(function (err) {
        if (err) throw err;
       con.query(sql,data, function (err, result) {
            handleErrorandLog(err,logInfo,result);
            if(callback)callback(result);
        });
    });
}


module.exports= studentDAO;