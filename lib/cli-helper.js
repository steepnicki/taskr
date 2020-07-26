const config = require('../cli/config.json')
const commands = [
  {
    cmd: 'run',
    alias: ['r']
  },
  {
    cmd: 'help',
    alias: ['-h']
  }
]

const registerCmd = command => commands.push({ cmd: command })
const find = command =>
  commands.find(
    cmds => cmds.cmd === command || (cmds.alias && cmds.alias.includes(command))
  )

module.exports = { find, registerCmd, config }
