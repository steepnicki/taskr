const cli = (resourceLocator, args) => {
  const { taskr, eventHandler, cliHelper } = resourceLocator
  const { find: cmdExists } = cliHelper
  const { init } = taskr
  const command = args && args[2]

  if (!command) return eventHandler('cmd:missing')
  cmdExists(command) ? init(args) : eventHandler('cmd:notFound', command)
}

module.exports = cli
