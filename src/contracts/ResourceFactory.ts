import BuildableResource from "@/contracts/BuildableResource";

export default interface ResourceFactory<Type extends BuildableResource> {
	build(source: any): Type;
}