import BuildConfiguration from '@/BuildConfiguration';
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

const buildConfig = new BuildConfiguration<TestClass>()
	.ignore("param2")
	.transform('toBeTransformed', value => "transformed", value => "transformed again")
	.alias("_param_1", "param1");

const strictBuildConfig = new BuildConfiguration<TestClass>()
	.ignore("param2")
	.transform('toBeTransformed', value => "transformed", value => "transformed again")
	.alias("_param_1", "param1");

strictBuildConfig.strict = true

describe('Typed object builder', () => {
	test('ignores extra parameters', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}

		const builder = new Builder(TestClass, buildConfig)
	
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

		const builder = new Builder(TestClass, strictBuildConfig)

		expect(() => {
			builder.fromJSON(json);
		}).toThrowError();
	})

	test('supports custom mappings', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}
	
		const builder = new Builder(TestClass, buildConfig)

		const instance = builder.fromJSON(json);

		expect(instance.toBeTransformed).toBe("transformed");
	})

	test('supports aliases', () => {
		const json = {
			_param_1: "ok"
		}

		const builder = new Builder(TestClass, buildConfig)
	
		const instance = builder.fromJSON(json);

		expect(instance.param1).toBe("ok");
	})

	test('can transform in reverse', () => {
		const json = {
			param1: "ok",
			param2: "this should not be reassigned",
			toBeTransformed: "something"
		}

		const builder = new Builder(TestClass, buildConfig)
	
		const builtObject = builder.fromJSON(json);
		const instance = builder.toJSON(builtObject);

		expect(instance.toBeTransformed).toBe("transformed again");
		expect(instance["_param_1"]).toBe("ok");
	})
})