var DAOHelper = require('./DAOHelper.js');

var userDAO={
    sqlGetAll: "select username, email from user;",
    sqlFindByUsername: "select username, email from user where username = ?;",
    sqlInsert: "insert into user (username, password, email) values (?,md5(?),?);",
    sqlChangeEmail: "update user set email= ? where username = ?;",
    sqlChangePassword: "update user set password= md5(?) where username = ?;",
    sqlDelete: "delete from user where username =?;",
    sqlValidate: "select * from user where username = ? and password =md5(?);",
    // note that these methods are all the same except the sql and the data
    // in studentDAO2 we simplify that
    getAll:function(callback) {
        DAOHelper.callSQL(this.sqlGetAll,[],"GetAll",callback);
    },
    findByUsername:function(username,callback){
        DAOHelper.callSQL(this.sqlFindByUsername,[username],"FindByUsername",callback);
    },
    insert:function(user,callback){
        DAOHelper.callSQL(this.sqlInsert,[user.username,user.password, user.email],"insert",callback);
    },
    changeEmail:function(user,callback){
        DAOHelper.callSQL(this.sqlChangeEmail,[user.email,user.username],"changeEmail",callback);
    },
    changePassword:function(user,callback){
        DAOHelper.callSQL(this.sqlChangePassword,[user.password,user.username],"changePassword",callback);
    },
    delete:function(username,callback){
        DAOHelper.callSQL(this.sqlDelete,[username],"delete",callback);
    }


    // the others are the same
}

module.exports= userDAO;