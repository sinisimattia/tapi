import BuildableResource from '@/contracts/BuildableResource';
import { Resource, Alias, Transform, Ignore} from '@/decorators';
import '@/extensions';

@Resource
class TestClass extends BuildableResource {
	@Alias("_param_1")
	public param1: string = "unassigned";

	@Ignore
	public param2: string = "still private"

	@Transform((value) => {
		return "transformed";
	})
	public toBeTransformed = "not transformed";

	constructor() {
		super();
	}
}

const buildPromise = new Promise((resolve, reject) => {
	const json = {
		_param_1: "ok",
		param2: "this should not be reassigned",
		extraParam: "not ok! abort. ABORT!",
		toBeTransformed: "something, not important. you shouldn't even see me"
	};

	resolve(json);
}).as(TestClass, '');

describe("Promise building", () => {	
	test("properly builds", async () => {
		const result = await buildPromise;
		expect(result).toBeInstanceOf(TestClass);
	})
})