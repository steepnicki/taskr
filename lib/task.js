const path = require('path')
const glob = require('fast-glob')
const eventEmitter = require('events').EventEmitter
const event = new eventEmitter()

const findTask = taskName => {
  if (!taskName) return event.emit('task:missing')
  const cwd = path.resolve('.')
  const taskrDir = cwd.includes('node_modules')
    ? `${cwd}/../taskr/tasks/${taskName}.js`
    : `${cwd}/taskr/tasks/${taskName}.js`
  const task = glob.sync(taskrDir)

  if (!task.length) return event.emit('task:notFound')
  event.emit('task:found', task[0])
}

const runTask = (resourceLocator, taskPath) => {
  const task = require(taskPath)
  event.emit('task:init')
  task(resourceLocator, err => {
    if (err) event.emit('error', err)
    event.emit('done')
  })
}

module.exports = { findTask, runTask, event }
