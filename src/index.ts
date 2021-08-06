import Test from '@/TestClass';
import Describer from '@/helpers/Describer';
import Builder from '@/Builder'

let json = {
	param1: "assigned from json",
	param2: "assigned from json",
	extraParam: "you should not be able to see me"
}

let instance = Builder.fromJSON(new Test(), json);

let params = Describer.getParameters(instance);


let result: Array<Object> = []

params.forEach(param => {
	result.push({
		"Parameter Name": param,
		"Value": instance[param]
	})
})

console.table(result);