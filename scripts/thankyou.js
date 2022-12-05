const package = require('../package.json')

const colored = (message, color = 32) => {
	return "\x1b[" + color + "m" + message + "\x1b[0m"
}


const message = `
   __ Thanks for using   _     
  / /_____ _____  (_)   (_)____
 / __/ __ \`/ __ \\/ /   / / ___/
/ /_/ /_/ / /_/ / /   / (__  ) 
\\__/\\__,_/ .___/_(_)_/ /____/  
	  /_/    /____/ ${colored("v") + package.version}
`

const info = `     • • • • • • • • • •

Info & docs: ${colored(package.homepage, 34)}
License: ${colored(package.license, 35)}

By ${colored(package.author.name, 36)} and contributors
`

console.log(colored(message, 33))
console.log(info)