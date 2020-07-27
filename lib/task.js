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
  event.emit('task:found', { path: task[0], name: taskName })
}

const runTask = (resourceLocator, { path, name }) => {
  const task = require(path)
  event.emit('task:init', name)

  task(resourceLocator, err => {
    if (err) event.emit('error', err)
    event.emit('done')
  })
}

module.exports = { findTask, runTask, event }
