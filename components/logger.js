/**
 * Configurations of logger.
 */
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const consoleConfig = [
    new winston.transports.Console({
        'colorize': true
    })
];

const createLogger = new winston.Logger({
    'transports': consoleConfig
});

const successLogger = createLogger;
successLogger.add(winstonRotator, {
    'name': 'access-file',
    'level': 'info',
    'filename': 'application-%DATE%.log',
    'dirname': './logs',
    'datePattern': 'YYYY-MM-DD',
});

const errorLogger = createLogger;
errorLogger.add(winstonRotator, {
    'name': 'error-file',
    'level': 'error',
    'filename': 'error--%DATE%.log',
    'dirname': './logs',
    'datePattern': 'YYYY-MM-DD',
});

module.exports = {
    'successlog': successLogger,
    'errorlog': errorLogger
};