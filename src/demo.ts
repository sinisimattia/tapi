import { Resource, Prop, Transform } from '@/decorators';

@Resource
class TestClass {
	@Prop()
	public thing: string = "ciao";

	@Transform()
	public trasformThing(): any {
		//
	}
}