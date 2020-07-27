const task = (resourceLocator, cb) => {
  const { logger } = resourceLocator
  logger.info('Hello world!')
  logger.warn('Example of warn log.')
  logger.info('This is an example of taskr compatible task :)')
  cb(null)
}

module.exports = task
