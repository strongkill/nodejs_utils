# nodejs_utils
my nodejs utils
#
һ�����ڹ��̵ĸ�Ŀ¼�µ�util��Ŀ¼��
��Ҫ�ڸ�Ŀ¼����һ��config.js�������ļ���ģ�����£�

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

CosUtils.js ��װ����Ѷȥ��COS

db.js��װ��MYSQL

HttpUtils.js ��װ��һЩhttp��https�ķ���

Logger.js ��װ����־����

PdfUtils.js ��װ��pdftoImg�ķ���

utils.js  һЩ�ճ�ʹ�õĹ����෽��

WXBizDataCrypt.js ������ķ��� 