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

class ChildClassOverrideTransform extends ParentClass {
	@Transform(() => 'transformed')
	public name: string = '';

	public isChildClass = () => true;
}

class ChildClassWithOtherTransform extends ParentClass {
	@Transform((value) => +value)
	public id: number = 0;

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

		expect(instance.name).toStrictEqual('THIS IS MY NAME');
	});
});

describe('It compose with the parent class', () => {
	test('when overriding parent class decorator.', () => {
		const instance = new ChildClassOverrideTransform().fromJSON({
			name: 'This is my name'
		});

		expect(instance.name).toStrictEqual('transformed');
	})

	test('when composing parent class decorator and child class decorator.', () => {
		const instance = new ChildClassWithOtherTransform().fromJSON({
			id: '42',
			name: 'This is my name'
		});

		expect(instance.name).toStrictEqual('THIS IS MY NAME');
		expect(instance.id).toStrictEqual(42);
	})
})
