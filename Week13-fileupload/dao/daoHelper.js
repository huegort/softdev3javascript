var mysql = require('mysql');

var daoHelper = {

    callSQL: function (sql, data, logInfo, callback) {
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            con.query(sql, data, function (err, result) {
                handleErrorandLog(err, logInfo, result);
                if (callback) callback(result);
            });
        });
    }
}
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'softdev3',
    });
}
function handleErrorandLog (err, name, result) {
    if (err) {
        console.log(err.sql);
        throw err;
    }
    console.log(name + ": " + JSON.stringify(result));
}

module.exports= daoHelper;