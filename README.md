![tapi](https://i.ibb.co/Wx0wt2X/tapi-logo.png)
### **Typed** API consumer


**tapi** is a tiny TypeScript package used to define how to interpret any given API response as a typed object.

## Install 📦
```bash
npm i -S tapi
```

## Usage 🚀

First off you need to implement the `BuildableResource` interface and define the builder the class will use.

```TypeScript
// TestClass.ts
import { Builder, Buildable } from "tapi";

class TestClass extends Buildable {
	public param: string = "unassigned";
	public toBeIgnored: string = "still private"
	public toBeTransformed = "not transformed";
	public list: Array<any> = []
}

// example.ts
const testClassBuilder = new Builder(TestClass)
	.ignore(["param2"])
	.transform('toBeTransformed', (value) => {
		return "transformed";
	})
	.alias("_param_1", "param1");
```

Then it's as simple as writing:
```TypeScript
const instance: TestClass = testClassBuilder.fromJSON(json);
```

### With Promises 🤞

The conversion tool can also be used with promises, to demonstrate this we'll be using a simple Axios request.

```TypeScript
import axios from 'axios' // 👈 Of course, you'll need to installl this

import { BuildableResource } from 'tapi'

import 'tapi/extensions' // 👈 Use this line to import all the extended functionalities of core types

// Let's create a simple class...
class TestClass implements BuildableResource {
	public data: any = {};

	static build(): TestClass {
		return new TestClass()
	}
}

// Then make a request and get a promise...
axios.get('/some-url-that-returns-an-object')
	// Now let's build the object with its defined builder! 🎉
	.as(TestClass)
	// Aaaaand we can use the typed object to do whatever we want.
	.then((builtObject) => {
		console.log(builtObject)
	})
```

If you want to select only a specific field of the response object (for example: *data*) you can define it as a string.

```TypeScript
axios.get('/some-url-that-returns-an-object')
	// Now let's build the object with its defined builder! 🎉
	.as(TestClass, 'data')
	// Aaaaand we can use the typed object to do whatever we want.
	.then((builtObject) => {
		console.log(builtObject)
	})
```

___

Thanks for using **tapi**! 😊 I hope it's been useful to you in some way.