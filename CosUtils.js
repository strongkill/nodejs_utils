var COS = require('cos-nodejs-sdk-v5');

var cos = new COS(config.cos);


exports.COS_sliceUploadFile = function (file,FileDir,cb) {
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
}