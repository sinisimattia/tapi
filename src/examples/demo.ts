import { Resource, Alias, Transform, Ignore, ListOf } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class AnotherClass extends BuildableResource<TestClass> {
	@Alias("_param_1")
	public param1: string = "unassigned";

	@Ignore
	public param2: string = "still private"

	@Transform(value => {
		return "transformed";
	}, value => "transformed again")
	public toBeTransformed = "not transformed";
}

@Resource
class TestClass extends BuildableResource<TestClass> {
	@Alias("inner")
	public innerObject = new AnotherClass();

	@Alias("listOfThings")
	@ListOf(AnotherClass)
	public list: AnotherClass[] = [];

	@Transform(value => {
		return "transformed";
	}, value => "transformed again")
	public toBeTransformed = "not transformed";
}

const builder = new TestClass().build;
const anotherBuilder = new AnotherClass().build;

const json = {
	inner: {
		_param_1: "ok",
		param2: "this should not be reassigned",
		toBeTransformed: "not ok! abort. ABORT!"
	},
	listOfThings: [
		{
			_param_1: "ok",
			param2: "this should not be reassigned",
			extraParam: "not ok! abort. ABORT!"
		}
	]
}

const instance = new TestClass().fromJSON(json);
const builtJson = instance.toJSON();

// console.log(instance);

console.log(builtJson);