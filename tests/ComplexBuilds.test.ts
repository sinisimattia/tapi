import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	public list: Array<any> = []

	@Alias("inner")
	public innerObject = new AnotherClass();

	build() {
		return new TestClass();
	}
}

@Resource
class AnotherClass extends BuildableResource {
	@Alias("_param_1")
	public param1: string = "unassigned";

	@Ignore
	public param2: string = "still private"

	@Transform((value) => {
		return "transformed";
	})
	public toBeTransformed = "not transformed";

	build() {
		return new AnotherClass();
	}
}

const builder = new TestClass().currentBuilder;

describe('Decorated class builder', () => {
	test('properly builds recursive resources', () => {
		const json = {
			inner: {
				param1: "ok",
				param2: "this should not be reassigned",
				extraParam: "not ok! abort. ABORT!"
			}
		}

		console.log(json);
	
		const instance = builder.fromJSON(json);
		const innerObject = instance.innerObject;

		expect(innerObject instanceof AnotherClass).toBe(true);
		expect(innerObject.param1).toBe("ok");
		expect(innerObject.hasOwnProperty("extraParam")).toBe(false);
		expect(innerObject.param2).toBe("still private");
	})
})