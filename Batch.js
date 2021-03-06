/**
 * Created by lingxue on 2017/4/11.
 */
const later = require('later');
const Seq = require('seq');
const Promise = require('promise');
const sysConfig = require('./config/SystemConfig.js');
const serverLogger = require('./util/ServerLogger.js');
const dateBl = require('./bl/DateBl.js');
const logger = serverLogger.createLogger('Batch.js');


later.date.localTime();
logger.info('Log batch start at '+ (new Date()).toLocaleString());
const startBasic = {h:[0],m: [0],s:[5]};
const startComposite = [startBasic];
const startSched =  {
    schedules:startComposite
};

const endBasic ={h:[16],m: [14],s:[5]};
const endComposite = [endBasic];
const endSched = {
    schedules:endComposite
}


try{
    later.setInterval(()=>{

        dateBl.saveStatDate((err,result) =>{
            if(err){
                logger.error('create new date error:'+err.stack);
            }else{
                if(result && result.success){
                    logger.info('create new date success');
                }else{
                    logger.info('create new date false');
                }
            }
        });
        dateBl.initStorageStat((err,result)=>{
            if(err){
                logger.error('create new storage balance error:'+err.stack);
            }else{
                if(result && result.affectedRows){
                    logger.info('create new storage balance success');
                }else{
                    logger.info('create new storage balance false');
                }
            }
        })
        dateBl.initTransStat((err,result)=>{
            if(err){
                logger.error('create new ship trans stat error:'+err.stack);
            }else{
                if(result && result.affectedRows){
                    logger.info('create new trans stat success');
                }else{
                    logger.info('create new trans stat false');
                }
            }
        })
        dateBl.initLoanInStat((err,result)=>{
            if(err){
                logger.error('create new loan in stat error:'+err.stack);
            }else{
                if(result && result.affectedRows){
                    logger.info('create new loan in stat success');
                }else{
                    logger.info('create new loan in stat false');
                }
            }
        })
        dateBl.initLoanOutStat((err,result)=>{
            if(err){
                logger.error('create new loan out stat error:'+err.stack);
            }else{
                if(result && result.affectedRows){
                    logger.info('create new loan out  stat success');
                }else{
                    logger.info('create new loan out  stat false');
                }
            }
        })
    },startSched);
}catch(err){
    logger.error(err.stack);
}