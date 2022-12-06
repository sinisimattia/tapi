import BuildConfiguration from "@/BuildConfiguration"
import Builder from "@/Builder"
import ResourceFactory from "@/contracts/ResourceFactory"
import BuildableResource from "@/contracts/BuildableResource"

export function build<T extends BuildableResource<T>>(
	json: any,
	ctor: ResourceFactory<T>,
	buildConfig: BuildConfiguration<T>
): T {
	return new Builder(ctor, buildConfig).fromJSON(json)
}
