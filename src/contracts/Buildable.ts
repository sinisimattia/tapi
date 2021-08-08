import Builder from "@/Builder";

export default abstract class Buildable {
	public static getBuilder<Type>(): Builder<Type> {
		return new Builder<Type>();
	}
}