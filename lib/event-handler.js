const eventHandler = resourceLocator => {
  const { logger, task } = resourceLocator
  const { success, error, info } = logger
  const { runTask } = task

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
        break
      case 'error':
        error('Taskr has encountered unexpected error, see info below.')
        error(`${data}\n`)
        break
      case 'done':
        success('The task has been completed.\n')
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
