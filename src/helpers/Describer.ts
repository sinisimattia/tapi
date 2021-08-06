export default class Describer {
	public static getParameters(instance: Object): Array<string> {
		return Object.getOwnPropertyNames(instance);
	}
}