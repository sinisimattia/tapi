import BuildableResource from "@/contracts/BuildableResource";

class ResourceDecorator {
	public Resource(constructor: Function): any {
		const target = constructor.prototype;

		if (!(target instanceof BuildableResource)) {
			throw new Error("Target class has to extend BuildableResource in order to use this decorator.");
		}
	}

	public Alias(alias: string): any {
		return (target: BuildableResource, name: PropertyKey): any => {
			target.currentBuilder?.alias(alias, name.toString());
		};
	}

	public Transform(localPath: string = ""): any {
		return function (target: BuildableResource, propertyKey: string, descriptor: PropertyDescriptor) {
			if(!localPath) {
				const p = propertyKey.replace("transform", "").toLowerCase();

				if (!p) {
					throw new Error("Method name does not begin with 'transform', please update the name or specify the property name yourself.");
				}

				localPath = p;
			}
			target.currentBuilder?.transform(localPath, target[propertyKey]);
		};
	}

	public Ignore(target: BuildableResource, name: PropertyKey) {
		target.currentBuilder?.ignore([name.toString()]);
	}
}

const resourceDecorator = new ResourceDecorator();

export const Resource = resourceDecorator.Resource;

export const Alias = resourceDecorator.Alias; 

export const Transform = resourceDecorator.Transform; 

export const Ignore = resourceDecorator.Ignore;