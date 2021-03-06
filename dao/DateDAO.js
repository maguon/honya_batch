'use strict'
const db = require('../db/connection/MysqlDb.js');

const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLogger('DateDAO.js');

const queryDate = function(params,callback){
    const querySelect = "select * from date_base  where " +
        "id=? and  day=? and week=? and month=? and year=? and y_month=? and y_week=? ";
    let paramArray=[],i=0;
    paramArray[i++]=params.id;
    paramArray[i++]=params.day;
    paramArray[i++]=params.week;
    paramArray[i++]=params.month;
    paramArray[i++]=params.year;
    paramArray[i++]=params.yearMonth;
    paramArray[i]=params.yearWeek;
    db.dbQuery(querySelect,paramArray,(error,rows)=>{
        logger.debug(' queryDate ');
        callback(error,rows);
    });
}

const createDate = function(params,callback){
    const query='insert into date_base (`id`,`day`,`week`,`month`,`year`,`y_month`,`y_week`) values (?,?,?,?,?,?,?);'
    let paramArray=[],i=0;
    paramArray[i++]=params.id;
    paramArray[i++]=params.day;
    paramArray[i++]=params.week;
    paramArray[i++]=params.month;
    paramArray[i++]=params.year;
    paramArray[i++]=params.yearMonth;
    paramArray[i]=params.yearWeek;

    db.dbQuery(query,paramArray,(error,result)=>{
        logger.debug(' createDate ')
        callback(error,result)
    });
}

const initStorageStat = (callback)=>{
    const query="insert into storage_stat_date (date_id,storage_id,balance) " +
        "  (select DATE_FORMAT(CURRENT_DATE(),'%Y%m%d') as date_id ,ssd.storage_id ,ssd.balance " +
        " from storage_stat_date ssd left join storage_info si on ssd.storage_id=si.id " +
        " where ssd.date_id = DATE_FORMAT(date_sub(CURRENT_DATE(),interval 1 day),'%Y%m%d')) ";
    db.dbQuery(query,[],(error,result)=>{
        logger.debug(' initStorageStat ')
        callback(error,result)
    });
}

const initTransStat = (callback)=>{
    const query="insert into ship_trans_stat_date (date_id,booking,exports,arrive)  values" +
        "  ( DATE_FORMAT(CURRENT_DATE(),'%Y%m%d') , 0 ,0 ,0) " ;
    db.dbQuery(query,[],(error,result)=>{
        logger.debug(' initTransStat ')
        callback(error,result)
    });
}

const initLoanInStat = (callback)=>{
    const query="insert into loan_into_stat_date (date_id,loan_into_count,loan_into_money,repayment_count,repayment_money)  values" +
        "  ( DATE_FORMAT(CURRENT_DATE(),'%Y%m%d') , 0 ,0 ,0 ,0) " ;
    db.dbQuery(query,[],(error,result)=>{
        logger.debug(' initLoanInStat ')
        callback(error,result)
    });
}
const initLoanOutStat = (callback)=>{
    const query="insert into loan_stat_date (date_id,loan_count,loan_money,repayment_count,repayment_money)  values" +
        "  ( DATE_FORMAT(CURRENT_DATE(),'%Y%m%d') , 0 ,0 ,0 ,0) " ;
    db.dbQuery(query,[],(error,result)=>{
        logger.debug(' initLoanOutStat ')
        callback(error,result)
    });
}
module.exports = {queryDate , createDate,initStorageStat ,initTransStat ,initLoanInStat ,initLoanOutStat}