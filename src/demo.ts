import axios from 'axios'
import '@/extensions/axios'
import BuildableResource from '@/contracts/BuildableResource'

class TestClass implements BuildableResource {
	static build(): TestClass {
		return new TestClass()
	}
}

const result = axios.as(TestClass);

console.log(result)