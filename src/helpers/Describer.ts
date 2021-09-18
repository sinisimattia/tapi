/**
 * An object describer helper.
 */
export default class Describer {
	/**
	 * Retreive a list of all params of a class instance.
	 * 
	 * @param instance The class to analyze.
	 * @returns A list of the class's properties.
	 */
	public static getParameters(instance: unknown): Array<string> {
		return Object.getOwnPropertyNames(instance);
	}
}