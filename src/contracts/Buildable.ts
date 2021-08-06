export default abstract class Buildable {
	public static build() {
		throw new Error("This class does not define a build method.");
	}
}