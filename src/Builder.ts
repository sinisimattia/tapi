import Describer from "@/helpers/Describer";

export default class Builder<ResultType> {
	private ignores: string[] = [];

	public ignore(paths: string[]): this {
		this.ignores = paths;
		return this;
	}

	public fromJSON(target: ResultType, json: any, strict: boolean = false): ResultType {
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (this.ignores.includes(param)) {
				return;
			}

			if (!json.hasOwnProperty(param)) {
				if (strict) {
					throw new Error("Invalid input object, missing parameter: " + param);
				}
				else return;
			}
			
			target[param] = json[param];
		});
		return target;
	}
}