import BuildableResource from "@/contracts/BuildableResource";

/**
 * A factory used to construct from generic types derived from BuildableResource.
 */
export default interface ResourceFactory<Type extends BuildableResource> {
	new(): Type;
}