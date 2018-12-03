// setup logger to pass full stack to a file
const { createLogger, transports, format } = require('winston')
const logger = createLogger({
  format: format.printf((info) => {
    return `${info.level} ${info.message}`
  }),
  transports: [
    new transports.Console()
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' }),
    new transports.Console()
  ]
})
Error.stackTraceLimit = Infinity
// to allow the logger to catch up
setImmediate(() => {

  //require('./testDuplex')
  require('./testArray')
  
})
