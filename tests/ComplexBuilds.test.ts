import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

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

	constructor() {
		super();
	}
}

@Resource
class TestClass extends BuildableResource {
	@Alias("inner")
	public innerObject = new AnotherClass();

	@Alias("listOfThings")
	public list: AnotherClass[] = [];

	constructor() {
		super();
	}
}

const builder = new TestClass().currentBuilder;

const json = {
	inner: {
		_param_1: "ok",
		param2: "this should not be reassigned",
		extraParam: "not ok! abort. ABORT!"
	},
	listOfThings: [
		{
			_param_1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	]
}

const instance = builder.fromJSON(json);

describe('Decorated class builder', () => {
	test('properly builds recursive resources', () => {		
		const innerObject = instance.innerObject;

		expect(innerObject).toBeInstanceOf(AnotherClass);
		expect(innerObject.param1).toBe("ok");
		expect(innerObject.hasOwnProperty("extraParam")).toBe(false);
		expect(innerObject.param2).toBe("still private");
	})

	test('properly builds listed resources', () => {
		const list = instance.list;

		expect(list.length).toBeGreaterThan(0);
		expect(list[0]).toBeInstanceOf(AnotherClass);
		expect(list[0].param1).toBe("ok");
		expect(list[0].param2).toBe("still private");
		expect(list[0].toBeTransformed).toBe("transformed");
	})
})