export default interface JSONConvertible {
	/**
	 * Convert from a generic JSON object to a typed one.
	 *
	 * @param source The object to transform.
	 * @returns A typed object populated according to the rules you defined while configuring.
	 */
	fromJSON(source: any);

	/**
	 * Convert the typed object to a JSON one by applying all the rules backwards.
	 * @param args Additional arguments
	 */
	toJSON(...args: any[]): any;
}
