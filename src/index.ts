import Test from '@/TestClass';
import Describer from '@/helpers/Describer';

let instance = Test.build();
let result = Describer.describe(instance)[0];

console.table([{
	"Class Name": "TestClass",
	"Parameter Name": result,
	"Value": instance[result]
}])