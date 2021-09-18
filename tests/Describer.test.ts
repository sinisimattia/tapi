import Describer from '@/helpers/Describer';

class TestClass {
	public param1 = "value1";
	public param2 = "value2";
	public param3 = "value3";
}

describe('Object describer', () => {
	test('properly gets property names', () => {
		const properties = Describer.getParameters(new TestClass());

		expect(properties.length).toBeGreaterThan(0);
		expect(properties.includes('param1')).toBe(true);
	})
})