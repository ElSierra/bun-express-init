import chalk from "chalk";
import config from "../../config/config";
import path from "path";

/**
 * Logger utility for consistent, colorful console logging with environment-based control
 */
class Logger {
  private enabled: boolean;

  constructor() {
    // Always enable logging in development, can be controlled in production
    this.enabled = config.isDev || process.env.ENABLE_LOGS === "true";
  }

  /**
   * Gets the caller information (file path and line number)
   */
  private getCallerInfo(): string {
    // Create an error to capture the stack trace
    const err = new Error();
    const stackLines = err.stack?.split("\n") || [];

    // The 4th line in the stack trace will be the actual caller (0-based index: 3)
    // Index 0 is Error creation, 1 is getCallerInfo, 2 is log method, 3 is caller
    const callerLine = stackLines[3] || "";

    // Parse the caller line to extract file path and line number
    const match = callerLine.match(/at\s+(?:.*\s+\()?(?:(.+):(\d+):(\d+))/);

    if (match) {
      const [, filePath, lineNumber] = match;
      // Get just the filename for cleaner logs
      const fileName = path.basename(filePath || "");
      return `${fileName}:${lineNumber}`;
    }

    return "unknown:0";
  }

  /**
   * Common logging function with caller information
   */
  private log(
    level: string,
    color: any,
    message: string,
    ...args: any[]
  ): void {
    if (!this.enabled && level !== "IMPORTANT") return;

    const callerInfo = this.getCallerInfo();
    console.log(color(`[${level}] [${callerInfo}] ${message}`), ...args);
  }

  /**
   * Log an informational message (blue)
   */
  info(message: string, ...args: any[]): void {
    this.log("INFO", chalk.blue, message, ...args);
  }

  /**
   * Log a success message (green)
   */
  success(message: string, ...args: any[]): void {
    this.log("SUCCESS", chalk.green, message, ...args);
  }

  /**
   * Log a warning message (yellow)
   */
  warn(message: string, ...args: any[]): void {
    this.log("WARNING", chalk.yellow, message, ...args);
  }

  /**
   * Log an error message (red)
   */
  error(message: string, ...args: any[]): void {
    this.log("ERROR", chalk.red, message, ...args);
  }

  /**
   * Log a debug message (gray) - only in development
   */
  debug(message: string, ...args: any[]): void {
    this.log("DEBUG", chalk.gray, message, ...args);
  }

  /**
   * Log a server status message (cyan)
   */
  server(message: string, ...args: any[]): void {
    this.log("SERVER", chalk.cyan, message, ...args);
  }

  /**
   * Force logging regardless of environment settings (magenta)
   */
  important(message: string, ...args: any[]): void {
    this.log("IMPORTANT", chalk.magenta, message, ...args);
  }
}

// Export a singleton instance
export const logger = new Logger();
