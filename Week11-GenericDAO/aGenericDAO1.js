/* in the mapping I could make
the id be the first entry
i'll look at that later

I also need to sort out
1. connection pools
and
2. how we initialise this

 */
var mysql = require("mysql");
var genericDAO = {
    mode:"CREATE",
    tableName:"students2",
    mapping:{
        id:{colName:'id', type:"INT"},
        name:{colName:'fullname', type:"varchar(20)"},
        age:{colName:'age', type:"INT"}
    },
    attributes:[],
    colNames:[],

    getConnection:function (){
        return  mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'softdev3',
        });
    },

    createSQLStatements:function(){
        var tableName = this.tableName;
        var createData="";
        var insertCols="";
        var insertQMarks="";
        var updateSets="";
        var first = true;
        for (key in this.mapping){
            var colName= this.mapping[key].colName;
            var type = this.mapping[key].type;
            this.attributes.push(key);

            this.colNames.push();
            if (first){
                createData +=colName+ " "+ type;
                insertCols +=this.mapping[key].colName;
                insertQMarks +="?";
                updateSets +=colName+"=?";
                first = false;
            }else{
                createData +=" ,"+colName+ " "+ type;
                insertCols +=" , "+this.mapping[key].colName;
                insertQMarks +=" ,?";
                updateSets +=" , "+colName+"=?"
            }
        }

        this.checkTableExists = "SHOW TABLES LIKE '"+tableName+"';"
        this.sqlCreateTable = "create table "+tableName+
            " ( "+createData+" );";
        this.sqlGetAll = "select * from "+tableName+";";
        this.sqlFindById = "select * from "+tableName+ " where id = ?;";
        this.sqlInsert = "insert into "+tableName+
            "( "+insertCols+" ) values ("+insertQMarks+");";
        this.sqlUpdate = "update "+tableName+
            " set "+updateSets+" where id = ?;";
        this.sqlDelete = "delete from "+tableName+ " where id = ?";


        console.log("Check SQL statements");
        console.log("\t"+this.checkTableExists);
        console.log("\t"+this.sqlCreateTable);
        console.log("\t"+this.sqlGetAll);
        console.log("\t"+this.sqlFindById);
        console.log("\t"+this.sqlInsert);
        console.log("\t"+this.sqlUpdate);
        console.log("\t"+this.sqlDelete);

    },
    initialise:function(callback){
        this.createSQLStatements();
        if (this.mode ==="CREATE"){
            callSQL(this.checkTableExists,[],"exists",function (result) {
                if(result.length == 0) {
                    callSQL(genericDAO.sqlCreateTable, [], "create",function(result){
                        if(callback)callback(result);
                    });
                }else{
                    if(callback)callback(result);
                }
            })

        }
    },
    getAll:function(callback) {
        callSQL(this.sqlGetAll,[],"GetAll",callback);
    },
    findById:function(id,callback){
        callSQL(this.sqlFindById,[id],"FindById",callback);
    },
    insert:function(obj,callback){
        callSQL(this.sqlInsert,getDataArrayFromObj(obj),"insert",callback);
    },
    update:function(obj,callback){
        var data = getDataArrayFromObj(obj);
        data.push(obj.id);
        callSQL(this.sqlUpdate,data,"Update",callback);
    },
    delete:function(id,callback){
        callSQL(this.sqlDelete,[id],"delete",callback);
    }


}
//genericDAO.initialise();
function handleErrorandLog(err, name, result){
    if(err){
        console.log(err.sql);
        throw err;
    }
    console.log(name+": " + JSON.stringify(result));
}
function callSQL(sql, data, logInfo, callback){
    var con = genericDAO.getConnection();
    console.log(data)
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql,data, function (err, result) {
            handleErrorandLog(err,logInfo,result);
            if(callback)callback(result);
        });
    });
}
function getDataArrayFromObj(obj){
    var attributes = genericDAO.attributes;
    var len = attributes.length;
    var dataArray = [];
    for (var i= 0; i< len; i++){
        dataArray.push(obj[attributes[i]]);
    }
    return dataArray;

}


module.exports= genericDAO;