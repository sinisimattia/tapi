import Builder from "@/Builder";

export default class BuildableResource {
	private builder?: Builder<this>;

	constructor() {}

	public get currentBuilder(): Builder<this> {
		this.builder = this.builder ?? new Builder<this>(this.constructor());

		return this.builder;
	}

	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}
}