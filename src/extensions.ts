import Builder from '@/Builder';
import ResourceFactory from '@/contracts/ResourceFactory';
import BuildableResource from '@/contracts/BuildableResource';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface Promise<T> {
		/**
		 * Converts the incoming data into a typed object and returns a promise with the built object.
		 * 
		 * @param classToBuild The class the object needs to be converted to.
		 * @return The typed object.
		 */
		as<T extends BuildableResource>(classToBuild: ResourceFactory<T>): Promise<T>;
		/**
		 * Converts an inner section of the incoming data into a typed object and returns a promise with the built object.
		 * 
		 * @param classToBuild The class the object needs to be converted to.
		 * @param from The inner property to convert.
		 * @return The typed object.
		 */
		as<T extends BuildableResource>(classToBuild: ResourceFactory<T>, from: string): Promise<T>;
	}
}

Promise.prototype.as = function<T extends BuildableResource> (classToBuild: ResourceFactory<T>, from: string = ''): Promise<T> {
	return this.then((input: any) => {
		return new Promise((resolve, reject) => {
			let result;
			try {
				if (from != '') {
					if (input.hasOwnProperty(from)) {
						input = input[from];
					}
					else {
						throw new Error(`Incoming object does not  contain a field called "${input}".`);
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