import winston from "winston";

const logger = winston.createLogger({

    defaultMeta:{
        service:"todo-api",
        environment:process.env.NODE_ENV || "development"
    },

    level:"info",

    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports:[
        new winston.transports.Console()
    ]

});
export { logger };