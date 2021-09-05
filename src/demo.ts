import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	@Alias("aliasForThing")
	public thing: string = "ciao";

	@Ignore
	public thingToIgnore: string = "if you see this text everything works"

	@Transform()
	public trasformThing(): any {
		//
	}
}

console.log(new TestClass().currentBuilder);