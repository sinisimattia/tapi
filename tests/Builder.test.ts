import Builder from '@/Builder';
import Buildable from '@/contracts/Buildable';

class TestClass extends Buildable {
	public param1: string = "unassigned";
	public param2: string = "still private"
	public toBeTransformed = "not transformed";
	public list: Array<any> = []

	public getParam2(): string {
		return this.param2;
	}

	public static override getBuilder() : Builder {
		return new Builder<TestClass>()
		.ignore(["param2"])
		.transform('toBeTransformed', (value) => {
			return "transformed";
		})
		.alias("_param_1", "param1");
	}
}

const builder = TestClass.getBuilder();

describe('Typed object builder', () => {
	test('ignores extra parameters', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	
		const instance = builder.fromJSON(new TestClass(), json);
	
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
			builder.fromJSON(new TestClass(), json, true);
		}).toThrowError();
	})

	test('supports custom mappings', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}
	
		const instance = builder.fromJSON(new TestClass(), json);

		expect(instance.toBeTransformed).toBe("transformed");
	})

	test('supports aliases', () => {
		const json = {
			_param_1: "ok"
		}
	
		const instance = builder.fromJSON(new TestClass(), json);

		expect(instance.param1).toBe("ok");
	})
})