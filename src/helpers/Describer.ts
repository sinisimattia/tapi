export default class Describer {
	public static getParameters(instance: unknown): Array<string> {
		return Object.getOwnPropertyNames(instance);
	}
}