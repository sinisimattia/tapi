# <strong class="colored">t</strong>api
### <strong class="colored">Typed</strong> API


<strong>tapi</strong> is a tiny TypeScript package used to define how to interpret any given API response as a typed object.

## Install 📦
```bash
npm i -S tapi
```

## Usage 🚀

### In a class

First off you need to extend the `Buildable` abstract class and define the builder the class will use.

```TypeScript
import { Builder, Buildable } from "tapi";

class TestClass extends Buildable {
	public param: string = "unassigned";
	public toBeIgnored: string = "still private"
	public toBeTransformed = "not transformed";
	public list: Array<any> = []

	public static override getBuilder() : Builder {
		return new Builder<TestClass>()
		.ignore(["toBeIgnored"])
		.transform('toBeTransformed', (value) => {
			return "transformed";
		})
		.alias("_param_1", "param");
	}
}
```

Then it's as simple as writing:
```TypeScript
const result = TestClass.getBuilder().fromJSON(new TestClass(), json);
```


<style>
	.colored {color: #0A68FF}
	h1 {border: none}
</style>