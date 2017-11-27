var studentDAO= {
    sqlGetAll: "select * from students;",
    sqlFindById: "select * from students where id = ?;",
};
    function getAll(callback) {
    var con = getConnection(); // we need a different connection for each
    con.connect(function (err) {
        if (err) throw err;
        var data = [];
        con.query(studentDAO.sqlGetAll,[] ,function (err, result) {
            //handleErrorandLog(err,"getAll",result);
            if(callback)callback(result);
        });
    });
};
function findById(id,callback){
    var con = getConnection();
    con.connect(function (err) {
        if (err) throw err;
        var data = [id];
        con.query(studentDAO.sqlFindById,data, function (err, result) {
            //handleErrorandLog(err,"findById",result)
            if(callback)callback(result);
        });
    });
};
dao.getAll(function(result){
    console.log("Gandalf");
})
dao.findById(function(result){
    console.log("Bilbo");
})