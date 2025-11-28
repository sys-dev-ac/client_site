// import winston from "winston";

// const logger = winston.createLogger({
//   level: import.meta.env.MODE === "development" ? "debug" : "info",
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.timestamp({ format: "HH:mm:ss" }),
//     winston.format.printf(
//       ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
//     )
//   ),
//   transports: [
//     // Browser-safe console transport
//     new winston.transports.Console(),
//   ],
// });

// // Optional: fallback for production errors
// if (import.meta.env.PROD) {
//   logger.exceptions.handle(new winston.transports.Console());
// }

// export default logger;
