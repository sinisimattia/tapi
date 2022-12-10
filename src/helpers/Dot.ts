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

	static assign(path: string, object: any, valueToAssign: any, separator: string = '.'): void {
		return path.split(separator).reduce(function (prev, curr, _idx, _arr) {
			if ( _idx == (_arr.length-1) && prev ) {
				prev[curr] = valueToAssign
			}

			return prev ? prev[curr] : null
		}, object || self)
	}
}
