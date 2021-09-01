import Builder from '@/Builder';
import ResourceFactory from '@/contracts/ResourceFactory';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface Promise<T> {
		as<T>(classToBuild: ResourceFactory<T>, from: string): Promise<T>;
	}
}

Promise.prototype.as = function<T> (classToBuild: ResourceFactory<T>, from: string = ''): Promise<T> {
	return this.then((input: any) => {
		return new Promise((resolve, reject) => {
			let result;
			try {
				if (from != '') {
					if (input.hasOwnProperty(from)) {
						input = input[from];
					}
					else {
						throw new Error(`Incoming object does not contain a field called "${input}".`);
					}
				}

				result = new Builder(classToBuild).fromJSON(input)
				resolve(result);
			}
			catch (err) {
				reject(err);
			}
		})
	})
}