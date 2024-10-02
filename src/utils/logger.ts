import { createLogger, format, transports } from "winston";
import { format as dateFnsFormat } from "date-fns"; // Import date-fns for date formatting
import * as fs from "fs";
import * as path from "path";

// Function to create log directory based on the current date
const createLogDirectory = () => {
  const date = dateFnsFormat(new Date(), "yyyy-MM-dd"); // Format the current date
  const logDirectory = path.join(__dirname, "..", "logs", date); // Define the log directory path

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true }); // Create directory if it doesn't exist
  }

  return logDirectory;
};

const logDirectory = createLogDirectory(); // Call the function to create the log directory

const logger = createLogger({
  level: "info", // Set default log level
  format: format.combine(
    format.timestamp(), // Add timestamp
    format.json(), // Log in JSON format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({
      filename: path.join(logDirectory, "error.log"), // Log errors to error.log in date folder
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDirectory, "combined.log"), // Log all info logs to combined.log in date folder
    }),
  ],
});

export default logger;
