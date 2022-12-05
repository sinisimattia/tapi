/**
 * @param source Any source
 * @returns An exact copy of the given source
 */
import cloneDeep from 'deepclone'
export function deepCopy<T>(source: T): T {
	return cloneDeep(source) as T
};
