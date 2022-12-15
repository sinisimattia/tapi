const p = require('../package.json')

const colored = (message, color = 32) => {
	return "\x1b[" + color + "m" + message + "\x1b[0m"
}


const message = `
   __ Thanks for using   _     
  / /_____ _____  (_)   (_)____
 / __/ __ \`/ __ \\/ /   / / ___/
/ /_/ /_/ / /_/ / /   / (__  ) 
\\__/\\__,_/ .___/_(_)_/ /____/  
	  /_/    /____/ ${colored("v") + p.version}
`

const info = `     • • • • • • • • • •

Info & docs: ${colored(p.homepage, 34)}
License: ${colored(p.license, 35)}

By ${colored(p.author.name, 36)} and contributors
`

console.log(colored(message, 33))
console.log(info)