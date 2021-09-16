import Describer from "@/helpers/Describer";
import ResourceFactory from "@/contracts/ResourceFactory";
import BuildableResource from "@/contracts/BuildableResource";

type Action = (value: any) => any;

export default class Builder<ResultType extends BuildableResource = any> {
	private classToBuild: ResourceFactory<ResultType>;

	private ignores: string[] = [];
	private transformers: {[localPath: string]: Action} = {};
	private aliases: {[localPath: string]: string} = {};
	private listElementConstructors: {[localPath: string]: ResultType} = {};

	constructor(classToBuild: ResourceFactory<ResultType>) {
		this.classToBuild = classToBuild;
	}

	public ignore(paths: string[]): this {
		this.ignores = paths;
		return this;
	}

	public transform(localPath: string, transformer: Action): this {
		this.transformers[localPath] = transformer;

		return this;
	}

	public alias(foreignPath: string, localPath: string): this {
		this.aliases[localPath] = foreignPath;
		
		return this;
	}

	public listType(localPath: string, builtObject: ResultType): this {
		this.listElementConstructors[localPath] = builtObject;
		return this;
	}

	private assign(target: ResultType, json: any, param: string): void {
		const localPath = param;
		const foreignPath = this.getForeignAlias(param, json);

		if (this.transformers[localPath]){
			target[localPath] = this.transformers[localPath](json[foreignPath]);
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

	public fromJSON(json: any, strict: boolean = false): ResultType {
		const target = this.classToBuild.build();
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.includes(param) || !params.includes(param)) {
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
				target[param] = target[param].currentBuilder.fromJSON(json[actualPath], strict);
			}
			else if (Array.isArray(target[param])) {
				const list: any[] = json[actualPath];

				target[param] = list.map((item: any) => {
					const listClassElementConstructor = this.listElementConstructors[param]
					const listElementClassBuilder = listClassElementConstructor.currentBuilder; // FIXME This is just a placeholder
					return listElementClassBuilder.fromJSON(item, strict);
				})
			}
			else {
				this.assign(target, json, param);
			}			
		});

		return target;
	}
}