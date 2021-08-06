import Buildable from "@/contracts/Buildable";

export default class Test extends Buildable {
	public param1: string = "yo";

	constructor() {
		super();
	}

	public static build(): Test {
		return new Test();
	}

}