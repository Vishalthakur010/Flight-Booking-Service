const Logger = require("./logger-config").logger;
const serverConfig = require("./server-config");
const Queue = require('./queue-config')

module.exports={
    serverConfig,
    Logger,
    Queue
}