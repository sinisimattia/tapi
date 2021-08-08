import Builder from "@/Builder";

export default abstract class Buildable {
	public static getBaseBuilderConfiguration<Type>(): Builder<Type> {
		return new Builder<Type>();
	}
}