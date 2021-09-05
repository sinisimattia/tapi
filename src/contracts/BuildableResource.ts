import Builder from "@/Builder";

export default class BuildableResource {
	private builder?: Builder<this>;

	public get currentBuilder(): Builder<this> | undefined {
		this.builder = this.builder ?? new Builder<this>(this);

		return this.builder;
	}

	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build(source: any): any {}
}