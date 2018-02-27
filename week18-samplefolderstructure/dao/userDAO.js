

var userDAO ={
    getAll: function(callback){
        console.log("getall called");
    },
    insert: function (user, callback) {
        console.log("insert");
    },
    checkLogin: function(username, password){
        return true;
    }
}

module.exports = userDAO;