export default class Describer {
	public static describe(instance: Object): Array<string> {
		return Object.getOwnPropertyNames(instance);
	}
}