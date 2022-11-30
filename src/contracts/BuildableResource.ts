import Builder from "@/Builder";
import JSONConvertible from "@/contracts/JSONConvertible";
import { deepCopy as cloneDeep } from "@/helpers/functions";

/**
 * Defines an object that can be automatically built from JSON data.
 * 
 * Use this as the base class for your resources (ie. Users, Articles, Posts, ect.)
 */
export default abstract class BuildableResource<Type extends BuildableResource<Type> = any> implements JSONConvertible {
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

		if (!Object.getOwnPropertyDescriptor(this, 'builder') && this.builder) {
			this.builder = cloneDeep(this.builder) as Builder<this>;

			if (!this.builder.isUsingClass(c)) {
				this.builder.updateBaseObject(c);
			}
		} else if (!this.builder) {
			this.builder = new Builder<this>(c);
		}

		return this.builder;
	}

	/**
	 * A public setter for this class' current builder.
	 */
	public set newBuilder(builder: Builder<this>) {
		this.builder = builder;
	}

	public fromJSON(source: any, strict: boolean = false): this {
		return this.build.fromJSON(source, strict);
	}

	public toJSON(): any {
		return this.build.toJSON(this);
	}
}