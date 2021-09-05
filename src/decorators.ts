import Builder from "@/Builder";
import BuildableResource from "@/contracts/BuildableResource";

class ResourceDecorator {
	// FIXME This gets executed last. Find a way to have the builder ready in "Prop" and "Transform"
	public Resource(constructor: Function): any {
		const target = constructor.prototype;

		if (target instanceof BuildableResource) {
			const builder = new Builder<typeof target>(target);
			target.newBuilder = builder;
		}
		else {
			throw new Error("Target class has to extend BuildableResource in order to use this decorator.");
		}
	}

	public Prop(): any {
		return (target: any, name?: PropertyKey): any => {};
	}

	public Transform(): any {
		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {};
	}
}

const resourceDecorator = new ResourceDecorator();

export const Resource = resourceDecorator.Resource; 

export const Prop = resourceDecorator.Prop; 

export const Transform = resourceDecorator.Transform; 