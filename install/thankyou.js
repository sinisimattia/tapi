const { colored } = require('./consolehelpers')
const package = require('../package.json')

const message = "Thanks for using tapi!"
const version = colored("v", ) + package.version

const initialPadding = ' '.repeat(6)
const topBorder = '╔' + '═'.repeat(message.length + 2) + '╗'
const bottomBorder = '╚' + '═'.repeat(message.length + 2) + '╝'
const emptySection = '║ ' + ' '.repeat(message.length) + ' ║'

console.log(initialPadding + colored(topBorder));
console.log(initialPadding + colored(emptySection));
console.log(initialPadding + colored('║ ') + message + colored(' ║'));
console.log(initialPadding + colored(emptySection));
console.log(initialPadding + colored(bottomBorder));
console.log(initialPadding + ' '.repeat(message.length + 4 - version.length) + version)