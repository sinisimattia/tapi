const TestClass = require('@/TestClass');
const Describer = require('@/helpers/Describer');
const Builder = require('@/Builder');

test('Extra params are ignored', () => {
	let json = {
		param1: "ok",
		param2: "ok",
		extraParam: "not ok! abort. ABORT!"
	}

	let instance = Builder.fromJSON(new TestClass(), json);

	expect(instance.param1).toBe("ok");
})