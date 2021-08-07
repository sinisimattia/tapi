import Describer from "@/helpers/Describer";

type Action = (value: any) => any;
export default class Builder<ResultType> {
	private ignores: string[] = [];
	private transformers: {[property: string]: Action} = {};
	//TODO implement aliases (ex. Class has "name", but json has "title")

	public ignore(paths: string[]): this {
		this.ignores = paths;
		return this;
	}

	public transform(property: string, transformer: Action): this {
		this.transformers[property] = transformer;

		return this;
	}

	private assign(target: ResultType, json: any, param: string): void {
		if (this.transformers[param]){
			target[param] = this.transformers[param](json[param]);
		}
		else {
			target[param] = json[param];
		}
	}

	public fromJSON(target: ResultType, json: any, strict: boolean = false): ResultType {
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.includes(param) || target[param] == undefined) {
				return;
			}

			if (!json.hasOwnProperty(param)) {
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