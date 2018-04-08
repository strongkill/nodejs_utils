var pdf2img = require('pdf2img');
var utils = require('./utils');

exports.convertpdf2img = function(input,cus_options,cb){
    var options = utils.concatJSON(config.pdfOptions,cus_options);
    pdf2img.setOptions(options);
    pdf2img.convert(input,function (err,info) {
        if(err){
            cb(err);
        }else {
            cb(info);
        }
    })
};
