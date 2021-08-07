import Builder from '@/Builder';

class TestClass {
	public param1: string = "yo";
	private param2: string = "there is no such thing as privacy"
}

describe('Typed object builder', () => {
	test('ignores extra parameters', () => {
		let json = {
			param1: "ok",
			extraParam: "not ok! abort. ABORT!"
		}
	
		let instance = Builder.fromJSON(new TestClass(), json);
	
		expect(instance.param1).toBe("ok");
	})

	test('enforces strict assignment', () => {
		let json = {
			param1: "ok",
			extraParam: "not ok! abort. ABORT!"
		}

		expect(() => {
			Builder.fromJSON(new TestClass(), json, true);
		}).toThrowError();
	})
})