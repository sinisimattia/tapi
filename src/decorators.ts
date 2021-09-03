/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
//FIXME Remove these ☝ and put them in eslintrc

export function Resource(targetConstructor: Function): any {
	console.log("Resource: ", targetConstructor)
}

export function Prop(): any {
	return (target: any, name?: PropertyKey): any => {
		console.log("Prop: ", name, target)
	};
}

export function Transform(): any {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("Transform: ", target, propertyKey, descriptor)
	};
}