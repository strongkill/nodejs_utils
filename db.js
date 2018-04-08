var mysql      = require('mysql');
var config = require('../config');
var Logger = require('./Logger');
var pool = mysql.createPool(config.database);


exports.shutdown = function(){
    this.done();
}
exports.done=function(){
    pool.end(function(err){});
}

/**
 *
 * @param obj {tablename:TABLE_NAME,key:{name:KEY_NAME,value:KEY_VALUE},columns:{COLUMNS_NAME:VALUE}}
 * @param cb
 */
exports.updateObject = function(obj,cb){
    if(obj===undefined){cb({err:"Obj is requested."});return;}
    if(obj.tablename===undefined){cb({err:"table's name is requested."});return}
    if(obj.key===undefined){cb({err:"table's key is requested."});return}
    var sql ="update ?? set ";
    for (var key in obj.columns) {
       sql = sql + key+"="+ mysql.escape(obj.columns[key])+","
    }
    sql = sql.substring(0,sql.length-1);
    sql += " where ?? = ? ";
    sql = mysql.format(sql,[obj.tablename,obj.key.name,obj.key.value]);
    query(sql,{},function(result){
        cb(result);
    })
}

exports.saveObject = function(obj,cb){
    saveObject(obj,cb)
}

function saveObject(obj,cb){
    var sql = "insert into ?? set ";
    for (var key in obj.columns) {
        sql = sql + key + "=" + mysql.escape(obj.columns[key]) + ","
    }
    sql = sql.substring(0, sql.length - 1);
    sql = mysql.format(sql, [obj.tablename]);
    query(sql, {}, function (result) {
        if (result.insertId === 0)
            result.insertId = obj.columns[obj.key.name];
        cb(result);
    })
}

/**
 *
 * @param obj {tablename:TABLE_NAME,key:{name:KEY_NAME,value:KEY_VALUE},columns:{COLUMNS_NAME:VALUE}}
 * @param cb
 */
exports.saveOrUpdateObject = function(obj,cb){
    if(obj === undefined){cb({err:"Obj is requested."});return;}
    if(obj.tablename === undefined){cb({err:"table's name is requested."});return}
    if(obj.key === undefined){cb({err:"table's key is requested."});return}
    if(obj.key.value !== undefined && obj.key.value !== ''){
        if(obj.key.value !== obj.columns[obj.key.name]){cb({err:'KEY value ERROR!'});return}
        this.updateObject(obj,function(results){
            if(results.changedRows>0 || results.affectedRows>0){
                cb(results);
            }else{
                saveObject(obj,cb);
            }
        })
    }else {
        saveObject(obj,cb);
    }
}

exports.executeBatchUpdate = function(preparedSql,datas,callback){
    pool.getConnection(function(err, connection) {
    });
}

exports.delete = function(sql,data,callback){
    query(sql,data,function(results,fields){
        callback(results.affectedRows);
    })
}

exports.insert = function(sql,data,callback){
    query(sql,data,function(results,fields){
       callback(results.insertId);
    });
}
exports.query = function(sql,data,callback){
    query(sql,data,function(results,fields){
        callback(results);
    });
}
exports.update = function(sql,data,callback){
    query(sql,data,function(results,fields){
       callback(results.changedRows);
    });
}

function query(sql,data,callback){
    var currentTime = Date.now();
    pool.getConnection(function(err, connection) {
        if(connection) {
            connection.query(sql, data, function (error, results, fields) {
                var currentTime2 = Date.now() - currentTime;
                if (currentTime2 > 2000)
                    Logger.warn(currentTime2 + " ms , slow SQL:" + sql);

                connection.release();
                if (error) {
                    error.position = "QUERY";
                    error.parameter = sql;
                    throw error;
                }
                //if(results.length>0){
                callback(results, fields);
                //}
            });
        }else{
            callback({},{});
        }
    });
}
