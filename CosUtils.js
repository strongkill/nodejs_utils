var COS = require('cos-nodejs-sdk-v5');
var config = require('../config');
var utils = require('./utils')

var cos = new COS(config.cos);


/**
 *
 * @param srcFile  本地文件全路径
 * @param desFile  COS文件全路径
 * @param cb  回调函数
 * @private
 */
function _sliceUploadFile(srcFile,desFile,cb){
    var cfg ={
        Bucket: config.cos.bucket,
        Region: config.cos.Region,
        Key:desFile,
        FilePath: srcFile
    }
    cos.sliceUploadFile(cfg, function (err, data) {
        cb(err, data);
    });
}
/**
 *
 * @param srcFile  本地文件全路径
 * @param desFile  COS文件全路径
 * @param cb  回调函数
 * @private
 */
exports.COS_sliceUploadFile = function (srcFile,desFile,cb) {
    _sliceUploadFile(srcFile,desFile,cb);
}

/**
 *  保持文件名不变。
 * @param srcFile本地文件全路径
 * @param desDir COS文件目录
 * @param cb
 * @private
 */
function _sliceUploadFileUnchangName (srcFile,desDir,cb){
    var fileInfo = utils.getFilenameInfo(srcFile);
    _sliceUploadFile(srcFile,desDir+"/"+fileInfo.fullname,cb);
}

/**
 *  保持文件名不变。
 * @param srcFile本地文件全路径
 * @param desDir COS文件目录
 * @param cb
 * @constructor
 */
exports.COS_sliceUploadFileUnchangName = function (file,desDir,cb) {
    _sliceUploadFileUnchangName(file,desDir,cb);
}


/*
_sliceUploadFileUnchangName("d:\\tmp\\upload_313435d55dbdd8d6c461bf3f5bdee045.silk","/user_voice",function(err,data){
    console.log(err);
    console.log(data);
})
*/
/*
exports.COS_sliceUploadFile = function (file,desDir,cb) {
    var fileInfo = getFilenameInfo(file);
    var cfg ={
        Bucket: config.cos.bucket,
        Region: config.cos.Region,
        Key:FileDir!==undefined?FileDir+ "/" + fileInfo.fullname:fileInfo.name + "/" + fileInfo.fullname,
        FilePath: file
    }
    cos.sliceUploadFile(cfg, function (err, data) {
        cb(err, data);
    });
}*/