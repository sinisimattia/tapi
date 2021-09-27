import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	@Alias("_param_1")
	public param1: string = "unassigned";

	@Ignore
	public param2: string = "still private"

	@Transform((value) => {
		return "transformed";
	})
	public toBeTransformed = "not transformed";

	public list: Array<any> = []

	constructor() {
		super();
	}

	public getParam2(): string {
		return this.param2;
	}
}

describe('Decorated class new TestClass()', () => {
	test('properly sets ignore directives', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	
		const instance = new TestClass().fromJSON(json);
	
		expect(instance.param1).toBe("ok");
		expect(instance.hasOwnProperty("extraParam")).toBe(false);
		expect(instance.getParam2()).toBe("still private");
	})

	test('properly sets transformers', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}
	
		const instance = new TestClass().fromJSON(json);

		expect(instance.toBeTransformed).toBe("transformed");
	})

	test('properly sets aliases', () => {
		const json = {
			_param_1: "ok"
		}
	
		const instance = new TestClass().fromJSON(json);

		expect(instance.param1).toBe("ok");
	})
})