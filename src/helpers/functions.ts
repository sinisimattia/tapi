/**
 * @param source Any object
 * @returns An exact copy of the given object
 */
import cloneDeep from 'lodash.clonedeep'
export function deepCopy<T>(source: T): T {
	return cloneDeep(source) as T
}
