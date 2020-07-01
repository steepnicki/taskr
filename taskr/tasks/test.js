const task = componentLocator => {
  const { logger } = componentLocator
  logger.info('calling test function')
  logger.info('initialised test task')
}

module.exports = task
