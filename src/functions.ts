import BuildConfiguration from "@/core/BuildConfiguration"
import Builder from "@/core/Builder"
import ResourceFactory from "@/contracts/ResourceFactory"
import BuildableResource from "@/contracts/BuildableResource"

export function build<T extends BuildableResource<T>>(
	json: any,
	ctor: ResourceFactory<T>,
	buildConfig: BuildConfiguration<T>
): T {
	return new Builder(ctor, buildConfig).fromJSON(json)
}
