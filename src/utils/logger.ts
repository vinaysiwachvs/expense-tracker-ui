export type LogLevel = "debug" | "info" | "warn" | "error";
export default class Logger {
  private moduleName: string;
  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }
  //eslint-disable-next-line
  log(message: string, level: LogLevel = "debug", ...args: any) {
    if (level === "debug") {
      console.log(`[${this.moduleName}] [${level}] ${message}`, args);
    } else {
      console.log(`[${this.moduleName}] [${level}] ${message}`, args);
    }
  }
}
