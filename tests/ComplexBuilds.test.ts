import { Resource, Alias, Transform, Ignore, ListOf } from '@/decorators';
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
	@ListOf(AnotherClass)
	public list: AnotherClass[] = [];

	public listOfPrimitives: Array<any> = [];

	constructor() {
		super();
	}
}

const json = {
	inner: {
		_param_1: "ok",
		param2: "this should not be reassigned",
		extraParam: "not ok! abort. ABORT!",
		toBeTransformed: "something, not important. you shouldn't even see me"
	},
	listOfThings: [
		{
			_param_1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!",
			toBeTransformed: "something, not important. you shouldn't even see me"
		}
	],
	listOfPrimitives: [true, 2, "three"]
}

const instance = new TestClass().fromJSON(json);

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

	test('properly builds listed primitives', () => {
		const list = instance.listOfPrimitives;

		expect(list.length).toBeGreaterThan(0);
		expect(list[0]).toBe(true);
		expect(list[1]).toBe(2);
		expect(list[2]).toBe("three");
	})
})