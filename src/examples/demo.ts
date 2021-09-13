import { Resource, Alias, Transform, Ignore } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	@Alias("aliasForThing")
	public thing: string = "ciao";

	@Ignore
	public thingToIgnore: string = "if you see this text everything works"

	@Transform((value: string) => {
		return value.toLocaleUpperCase();
	})
	public thingToTransform: string = "if you see me you didn't transform me"

	build() {
		return new TestClass();
	}

}

const builder = new TestClass().currentBuilder

const result = builder.fromJSON({
	aliasForThing: 'this was properly assigned. good job, builder!',
	thingToIgnore: 'wait, what?!',
	thingToTransform: 'if this is uppercase then the transformer works.',
});

console.log(builder);

console.log(result);