import winston from "winston";
import kleur from "kleur";

const logInfo = new winston.Logger({
    level: "info",
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            format: winston.format.printf(({level, message}) => {
                return `${kleur.blue(`[SMART_HOME] - ${new Date(Date.now()).toString()} -> [${level.toUpperCase()}]`)} ${kleur.blue(message as string)}`;
            })
        })
    ]
});

export default logInfo;