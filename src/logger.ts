import Case from 'case'
import { Logger as Winston, createLogger, format, transports } from 'winston'

export class Logger {
  private logger: Winston
  private label: string | null = null

  constructor() {
    this.logger = createLogger(this.getLoggerConfig())
  }

  public setLabel(label: string) {
    this.label = label
    this.logger.configure(this.getLoggerConfig())
    return this
  }

  public info(message: string, ...meta: any[]) {
    return this.logger.info(message, meta)
  }

  public warn(message: string, ...meta: any[]) {
    return this.logger.warn(message, meta)
  }

  public debug(message: string, ...meta: any[]) {
    return this.logger.debug(message, meta)
  }

  public error(message: string, error?: Error) {
    return this.logger.error(error ? `${message}\n\t` : message, error)
  }

  private getLoggerConfig() {
    return {
      transports: [new transports.Console(this.getConsoleTransportOptions())],
    }
  }

  private getConsoleTransportOptions() {
    const colorizeFormat = format.colorize({ colors: { label: 'gray' } })

    return {
      level: 'info',
      format: format.combine(
        format.metadata(),
        format.printf((info) => {
          return (
            '[' +
            colorizeFormat.colorize(
              info.level,
              `${Case.constant(info.level)}`
            ) +
            ']' +
            colorizeFormat.colorize(
              'label',
              `${this.label ? ` (${this.label}) ` : ' '}`
            ) +
            `${info.message}`
          )
        })
      ),
    }
  }
}
