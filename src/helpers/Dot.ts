export default class Dot {
	/**
	 * Get a value in a nested object with dot notation.
	 *
	 * @param path The path of the field you want written in "dot notation"
	 * @param object The object from which to extract the field from
	 * @param separator The character that splits the different levels of the object, defaults to '.'
	 * @returns The value of the selected field
	 */
	static get(path: string, object: any, separator: string = '.'): any {
		return path
			.split(separator)
			.reduce((level, key) => {
				if (level) return level[key]
			}, object)
	}

	/**
	 * Assigns a value to an object using dot-notation
	 *
	 * Kudos to [this article](https://www.tutorialspoint.com/safely-setting-object-properties-with-dot-notation-strings-in-javascript).
	 *
	 * @param path The path to which to assign the value
	 * @param object The object to modify
	 * @param value The value to assign
	 * @param separator The dot-notation separator
	 */
	static assign(path: string, object: any, value: any, separator: string = '.'): void {
		const levels = path.split(separator)
		if (levels.length === 0) throw new Error("Please provide a non-empty path.")
		else if (levels.length === 1) object[levels[0]] = value
		else {
			if (object[levels[0]])
				return Dot.assign(levels.slice(1).join(separator), object[levels[0]], value)
			else {
				object[levels[0]] = {}
				return Dot.assign(levels.slice(1).join(separator), object[levels[0]], value)
			}
		}
	}
}
