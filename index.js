#! /usr/bin/env node
const task = require('./lib/task')
const taskr = require('./lib/taskr')
const logger = require('./lib/logger')()
const cliHelper = require('./lib/cli-helper')
const resourceLocator = require('./lib/registry')()
const eventHandler = require('./lib/event-handler')

resourceLocator
  .register('task', task)
  .register('logger', logger)
  .register('cliHelper', cliHelper)
  .register('eventHandler', eventHandler(resourceLocator))
  .register('taskr', taskr(resourceLocator))
  .logger.setInstance('taskr')

require('./cli/')(resourceLocator, process.argv)
