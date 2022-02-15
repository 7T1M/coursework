import Logger from "./Logger"

export const logger = function(userName?:string){
    var logger:Logger;
    if(userName){
        logger = new Logger(userName)
        return logger
    }

    return function(){
        return logger
    }
}