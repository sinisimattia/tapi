import Describer from "@/helpers/Describer"
import BuildableResource from "@/contracts/BuildableResource"
import ResourceFactory from "@/contracts/ResourceFactory"
import JSONConvertible from "@/contracts/JSONConvertible"
import { deepCopy, dotAccess, } from "@/helpers/functions"
import BuildConfiguration from "@/BuildConfiguration"

/**
 * This is used to define how a class needs to be constructed from an object.
 */
export default class Builder<ResultType extends BuildableResource<ResultType>> implements JSONConvertible {
	/**
	 * The built object to populate.
	 */
	private baseObject: ResultType

	/**
	 * A {@link BuildConfiguration} containing all the instructions
	 * on how the object should be built.
	 */
	readonly buildConfig: BuildConfiguration<ResultType>

	/**
	 * Instantiates the given class thanks to a {@link ResourceFactory}.
	 *
	 * @param ctor The class that needs to be instantiated.
	 * @param buildConfig A {@link BuildConfiguration} instance
	 */
	constructor(ctor: ResourceFactory<ResultType>, buildConfig: BuildConfiguration<ResultType>|null = null) {
		this.baseObject = new ctor()
		this.buildConfig = buildConfig ?? this.baseObject.buildConfig ?? new BuildConfiguration<ResultType>
	}

	private getForeignObjectReference(localPath: string, foreignObject: any = undefined): ObjectReference {
		const foreignPath = this.buildConfig.aliases[localPath] ?? localPath
		const foreignValue = dotAccess(foreignPath, foreignObject)

		let result: ObjectReference

		if (foreignObject == undefined) {
			result = {path: foreignPath, value: null,}
		} else {
			result = {path: foreignValue != null ? foreignPath : localPath, value: foreignValue,}
		}

		result.value = dotAccess(result.path, foreignObject)

		return result
	}

	public fromJSON(source: any): ResultType {
		const target = this.baseObject
		const params = Describer.getParameters(target)

		params.forEach(param => {
			if (this.buildConfig.ignores.has(param) || !params.includes(param)) {
				return
			}

			const foreignObject = this.getForeignObjectReference(param, source)

			if (!source || !foreignObject.value) {
				if (this.buildConfig.strict) {
					throw new Error("Invalid input object, missing parameter: " + param)
				} else return
			}

			if (target[param] instanceof BuildableResource) {
				target[param] = target[param].build.fromJSON(foreignObject.value, this.buildConfig.strict)
			} else if (Array.isArray(target[param])) {
				const list: any[] = foreignObject.value

				target[param] = list.map((item: any, index: number) => {
					const listClassElement = this.buildConfig.listElementConstructors[param]
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build
						return listElementClassBuilder.fromJSON(item)
					} else if (!this.buildConfig.strict && foreignObject.value) {
						return foreignObject.value[index]
					}
				})
			} else {
				if (this.buildConfig.transformers[param]){
					target[param] = this.buildConfig.transformers[param].in(foreignObject.value)
				} else {
					target[param] = foreignObject.value
				}
			}
		})

		return deepCopy(target) as ResultType
	}

	public toJSON(source: ResultType): any {
		const params = Describer.getParameters(source)
		const result = {}

		params.forEach(param => {
			const foreignObject = this.getForeignObjectReference(param)

			if (this.buildConfig.ignores.has(param)) {
				return
			}

			if (source[param] instanceof BuildableResource) {
				result[foreignObject.path] = source[param].build.toJSON(source[param])
			} else if (Array.isArray(source[param])) {
				const list: any[] = source[param]

				result[foreignObject.path] = list.map((item: any, index: number) => {
					const listClassElement = this.buildConfig.listElementConstructors[param]
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build
						return listElementClassBuilder.toJSON(item)
					} else if (source.hasOwnProperty(param)) {
						return this.buildConfig.transformers[param] ? this.buildConfig.transformers[param].out(result[foreignObject.path][index]) : result[foreignObject.path][index]
					}
				})
			} else {
				result[foreignObject.path] = this.buildConfig.transformers[param] ? this.buildConfig.transformers[param].out(source[param]) : source[param]
			}
		})

		delete result["builder"] // FIXME Magic number

		return result
	}
}
