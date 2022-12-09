import BuildConfiguration from "@/BuildConfiguration"
import Builder from "@/Builder"
import JSONConvertible from "@/contracts/JSONConvertible"

/**
 * Defines an object that can be automatically built from JSON data.
 *
 * Use this as the base class for your resources (ie. Users, Articles, Posts, ect.)
 */
export default abstract class BuildableResource<Type extends BuildableResource<Type> = any> implements JSONConvertible {
	/**
	 * The specified {@link BuildConfiguration} for this class.
	 */
	private resourceBuildConfiguration?: BuildConfiguration<this>

	/**
	 * The base constructor with no arguments. Your class NEEDS to have it.
	 */
	constructor() {}

	public get buildConfig(): BuildConfiguration<this> {
		const c = (this as unknown as Type).constructor.prototype.constructor

		if (! c.resourceBuildConfiguration) {
			c.resourceBuildConfiguration = this.resourceBuildConfiguration ?? new BuildConfiguration<typeof c>
		}

		return c.resourceBuildConfiguration
	}

	/**
	 * Public getter for this class' current builder.
	 */
	public get build(): Builder<this> {
		const c = (this as unknown as Type).constructor.prototype.constructor
		return new Builder(c, this.buildConfig)
	}

	public fromJSON(source: any, strict: boolean = false): this {
		return this.build.fromJSON(source, strict)
	}

	public toJSON(): any {
		return this.build.toJSON(this)
	}
}
