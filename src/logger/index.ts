import logError from "./error.logger";
import logInfo from "./info.logger";
import logSuccess from "./success.logger";

const logger = {
    
    info : function(message: string) {
        return logInfo.log("info", message)
    },

    err : function(message: string) {
        return logError.log("error", message)
    },

    debug : function(message: string) {
        return logSuccess.log("debug", message)
    },
}

export default logger;