import Builder from "@/Builder";
import ResourceFactory from "@/contracts/ResourceFactory";

export default abstract class BuildableResource<Type extends BuildableResource<Type>>{
	private builder?: Builder<this>;

	constructor() {}

	public get currentBuilder(): Builder<this> {
		const c = (this as unknown as Type).constructor.prototype.constructor;

		this.builder = this.builder ?? new Builder<this>(new c());

		return this.builder;
	}

	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}
}