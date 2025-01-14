import winston from "winston";
import kleur from "kleur";

const logError = new winston.Logger({
    level: "error",
    exitOnError: false,
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            format: winston.format.printf(({ level, message }) => {
                return `${kleur.red(`[SMART_HOME] -> [${level.toUpperCase()}]`)} ${kleur.red(message as string)}`;
            })
        })
    ]
});

export default logError;