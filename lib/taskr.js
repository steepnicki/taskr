const argsModule = require('args')

const createTaskr = resourceLocator => {
  const taskrModule = () => {
    const taskr = {}
    const { logger, eventHandler, cliHelper } = resourceLocator
    const { config: cliOpts } = cliHelper
    const { initHeader } = logger

    const init = args => {
      initHeader('Initialising taskr...')
      argsModule
        .command(
          'run',
          'taskr [run] [task name] - runs selected task',
          taskr.run,
          ['r']
        )
        .parse(args, cliOpts)
    }

    const run = (cmd, taskName) => {
      logger.setSuffix('run')
      if (!taskName.length) return eventHandler('task:missing')

      const { task } = resourceLocator
      const { findTask, event } = task

      event
        .on('task:found', task => eventHandler('task:found', task))
        .on('task:notFound', () => eventHandler('task:notFound'))
        .on('task:missing', () => eventHandler('task:missing'))
        .on('task:init', () => eventHandler('task:init', taskName))
        .on('error', err => eventHandler('error', err))
        .on('done', () => eventHandler('done'))

      findTask(taskName)
    }

    taskr.run = run
    taskr.init = init

    return taskr
  }

  return taskrModule()
}

module.exports = createTaskr
