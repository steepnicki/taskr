const eventHandler = resourceLocator => {
  const { logger, task } = resourceLocator
  const {
    warn,
    custom,
    success,
    error,
    info,
    setSuffix,
    restoreSuffix
  } = logger
  const { runTask } = task
  const errorList = []

  const handleEvent = (event, data) => {
    switch (event) {
      case 'task:found':
        runTask(resourceLocator, data)
        break
      case 'task:notFound':
        error('Requested task not found.\n')
        break
      case 'task:missing':
        error('Task name is required.')
        info('Need help? Try', 'taskr help\n')
        break
      case 'task:init':
        info('Found task', `"${data.toString().toUpperCase()}"`)
        info('The task is now starting...\n')
        setSuffix(data)
        break
      case 'error':
        errorList.push(data)
        break
      case 'done':
        custom('')
        restoreSuffix()

        if (!errorList) return success('The task has been completed.\n')
        error('Taskr has encountered unexpected error/s, see info below.')
        errorList.forEach(err => error(`${err.message} [ ${err.origin} ]`))
        warn('The task has been completed with errors.\n')

        break
      case 'cmd:missing':
        error('Command is required.')
        info('Need help? Try', 'taskr help')
        break
      case 'cmd:notFound':
        error(`"${data}" is not a command.`)
        info('Need help? Try', 'taskr help')
        break
      default:
        error('Unexpected event has been called!\n')
    }
  }

  return handleEvent
}

module.exports = eventHandler
