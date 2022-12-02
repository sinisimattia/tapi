/**
 * An object describer helper.
 */
export default class Describer {
	/**
	 * Retrieve a list of all params of a class instance.
	 *
	 * @param instance The class to analyze.
	 * @returns A list of the class's properties.
	 */
	public static getParameters(instance: any): Array<string> {
		return Object.getOwnPropertyNames(instance).filter(propertyName => !(instance[propertyName] instanceof Function))
	}
}
