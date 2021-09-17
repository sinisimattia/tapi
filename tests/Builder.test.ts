import Builder from '@/Builder';
import BuildableResource from '@/contracts/BuildableResource';

class TestClass extends BuildableResource {
	public param1: string = "unassigned";
	public param2: string = "still private"
	public toBeTransformed = "not transformed";
	public list: Array<any> = []

	public getParam2(): string {
		return this.param2;
	}
}

const builder = new Builder(TestClass)
	.ignore(["param2"])
	.transform('toBeTransformed', (value) => {
		return "transformed";
	})
	.alias("_param_1", "param1");

describe('Typed object builder', () => {
	test('ignores extra parameters', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	
		const instance = builder.fromJSON(json);

		expect(instance instanceof TestClass).toBe(true);
	
		expect(instance.param1).toBe("ok");
		expect(instance.hasOwnProperty("extraParam")).toBe(false);
		expect(instance.getParam2()).toBe("still private");
	})

	test('enforces strict assignment', () => {
		const json = {
			param1: "ok",
			extraParam: "not ok! abort. ABORT!"
		}

		expect(() => {
			builder.fromJSON(json, true);
		}).toThrowError();
	})

	test('supports custom mappings', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}
	
		const instance = builder.fromJSON(json);

		expect(instance.toBeTransformed).toBe("transformed");
	})

	test('supports aliases', () => {
		const json = {
			_param_1: "ok"
		}
	
		const instance = builder.fromJSON(json);

		expect(instance.param1).toBe("ok");
	})
})