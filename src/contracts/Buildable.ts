import Resource from "@/contracts/Resource";

export default interface Buildable<Type extends Resource> { // IMyClassBuilder
	new (): Type;
	build(source: any): Type;
}