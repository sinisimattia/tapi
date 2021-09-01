import Builder from '@/Builder';
import ResourceFactory from '@/contracts/ResourceFactory';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface Promise<T> {
		as<T>(classToBuild: ResourceFactory<T>): Promise<T>;
	}
}

Promise.prototype.as = function<T> (classToBuild: ResourceFactory<T>): Promise<T> {
	return this.then(input => {
		return new Promise((resolve, reject) => {
			let result;
			try {
				result = new Builder(classToBuild).fromJSON(input)
				resolve(result);
			}
			catch (err) {
				reject(err);
			}
		})
	})
}