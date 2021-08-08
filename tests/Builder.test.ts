import Builder from '@/Builder';

class TestClass {
	public param1: string = "unassigned";
	public param2: string = "still private"
	public toBeTransformed = "not transformed";
	public list: Array<any> = []

	public getParam2(): string {
		return this.param2;
	}
}

const builder = new Builder<TestClass>()
	.ignore(["param2"])
	.transform('toBeTransformed', (value) => {
		return "transformed";
	})
	.alias("_param_1", "param1");

describe('Typed object builder', () => {
	test('ignores extra parameters', () => {
		let json = {
			param1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	
		let instance = builder.fromJSON(new TestClass(), json);
	
		expect(instance.param1).toBe("ok");
		expect(instance.hasOwnProperty("extraParam")).toBe(false);
		expect(instance.getParam2()).toBe("still private");
	})

	test('enforces strict assignment', () => {
		let json = {
			param1: "ok",
			extraParam: "not ok! abort. ABORT!"
		}

		expect(() => {
			builder.fromJSON(new TestClass(), json, true);
		}).toThrowError();
	})

	test('supports custom mappings', () => {
		let json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}
	
		let instance = builder.fromJSON(new TestClass(), json);

		expect(instance.toBeTransformed).toBe("transformed");
	})

	test('supports aliases', () => {
		let json = {
			_param_1: "ok"
		}
	
		let instance = builder.fromJSON(new TestClass(), json);

		expect(instance.param1).toBe("ok");
	})
})