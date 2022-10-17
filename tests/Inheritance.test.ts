import { Resource, Transform } from "@/decorators";
import { BuildableResource, Builder } from "@/index";

@Resource
class ParentClass extends BuildableResource {
	@Transform((value) => {
		return value.toUpperCase();
	})
	public name: string = '';
}

class ChildClass extends ParentClass {
	public email: string = '';

	public isChildClass = () => true;
}

describe('It uses the child class', () => {
	test('when using the builder.', () => {
		const instance = new Builder(ChildClass).fromJSON({
			name: 'This is my name'
		});

		expect(instance instanceof ChildClass).toBeTruthy();

		/*
			This is because TS also considers this
			to be an instance of ParentClass. It's
			actually intended behavior in TS, so
			I've added this additional test to make
			sure it instantiated the child.
		*/
		expect(instance.isChildClass()).toBeTruthy();
	});

	test('when using the decorators.', () => {
		const instance = new ChildClass().fromJSON({
			name: 'This is my name'
		});

		expect(instance instanceof ChildClass).toBeTruthy();

		/*
			This is because TS also considers this
			to be an instance of ParentClass. It's
			actually intended behavior in TS, so
			I've added this additional test to make
			sure it instantiated the child.
		*/
		expect(instance.isChildClass()).toBeTruthy();
	});
});