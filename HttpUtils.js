var fs = require('fs');
var url = require('url');

var Logger = require('./Logger');

var https = require('https');
var http = require('http');

//////////////////////////////////////////////////////////
//
//                http/https Request Functions
//
//////////////////////////////////////////////////////////

exports.process=function(req, res,callback){
    auth(req,res,function(){
        if(req.method==='GET'){
            callback(res,req.query);
        }else {
            if(req.headers['content-type'].indexOf('multipart/form-data')>=0){
                callback(res,req,req.query);
            }else {
                if (req.body) {
                    callback(res, req.body);
                } else {
                    var result = [], jsonStr;
                    req.on('data', function (chunk) {
                        result.push(chunk);
                    });
                    req.on('end', function () {
                        try {
                            jsonStr = JSON.parse(result);
                        } catch (err) {
                            jsonStr = null;
                        }
                        callback(res, jsonStr);
                    });
                }
            }
        }
    });
}

function execute_req(req_options,callback){

    var req=(req_options.port===443?https:http).request(req_options,function(res){
        if(res.statusCode ===302 || res.statusCode ===301){
            var new_req_options = gen_options(res.headers.location,req_options.method,req_options.Data);
            execute_req(new_req_options,callback);
        }else {
            Logger.info(res.headers);
            var content_length = res.headers['content-length'];
            res.on('data', function (chunk) {
                callback(false,content_length, chunk);
            });
            res.on('end', function () {
                callback(true,content_length, "");
            });
        }
    });

    req.on('error',function(err){
        err.position="EXECUTE_REQ";
        err.parameter = req_options;
        Logger.error(err);
    });
    if(req_options.method==='POST') {
        req.write(JSON.stringify(req_options.Data));
    }
    req.end();
}


function auth(req, res,callback){
    Logger.info(req.headers);
    var auth = !!req.headers['auth-id'] && !!req.headers['auth-key'];
    if(auth)
        callback();
    else
        jsonWrite(res,{"status":"auth error."});
}

function CURL(url,method,req_data,callback){
    Logger.info("CURLing " + url);
    var options = gen_options(url,method,req_data);
    var contants = '';
    execute_req(options,function(finished,content_length,chunk){
        if(!finished) {
            contants = contants + chunk;
        }else{
            callback(contants);
        }
    });
}

function jsonWrite (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            status:'error'
        });
    } else {
        res.json(ret);
    }
};
exports.jsonWrite = function (res, ret) {
    jsonWrite(res,ret);
};

function gen_headers(){
    return {
        'Content-Type':'application/xhtml+xml; charset=UTF-8'
    };
}

function gen_options(file_url,req_method,postData){
    var req_options={
        host: url.parse(file_url).host,
        port:url.parse(file_url).protocol==='https:'?443:80,
        path:url.parse(file_url).path,
        method:req_method,
        headers:gen_headers(),
        Data:postData,
        cus_url:file_url
    }
    return req_options;
}

/*
var max = 10;
var currentPage = 0
downmp3ByPage(currentPage,max);
*/

function FileDownload(file_url,dist_dir,savetofile,callback) {
    var options = gen_options(file_url,"GET",{});
    var file_name =dist_dir+ savetofile;
    var file = fs.createWriteStream(file_name);
    var downloaded_size = 0;
    execute_req(options,function(finished,content_length,chunk){
        if(finished){
            file.end();
            callback(file_name,content_length,downloaded_size);
        }else {
            file.write(chunk);
            downloaded_size = downloaded_size + Buffer.byteLength(chunk);
        }
    });
}
exports.execute_req = function(req_options,callback){
    execute_req(req_options,callback);
}

exports.CURL = function (url,method,req_data,callback) {
    CURL(url,method,req_data,callback);
}

exports.FileDownload = function (file_url,dist_dir,savetofile,callback) {
    FileDownload(file_url,dist_dir,savetofile,callback)
}