import Describer from "@/helpers/Describer";
import Buildable from "@/contracts/Buildable";
import Resource from "@/contracts/Resource";

type Action = (value: any) => any;

export default class Builder<ResultType extends Resource = any> { // MyService
	private classToBuild: Buildable<ResultType>;

	private ignores: string[] = [];
	private transformers: {[localPath: string]: Action} = {};
	private aliases: {[localPath: string]: string} = {};

	constructor(classToBuild: Buildable<ResultType>) {
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
		const target = this.classToBuild.build(json);
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.includes(param) || target[param] == undefined) {
				return;
			}

			const actualPath = this.getForeignAlias(param, json);

			if (!json.hasOwnProperty(actualPath)) {
				if (strict) {
					throw new Error("Invalid input object, missing parameter: " + param);
				}
				else return;
			}
			
			this.assign(target, json, param);
			
		});

		return target;
	}
}