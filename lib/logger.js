let suffix
let instance
const chalk = require('chalk')
const env = process.env.NODE_ENV || 'development'

const generateTimestamp = () => {
  const dateTime = new Date()
  const formattedDateTime = dateTime
    .toLocaleTimeString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(',', '')

  return chalk.dim(formattedDateTime)
}

const getTypeLabel = type => {
  switch (type) {
    case 'info':
      return chalk.cyan.bold('[info]')
    case 'warn':
      return chalk.yellow.bold('[warn]')
    case 'error':
      return chalk.red.bold('[error]')
    case 'success':
      return chalk.green.bold('[success]')
  }
}

const prefixGenerator = () => {
  const setInstance = name => (instance = name)
  const setSuffixInstance = name => (suffix = name)
  const generatePrefix = type => {
    const typeLabel = getTypeLabel(type)
    const timestamp = `${chalk.dim(generateTimestamp())}`
    const prefix = `${timestamp} ${typeLabel} ${
      suffix ? chalk.bold(`${instance} > ${suffix}`) : chalk.bold(instance)
    }:`
    return prefix
  }

  return { setInstance, setSuffixInstance, generatePrefix }
}

module.exports = () => {
  const prefix = prefixGenerator().generatePrefix
  const { log } = console
  const logger = {
    info: {},
    warn: {},
    error: {},
    custom: {},
    success: {},
    setSuffix: {},
    initHeader: {},
    stepSuccess: {},
    stepFailure: {},
    buildHeader: {},
    setInstance: {}
  }

  const info = (data, emphasis) =>
    log(
      `${prefix('info')} ${chalk.white(data)} ${
        emphasis ? chalk.cyan(emphasis) : ''
      }`
    )
  const warn = (data, emphasis) =>
    log(
      `${prefix('warn')} ${chalk.white(data)} ${
        emphasis ? chalk.cyan(emphasis) : ''
      }`
    )
  const error = (data, emphasis) =>
    log(
      `${prefix('error')} ${chalk.white(data)} ${
        emphasis ? chalk.red(emphasis) : ''
      }`
    )
  const custom = (data, emphasis) =>
    log(`${data} ${emphasis ? chalk.cyan(emphasis) : ''}`)
  const success = (data, emphasis) =>
    log(
      `${prefix('success')} ${chalk.white(data)} ${
        emphasis ? chalk.cyan(emphasis) : ''
      }`
    )
  const stepSuccess = data => log(`${chalk.green('>')} ${data}`)
  const stepFailure = data => log(`${chalk.red('X')} ${data}`)
  const buildHeader = () => {
    const colour = env === 'development' ? '#6495ed' : '#00bcd4'
    log(
      `${chalk.bgHex(colour).bold(`\n *** ${env.toUpperCase()} BUILD *** `)}\n`
    )
  }
  const initHeader = () => {
    log(`\n${prefix('info')} ${chalk.white('Initialising taskr...')}`)
  }

  if (suffix) suffix = null

  logger.info = info
  logger.warn = warn
  logger.error = error
  logger.custom = custom
  logger.success = success
  logger.initHeader = initHeader
  logger.stepFailure = stepFailure
  logger.stepSuccess = stepSuccess
  logger.buildHeader = buildHeader
  logger.setInstance = prefixGenerator().setInstance
  logger.setSuffix = prefixGenerator().setSuffixInstance

  return logger
}