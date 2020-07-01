const path = require('path')
const glob = require('fast-glob')
const logger = require('./lib/logger')()
const componentLocator = require('./lib/registry')()

const taskrModule = () => {
  const taskr = {}
  logger.setInstance('t@skr cli')
  componentLocator.register('logger', logger)

  const run = (cmd, scriptName) => {
    const cwd = path.resolve('.')
    const dir = cwd.includes('node_modules')
      ? `${cwd}/../taskr/tasks/${scriptName}.js`
      : `${cwd}/taskr/tasks/${scriptName}.js`

    glob.sync(dir).forEach(taskPath => require(taskPath)(componentLocator))
  }

  taskr.run = run

  return taskr
}

module.exports = taskrModule
