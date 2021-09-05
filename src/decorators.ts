import Builder from "@/Builder";
import BuildableResource from "@/contracts/BuildableResource";

class ResourceDecorator {
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
		return (target: any, name?: PropertyKey): any => {
			console.log(target, name);
		};
	}

	public Transform(): any {
		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
			console.log(target, propertyKey, descriptor);
		};
	}
}

const resourceDecorator = new ResourceDecorator();

export const Resource = resourceDecorator.Resource; 

export const Prop = resourceDecorator.Prop; 

export const Transform = resourceDecorator.Transform; 