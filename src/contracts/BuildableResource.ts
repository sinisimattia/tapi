import Builder from "@/Builder";

export default class BuildableResource {
	private builder?: Builder<this>;

	constructor() {}

	public get currentBuilder(): Builder<this> {
		this.builder = this.builder ?? new Builder<this>(this);

		return this.builder;
	}

	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build(source: any): any {
		throw new Error("Your class does not define a build() method. Implement it and make it return a custom base instance of your class.");
	}
}