export default class BuildConfiguration<ResultType> {
	/**
	 * Indicates if it should throw errors in case of missing
	 * fields in incoming object.
	 */
	public strict: boolean = false

	/**
	  * List of parameters that need to be ignored.
	  */
	readonly ignores: Set<string> = new Set

	/**
	  * Collection of transformers. Each transformer is a callback function associated to a property,
	  * this gets called just before the property is assigned to the base object.
	  */
	readonly transformers: {[localPath: string]: ValueTransformer} = {}

	/**
	  * Collection of aliases. Each alias represents an alternative name for the property
	  * in the incoming object.
	  */
	readonly aliases: {[localPath: string]: string} = {}

	/**
	  * Collection of list element constructors. This is used to define how to construct
	  * the individual items of an incoming list.
	  */
	readonly listElementConstructors: {[localPath: string]: ResultType} = {}

	/**
	 * Add an ignore directive for one or more paths.
	 *
	 * @param paths The object paths to ignore when instantiating.
	 */
	public ignore(...paths: string[]): this {
		paths.forEach(path => this.ignores.add(path))
		return this
	}

	/**
	 * Add a transform directive for a given path.
	 *
	 * @param localPath The property of the typed object that needs to be transformed.
	 * @param transformer The {@link ValueTransformer} used.
	 */
	public transform(localPath: string, transformerIn: Action, transformerOut?: Action): this {
		const defaultTransformer: Action = (value) => value

		this.transformers[localPath] = {
			in: transformerIn,
			out: transformerOut ?? defaultTransformer,
		}

		return this
	}

	/**
	 * Add an alias for a given property.
	 *
	 * @param foreignPath The path of the incoming object.
	 * @param localPath The path of the typed object's property.
	 */
	public alias(foreignPath: string, localPath: string): this {
		this.aliases[localPath] = foreignPath
		return this
	}

	/**
	 * Add a list item type to let the builder know how to construct
	 * the elements of a list.
	 *
	 * @param localPath The path of the typed object's property.
	 * @param builtObject The list element as a typed object.
	 */
	public listType(localPath: string, builtObject: ResultType): this {
		this.listElementConstructors[localPath] = builtObject
		return this
	}
}
