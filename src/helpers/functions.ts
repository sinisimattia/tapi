/**
 * Get a value in a nested object with dot notation.
 *
 * @param path The path of the field you want written in "dot notation"
 * @param object The object from which to extract the field from
 * @param separator The character that splits the different levels of the object, defaults to '.'
 * @returns The value of the selected field
 */
export function dotAccess(path: string, object: any, separator: string = '.'): any {
	return path
		.split(separator)
		.reduce((level, key) => {
			if (level) return level[key]
		}, object)
}

/**
 * @param source Any object
 * @returns An exact copy of the given object
 */
import cloneDeep from 'lodash.clonedeep'
export function deepCopy<T>(source: T): T {
	return cloneDeep(source)
}
