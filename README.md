# nodejs_utils
my nodejs utils
#
一般存放于工程的根目录下的util子目录。
需要在根目录配置一个config.js的配置文件，模板如下：

{
  "common":{
    "project_path":"/nodejs_test",
    "server_ip" : "127.0.0.1",
    "server_port" : 3002,
    "upload_dir" : "/tmp"
  },
  "wechat" : {
    "appID": "",
    "appSecret": "",
    "token": "",
    "prefix": "",
    "mpPrefix": ""
  },
  "cos":{
    "SecretId": "",
    "bucket":"",
    "Region":"",
    "SecretKey": ""
  },
  "database":{
    "connectionLimit": 10,
    "host"     : "",
    "port"     : "",
    "user"     : "",
    "password" : "",
    "database" : "",
    "connectTimeout":1200
  },
  "pdfOptions":{
    "type": "jpg",
    "size": 1024,
    "density": 600
  }
}

CosUtils.js 封装的腾讯去的COS

db.js封装的MYSQL

HttpUtils.js 封装了一些http及https的方法

Logger.js 封装了日志方法

PdfUtils.js 封装了pdftoImg的方法

utils.js  一些日常使用的工具类方法

WXBizDataCrypt.js 加密类的方法 