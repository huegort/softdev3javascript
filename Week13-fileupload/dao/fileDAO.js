var daoHelper = require('./daoHelper');


var fileDAO = {
    create: function (file, callback){
        var query = "INSERT INTO files SET ?";
        var data = {
            file_name: file.fileName,
            file_type: file.fileType,
            file_size: file.fileSize,
            file: file.buffer
        };
        daoHelper.callSQL(query, data,"create file", callback);
    },
    findById: function(id, callback){
        var sql = "select * from files where id = ?";
        daoHelper.callSQL(sql, [id],"create file", callback);
      }


}

module.exports = fileDAO;