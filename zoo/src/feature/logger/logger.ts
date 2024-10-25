import { updateLogsList } from "../../dom/builder";
import { CreateDialog } from "../../dom/dialog/dialog";
import { LogType } from "./logger.types";

export class Logger {
  logs: LogType[] = [];
  static #instance: Logger;

  private constructor() {}
  public static get instance(): Logger {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }
  log(msg: string, msgDate: Date) {
    this.logs.push({ msg: msg, msgDate: msgDate });
    updateLogsList();
  }
  getAlllogs(): LogType[] {
    return this.logs;
  }
  logError(msg: string, msgDate: Date) {
    new CreateDialog("Error", msg);
    this.log(msg, msgDate);
    console.log(`%c Error: ${msg}`, "color: red");
  }
}
