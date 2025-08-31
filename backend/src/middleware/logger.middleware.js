import winston from "winston";
import path from "path";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, url, timestamp }) => {
      return JSON.stringify({
        severity: level,
        timestamp: timestamp,
        requestUrl: url,
        message: message,
      });
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(path.resolve(), "logs", "info.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(path.resolve(), "logs", "error.log"),
      level: "error",
    }),
  ],
});
