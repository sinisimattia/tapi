import BuildableResource from "@/contracts/BuildableResource"
import ResourceFactory from "@/contracts/ResourceFactory"

class ResourceDecorator {
	/**
	 * Define a class as a resource and check for its validity.
	 */
	public Resource(constructor: Function): any {
		const target = constructor.prototype

		if (!(target instanceof BuildableResource)) {
			throw new Error("Target class has to extend BuildableResource in order to use this decorator.")
		}

		if(!target.constructor) {
			throw new Error("Target class must have a constructor with no arguments.")
		}
	}

	/**
	 * Adds an alias.
	 * @param alias The alias to add.
	 */
	public Alias(alias: string): any {
		return (target: BuildableResource, name: PropertyKey): any => {
			target.buildConfig?.alias(alias, name.toString())
		}
	}

	/**
	 * Adds a transformer.
	 * @param transformerIn The transformer for incoming properties.
	 * @param transformerOut The transformer for outgoing properties.
	 */
	public Transform(transformerIn: Action, transformerOut?: Action): any {
		return function (target: BuildableResource, name: string) {
			target.buildConfig?.transform(name, transformerIn, transformerOut)
		}
	}

	/**
	 * Adds an required directive.
	 */
	public Required(target: BuildableResource, name: PropertyKey) {
		target.buildConfig?.require(name.toString())
	}

	/**
	 * Adds an ignore directive.
	 */
	public Ignore(target: BuildableResource, name: PropertyKey) {
		target.buildConfig?.ignore(name.toString())
	}

	//NOTE we can use the Resource decorator for the same purpose
	/**
	 * Define a list of {@link BuildableResource}(s).
	 * @param resource The list items' class.
	 */
	public ListOf<Type extends BuildableResource>(resource: ResourceFactory<Type>) {
		return function (target: BuildableResource, name: string) {
			target.buildConfig?.listType(name, new resource())
		}
	}
}

const resourceDecorator = new ResourceDecorator()

export const Resource = resourceDecorator.Resource
export const Alias = resourceDecorator.Alias
export const Transform = resourceDecorator.Transform
export const Ignore = resourceDecorator.Ignore
export const Required = resourceDecorator.Required
export const ListOf = resourceDecorator.ListOf
