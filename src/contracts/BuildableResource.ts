import Builder from "@/Builder";
import { Ignore } from "@/decorators";

/**
 * Defines an object that can be automatically built from JSON data.
 * 
 * Use this as the base class for your resources (ie. Users, Articles, Posts, ect.)
 */
export default abstract class BuildableResource<Type extends BuildableResource<Type> = any>{
	/**
	 * The specified {@link Builder} for this class.
	 */
	private builder?: Builder<this>;

	/**
	 * The base constructor with no arguments. Your class NEEDS to have it.
	 */
	constructor() {}

	/**
	 * Public getter for this class' current builder.
	 */
	public get build(): Builder<this> {
		const c = (this as unknown as Type).constructor.prototype.constructor;

		this.builder = this.builder ?? new Builder<this>(c);

		return this.builder;
	}

	/**
	 * A public setter for this class' current builder.
	 */
	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}
}