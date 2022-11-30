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
			if (level) return level[key];
		}, object)
}

/**
 * Credit: [this article](https://javascript.plainenglish.io/deep-clone-an-object-and-preserve-its-type-with-typescript-d488c35e5574)
 * 
 * @param source Any object
 * @returns An exact copy of the given object
 */
import cloneDeep from 'lodash.clonedeep';
export function deepCopy<T>(source: T): T {
    // return Array.isArray(source)
	// 	? source.map(item => deepCopy(item))
	// 	: source instanceof Date
	// 	? new Date(source.getTime())
	// 	: source && typeof source === 'object'
	// 	? Object.getOwnPropertyNames(source).reduce((o, prop) => {
	// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// 		Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
	// 		o[prop] = deepCopy((source as { [key: string]: any })[prop]);
	// 		return o;
	// 	}, Object.create(Object.getPrototypeOf(source)))
	// 	: source as T;
	return cloneDeep(source);
}