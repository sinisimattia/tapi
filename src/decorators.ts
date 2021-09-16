import BuildableResource from "@/contracts/BuildableResource";
import ResourceFactory from "@/contracts/ResourceFactory";

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

	public Transform(transformer: (value: any) => any): any {
		return function (target: BuildableResource, name: string) {
			target.currentBuilder?.transform(name, transformer);
		};
	}

	public Ignore(target: BuildableResource, name: PropertyKey) {
		target.currentBuilder?.ignore([name.toString()]);
	}

	//TODO we can use the Resource decorator for the same purpose
	public ListOf<Type extends BuildableResource>(resource: ResourceFactory<Type>) {
		return function (target: BuildableResource, name: string) {
			target.currentBuilder?.listType(name, new resource());
		};
	}
}

const resourceDecorator = new ResourceDecorator();

export const Resource = resourceDecorator.Resource;

export const Alias = resourceDecorator.Alias; 

export const Transform = resourceDecorator.Transform; 

export const Ignore = resourceDecorator.Ignore;

export const ListOf = resourceDecorator.ListOf;