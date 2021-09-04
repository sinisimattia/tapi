import { Resource, Prop, Transform } from '@/decorators';
import BuildableResource from '@/contracts/BuildableResource';

@Resource
class TestClass extends BuildableResource {
	@Prop()
	public thing: string = "ciao";

	@Transform()
	public trasformThing(): any {
		//
	}
}