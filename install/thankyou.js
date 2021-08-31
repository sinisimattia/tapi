const { colored } = require('./consolehelpers')

const initialPadding = ' '.repeat(6)
const message = "Thanks for using tapi!"
const topBorder = '╔' + '═'.repeat(message.length + 2) + '╗'
const bottomBorder = '╚' + '═'.repeat(message.length + 2) + '╝'
const emptySection = '║ ' + ' '.repeat(message.length) + ' ║'

console.log(initialPadding + colored(topBorder));
console.log(initialPadding + colored(emptySection));
console.log(initialPadding + colored('║ ') + message + colored(' ║'));
console.log(initialPadding + colored(emptySection));
console.log(initialPadding + colored(bottomBorder));