import Describer from "@/helpers/Describer"
import BuildableResource from "@/contracts/BuildableResource"
import ResourceFactory from "@/contracts/ResourceFactory"
import JSONConvertible from "@/contracts/JSONConvertible"
import { deepCopy, } from "@/helpers/functions"
import BuildConfiguration from "@/core/BuildConfiguration"
import Dot from "@/helpers/Dot"

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
	 * @param buildConfig A {@link BuildConfiguration} instance (it overrides the one set in the object)
	 */
	constructor(ctor: ResourceFactory<ResultType>, buildConfig: BuildConfiguration<ResultType>|null = null) {
		this.baseObject = new ctor()
		this.buildConfig = buildConfig ?? this.baseObject.buildConfig ?? new BuildConfiguration<ResultType>
	}

	private getForeignObjectReference(localPath: string, foreignObject: any = undefined): ObjectReference {
		const foreignPath = this.buildConfig.aliases[localPath] ?? localPath
		const foreignValue = Dot.get(foreignPath, foreignObject)

		let result: ObjectReference

		if (foreignObject == undefined) {
			result = {path: foreignPath, value: null,}
		} else {
			result = {path: foreignValue != null ? foreignPath : localPath, value: foreignValue,}
		}

		result.value = Dot.get(result.path, foreignObject)

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
				if (this.buildConfig.required.has(param)) {
					throw new Error("Invalid input object, missing required parameter: " + param)
				} else return
			}

			if (target[param] instanceof BuildableResource) {
				target[param] = target[param].build.fromJSON(foreignObject.value)
			} else if (Array.isArray(target[param])) {
				const list: any[] = foreignObject.value

				target[param] = list.map((item: any, index: number) => {
					const listClassElement = this.buildConfig.listElementConstructors[param]
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build
						return listElementClassBuilder.fromJSON(item)
					} else if (!this.buildConfig.required.has(param) && foreignObject.value) {
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
			let valueToAssign: any = undefined

			if (this.buildConfig.ignores.has(param)) {
				return
			}

			if (source[param] instanceof BuildableResource) {
				valueToAssign = source[param].build.toJSON(source[param])
			} else if (Array.isArray(source[param])) {
				const list: any[] = source[param]

				valueToAssign = list.map((item: any, index: number) => {
					const listClassElement = this.buildConfig.listElementConstructors[param]
					if(listClassElement) {
						const listElementClassBuilder = listClassElement.build
						return listElementClassBuilder.toJSON(item)
					} else if (source.hasOwnProperty(param)) {
						const x = Dot.get(foreignObject.path, result)
						return this.buildConfig.transformers[param] ? this.buildConfig.transformers[param].out(x[index]) : x[index]
					}
				})
			} else {
				valueToAssign = this.buildConfig.transformers[param] ? this.buildConfig.transformers[param].out(source[param]) : source[param]
			}

			Dot.assign(foreignObject.path, result, valueToAssign)
		})

		delete result["resourceBuildConfiguration"] // FIXME Magic number

		return result
	}
}
