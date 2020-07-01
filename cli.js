#! /usr/bin/env node
const args = require('args')
const taskr = require('./taskr')()

args
  .command(
    'run',
    'taskr [run] [task name] - executes requested task',
    taskr.run,
    ['r']
  )
  .parse(process.argv)
