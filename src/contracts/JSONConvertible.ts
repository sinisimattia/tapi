export default interface JSONConvertible {
	/**
	 * Convert from a generic JSON object to a typed one.
	 *
	 * @param json The object to transform.
	 * @param strict Indicate whether or not to throw an exception when the incoming object does not have all the needed properties.
	 * @returns A typed object populated according to the rules you defined while configuring.
	 */
	fromJSON(value: any, strict: boolean);

	/**
	 * Convert the typed object to a JSON one by applying all the rules backwards.
	 * @param args Additional arguments
	 */
	toJSON(...args: any[]): any;
}
