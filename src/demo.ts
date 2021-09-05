import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	@Alias("aliasForThing")
	public thing: string = "ciao";

	@Ignore
	public thingToIgnore: string = "if you see this text everything works"

	@Transform((value) => {
		console.log(value);

		return value;
	})
	public thingToTransform: string = "if you see me you didn't transform me"

}

console.log(new TestClass().currentBuilder);