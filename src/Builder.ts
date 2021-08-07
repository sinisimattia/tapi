import Describer from "@/helpers/Describer";

export default class Builder {
	public static fromJSON<ResultType>(target: ResultType, json: any, strict: boolean = false): ResultType {
		const params = Describer.getParameters(target);

		params.forEach(param => {
			if (strict && !json.hasOwnProperty(param)) {
				throw new Error("Invalid input object, missing parameter: " + param);
			}
			
			target[param] = json[param];
		});
		return target;
	}
}