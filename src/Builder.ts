import Describer from "@/helpers/Describer";

type Action = (value: any) => any;

export default class Builder<ResultType> {
	private ignores: string[] = [];
	private transformers: {[localPath: string]: Action} = {};
	private aliases: {[localPath: string]: string} = {};

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

	public fromJSON(target: ResultType, json: any, strict: boolean = false): ResultType {
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