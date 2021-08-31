const { colored } = require('./consolehelpers')

const initialPadding = ' '.repeat(6)
const message = "Thanks for using tapi!"
const topBorder = initialPadding + '╔' + '═'.repeat(message.length + 2) + '╗'
const bottomBorder = initialPadding + '╚' + '═'.repeat(message.length + 2) + '╝'
const emptySection = initialPadding + '║ ' + ' '.repeat(message.length) + ' ║'

console.log(colored(topBorder));
console.log(colored(emptySection));
console.log(initialPadding + colored('║ ') + message + colored(' ║'));
console.log(colored(emptySection));
console.log(colored(bottomBorder));