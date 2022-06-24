import Describer from "@/helpers/Describer";
import BuildableResource from "@/contracts/BuildableResource";
import ResourceFactory from "@/contracts/ResourceFactory";
import JSONConvertible from "@/contracts/JSONConvertible";
import dot from "dot-object";

class ObjectReference {
	public path: string;
	public value: any;

	constructor(path: string, value: any) {
		this.path = path;
		this.value = value;
	}
}

/**
 * This is used to define how a class needs to be constructed from an object.
 */
export default class Builder<ResultType extends BuildableResource<ResultType>> implements JSONConvertible {
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
		dot.keepArray = true;
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

	private getForeignObjectReference(localPath: string, foreignObject: any = undefined): ObjectReference {
		const foreignPath = this.aliases[localPath] ?? localPath;
		const foreignValue = dot.pick(foreignPath, foreignObject);

		let result: ObjectReference;

		if (foreignObject == undefined) {
			result = new ObjectReference(foreignPath, null);
		}
		else {
			result = new ObjectReference(foreignValue != null ? foreignPath : localPath, foreignValue)
		}

		result.value = dot.pick(result.path, foreignObject)

		return result;
	}

	public fromJSON(json: any, strict: boolean = false): ResultType {
		const target = {...this.baseObject};
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.has(param) || !params.includes(param)) {
				return;
			}

			const foreignObject = this.getForeignObjectReference(param, json);

			if (!json || !foreignObject.value) {
				if (strict) {
					throw new Error("Invalid input object, missing parameter: " + param);
				}
				else return;
			}

			if (target[param] instanceof BuildableResource) {
				target[param] = target[param].build.fromJSON(foreignObject.value, strict);
			}
			else if (Array.isArray(target[param])) {
				const list: any[] = foreignObject.value;

				target[param] = list.map((item: any, index: number) => {
					const listClassElement = this.listElementConstructors[param];
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build;
						return listElementClassBuilder.fromJSON(item, strict);
					}
					else if (!strict && foreignObject.value) {
						return foreignObject.value[index];
					}
				})
			}
			else {
				if (this.transformers[param]){
					target[param] = this.transformers[param].in(foreignObject.value);
				}
				else {
					target[param] = foreignObject.value;
				}
			}			
		});

		return target as ResultType;
	}

	public toJSON(source: ResultType): any {
		const params = Describer.getParameters(source);
		let result = {};

		params.forEach(param => {
			const foreignObject = this.getForeignObjectReference(param);

			if (this.ignores.has(param)) {
				return;
			}

			if (source[param] instanceof BuildableResource) {
				result[foreignObject.path] = source[param].build.toJSON(source[param]);
			}
			else if (Array.isArray(source[param])) {
				const list: any[] = source[param];

				result[foreignObject.path] = list.map((item: any, index: number) => {
					const listClassElement = this.listElementConstructors[param];
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build;
						return listElementClassBuilder.toJSON(item);
					}
					else if (source.hasOwnProperty(param)) {
						return this.transformers[param] ? this.transformers[param].out(result[foreignObject.path][index]) : result[foreignObject.path][index];
					}
				})
			}
			else {
				result[foreignObject.path] = this.transformers[param] ? this.transformers[param].out(source[param]) : source[param];
			}			
		});

		result = dot.object(result)

		delete result["builder"]; // FIXME Magic number

		return result;
	}
}