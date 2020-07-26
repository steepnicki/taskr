const task = (resourceLocator, cb) => {
  const { logger } = resourceLocator
  logger.info('calling test function')
  logger.info('initialised test task')
  cb(null)
}

module.exports = task
