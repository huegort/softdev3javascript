var daoHelper = require('./daoHelper');

var companyDAO = {
    findById: function(id, callback){
        //var sql = "select * from company where id = ?";
        var sql = "select company.id, company.name, address.id, address.street from company " +
            "join address on company.id = address.company_id" +
            " where company.id = ?;"
        daoHelper.callSQL(sql,[id],"findById", callback);
    }

}

module.exports = companyDAO;