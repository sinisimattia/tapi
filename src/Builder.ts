import Describer from "@/helpers/Describer";
import BuildableResource from "@/contracts/BuildableResource";
import ResourceFactory from "@/contracts/ResourceFactory";

/**
 * This is used to define how a class needs to be constructed from an object.
 */
export default class Builder<ResultType extends BuildableResource<ResultType>> {
	/**
	 * The built object to populate.
	 */
	private baseObject: ResultType;

	/**
	 * List of parameters that need to be ignored.
	 */
	private ignores: Set<string> = new Set;

	/**
	 * Collection of transformers. Each transformer is a callback function associated to a property,
	 * this gets called just before the property is assigned to the {@link baseObject}
	 */
	private transformers: {[localPath: string]: ValueTransformer} = {};

	/**
	 * Collection of aliases. Each alias represents an alternative name for the property
	 * in the incoming object.
	 */
	private aliases: {[localPath: string]: string} = {};

	/**
	 * Collection of list element constructors. This is used to define how to construct
	 * the individual items of an incoming list.
	 */
	private listElementConstructors: {[localPath: string]: ResultType} = {};

	/**
	 * Instantiates the given class thanks to a {@link ResourceFactory}.
	 * 
	 * @param ctor The class that needs to be instantiated.
	 */
	constructor(ctor: ResourceFactory<ResultType>) {
		this.baseObject = new ctor();
	}

	/**
	 * Add an ignore directive for one or more paths.
	 * 
	 * @param paths The object paths to ignore when instantiating.
	 * @returns The builder.
	 */
	public ignore(...paths: string[]): this {
		paths.forEach(path => this.ignores.add(path));
		return this;
	}

	/**
	 * Add a transform directive for a given path.
	 * 
	 * @param localPath The property of the typed object that needs to be transformed.
	 * @param transformer The {@link ValueTransformer} used.
	 * @returns This builder.
	 */
	public transform(localPath: string, transformerIn: Action, transformerOut?: Action): this {
		const defaultTransformer: Action = (value) => value;

		this.transformers[localPath] = {
			in: transformerIn,
			out: transformerOut ?? defaultTransformer
		};

		return this;
	}

	/**
	 * Add an alias for a given property.
	 * 
	 * @param foreignPath The path of the incoming object.
	 * @param localPath The path of the typed object's property.
	 * @returns This builder.
	 */
	public alias(foreignPath: string, localPath: string): this {
		this.aliases[localPath] = foreignPath;
		return this;
	}

	/**
	 * Add a list item type to let the builder know how to construct
	 * the elements of a list.
	 * 
	 * @param localPath The path of the typed object's property.
	 * @param builtObject The list element as a typed object.
	 * @returns This builder.
	 */
	public listType(localPath: string, builtObject: ResultType): this {
		this.listElementConstructors[localPath] = builtObject;
		return this;
	}

	private assign(target: any, json: any, param: string): void {
		const localPath = param;
		const foreignPath = this.getForeignAlias(param, json);

		if (this.transformers[localPath]){
			target[localPath] = this.transformers[localPath].in(json[foreignPath]);
		}
		else {
			target[localPath] = json[foreignPath];
		}
	}

	private getForeignAlias(localPath: string, foreignObject: any = undefined): string {
		const foreignPath = this.aliases[localPath] ?? localPath;

		if (foreignObject == undefined) {
			return foreignPath;
		}
		else {
			return foreignObject.hasOwnProperty(foreignPath) ? foreignPath : localPath
		}
	}

	/**
	 * Convert from a generic JSON object to a typed one.
	 * 
	 * @param json The object to transform.
	 * @param strict Indicate whether or not to throw an exception when the incoming object does not have all the needed properties.
	 * @returns A typed object populated according to the rules you defined while configuring.
	 */
	public fromJSON(json: any, strict: boolean = false): ResultType {
		const target = this.baseObject;
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.has(param) || !params.includes(param)) {
				return;
			}

			const actualPath = this.getForeignAlias(param, json);

			if (!json || !json.hasOwnProperty(actualPath)) {
				if (strict) {
					throw new Error("Invalid input object, missing parameter: " + param);
				}
				else return;
			}
			if (target[param] instanceof BuildableResource) {
				target[param] = target[param].build.fromJSON(json[actualPath], strict);
			}
			else if (Array.isArray(target[param])) {
				const list: any[] = json[actualPath];

				target[param] = list.map((item: any, index: number) => {
					const listClassElement = this.listElementConstructors[param];
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build;
						return listElementClassBuilder.fromJSON(item, strict);
					}
					else if (!strict && json.hasOwnProperty(actualPath)) {
						return json[actualPath][index];
					}
				})
			}
			else {
				this.assign(target, json, param);
			}			
		});

		return target as ResultType;
	}

	public toJSON(source: ResultType): any {
		const params = Describer.getParameters(source);
		const result = {};

		params.forEach(param => {
			const foreignPath = this.getForeignAlias(param);

			if (this.ignores.has(param)) {
				return;
			}

			if (source[param] instanceof BuildableResource) {
				result[foreignPath] = source[param].build.toJSON(source[param]);
			}
			else if (Array.isArray(source[param])) {
				const list: any[] = source[param];

				result[foreignPath] = list.map((item: any, index: number) => {
					const listClassElement = this.listElementConstructors[param];
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build;
						return listElementClassBuilder.toJSON(item);
					}
					else if (source.hasOwnProperty(param)) {
						return result[foreignPath][index];
					}
				})
			}
			else {
				result[foreignPath] = this.transformers[param] ? this.transformers[param].out(source[param]) : source[param];
			}			
		});

		delete result["builder"]; // FIXME Magic muber

		return result;
	}
}