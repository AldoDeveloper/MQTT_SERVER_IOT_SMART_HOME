import winston from "winston";
import kleur from "kleur";

const logSuccess = new winston.Logger({
    level: "debug",
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            format: winston.format.printf(({level, message}) => {
                return `${kleur.green(`[SMART_HOME] - ${new Date(Date.now()).toString()} -> [${level.toUpperCase()}]`)} ${kleur.green(message as string)}`;
            })
        })
    ]
});

export default logSuccess;