import { Resource, Alias, Transform, Ignore, ListOf } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class AnotherClass extends BuildableResource<TestClass> {
	@Alias("_param_1")
	public param1: string = "unassigned";

	@Ignore
	public param2: string = "still private"

	@Transform((value) => {
		return "transformed";
	})
	public toBeTransformed = "not transformed";
}

@Resource
class TestClass extends BuildableResource<TestClass> {
	@Alias("inner")
	public innerObject = new AnotherClass();

	@Alias("listOfThings")
	@ListOf(AnotherClass)
	public list: AnotherClass[] = [];
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

console.log(instance);