export default interface JSONConvertible {
	fromJSON(value: any);
	toJSON(...args: any[]): any;
}