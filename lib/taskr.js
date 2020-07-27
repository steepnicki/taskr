const argsModule = require('args')

const createTaskr = resourceLocator => {
  const taskrModule = () => {
    const { logger, eventHandler, cliHelper } = resourceLocator
    const { initHeader, setSuffix } = logger
    const { config: cliOpts } = cliHelper
    const taskr = {}

    const init = args => {
      const command = args && args[2]

      initHeader('Initialising taskr...')
      setSuffix(command)

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
