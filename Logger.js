var utils = require('./utils');

var LOG_LEVEL=['ALL'];//'ALL','INFO','DEBUG','ERROR'

exports.info=function(msg){
    if(logLevel('ALL')||logLevel('INFO'))
        console.log(utils.Timestamp()+' [INFO] : '+JSON.stringify(msg));
}

exports.warn = function (msg){
    if(logLevel('ALL')||logLevel('WARN'))
        console.warn(utils.Timestamp()+' [WARN] : '+JSON.stringify(msg));
}

exports.error=function(msg){
    if(logLevel('ALL')||logLevel('ERROR'))
        console.error(utils.Timestamp()+' [ERROR] : '+JSON.stringify(msg));
}
exports.debug=function(msg){
    if(logLevel('ALL')||logLevel('ERROR')||logLevel('DEBUG'))
        console.log(utils.Timestamp()+' [DEBUG] : '+JSON.stringify(msg));
}


function logLevel(log_level){
    for(var logLeveli=0;logLeveli<LOG_LEVEL.length && LOG_LEVEL.length>0;logLeveli++){
        if(log_level===LOG_LEVEL[logLeveli]){
            return true;
            break;
        }
    }
    return false;
}