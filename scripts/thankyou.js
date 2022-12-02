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

console.log(colored(message, 33))