exports.colored = (message, color = 32) => {
	return "\x1b[" + color + "m" + message + "\x1b[0m"
}