
module.exports.createLogger = function(winston) {

  const { createLogger, format, transports } = winston
  const { combine, timestamp, label, printf } = format;

  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  return createLogger({
    format: combine(
      timestamp(),
      myFormat
    ),
    transports: [
      new transports.File({ filename: './logs/smarthomeServer.log'}),
      new transports.Console()
    ]
  });
}


module.exports.initLogs = function(logger, fs) {
  try {
	   fs.unlinkSync("./logs/smarthomeServer.log")
  } catch(err) {
    logger.error(err)
  }
}
