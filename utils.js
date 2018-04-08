var crypto = require('crypto');
var moment = require('moment');
var Logger = require('./Logger');
var fs = require('fs');
var config = require('../config');
var WXBizDataCrypt = require('./WXBizDataCrypt');



//////////////////////////////////////////////////////////
//
//                Main Functions
//
//////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////
//
//                Common Tools Functions
//
//////////////////////////////////////////////////////////


exports.getFilenameInfo = function(filename){
    return getFilenameInfo(filename);
}
function getFilenameInfo(filename){
    filename = replaceAll("\\\\","/",filename);
    var pos_s = filename.lastIndexOf("/");
    var pos_e = filename.lastIndexOf(".");
    var name = filename.substring(pos_s+1,pos_e);
    var title = name;
    if(name.length>20){
        name = replaceAll(" ", "", name);
    }else {
        name = replaceAll(" ", "_", name);
    }
    var fullname = filename.substring(pos_s+1,filename.length);
    return {'title':title,'name':name,'fullname':fullname};
}


var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
exports.generateMixed = function(n) {
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*(35+26));
        res += chars[id];
    }
    return res;
}



exports.MD5= function(str){
    var md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex').toUpperCase();
}

exports.Timestamp=function(){
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}

exports.def_callback=function(ret){
    Logger.info(ret);
}

exports.sleep= function(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { }
}

exports.replaceAll = function (find, replace, str) {
    return replaceAll(find, replace, str);
}

function replaceAll(find, replace, str){
    return str.replace(new RegExp(find, 'g'), replace);
}
exports.searchStr = function(data,reg){
    var ret=[];
    data = replaceAll('\r\n','',data);
    var ge = new RegExp(reg);
    var match;
    while(match =  ge.exec(data))
        ret.push(match[1]);
    return ret;
}

exports.readFile = function(filepath,callback){
    fs.readFile(filepath,{encoding: 'utf-8'},function (err,data) {
        if(!err){
            callback(data);
        }else{
            callback({});Logger.error(err);
        }
    });
}

exports.encryptedWxData = function(sessionKey,encryptedData,iv){
    var pc = new WXBizDataCrypt(config.wechat.appID, sessionKey)

    var data = pc.decryptData(encryptedData , iv)

    return data;
}

exports.concatJSON=function(json1,json2){
    for (var key in json2) {
        json1[key] = json2[key];
    }
    return json1;
}



//Logger.info(this.MD5('reading-house-wx-app-static-devid'+'2',"UTF-8"))