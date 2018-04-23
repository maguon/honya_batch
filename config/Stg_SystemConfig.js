

const mysqlConnectOptions ={
    user: 'honya',
    password: 'honya_base',
    database:'honya_base',
    host: '47.93.121.1' ,
    charset : 'utf8mb4',
    //,dateStrings : 'DATETIME'
};


const logLevel = 'DEBUG';
const loggerConfig = {
    appenders: {
        devLogger: {
            "type": "dateFile",
            "filename": 'debug.log',
            "path": './log',
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    categories: {
        default: {
            appenders: ["devLogger"],
            level: "DEBUG"
        },
    }
}


const mongoConfig = {
    connect : 'mongodb://127.0.0.1:27017/log_records'
}


module.exports = { mysqlConnectOptions ,loggerConfig, logLevel , mongoConfig  }
