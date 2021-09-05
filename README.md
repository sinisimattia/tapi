
<a href="https://tapi.js.org" style="display: block">
	<img src="https://i.ibb.co/Wx0wt2X/tapi-logo.png" alt="tapi" />
</a>

![Warning: Still under development](https://img.shields.io/badge/Warning-Still%20under%20development-orange)

<img src="https://i.ibb.co/7ChsKf4/carbon.png" alt="Demo Example" style="display: block; margin-left: auto" />

### **Typed** API consumer

**tapi** is a tiny TypeScript package used to define how to interpret any given API response as a typed object.

## Install 📦
```bash
npm i -S @sinisimattia/tapi
```

## Usage 🚀

First off you need to implement the `BuildableResource` interface and define the builder the class will use.

```TypeScript
// TestClass.ts
import tapi from '@sinisimattia/tapi';

class TestClass extends tapi.BuildableResource {
	public param: string = 'unassigned';
	public toBeIgnored: string = 'still private'
	public toBeTransformed = 'not transformed';
	public list: Array<any> = []

	// Define a build method
	static build() {
		// Do whatever you want here.
		// The important thing is that you return an instance of your class.
		// Don't worry, the compiler will tell you to if you don't.
		return new TestClass();
	}
}

// example.ts
const testClassBuilder = new tapi.Builder(TestClass)
	.ignore(['param2'])
	.transform('toBeTransformed', (value) => {
		return 'transformed';
	})
	.alias('_param_1', 'param1');
```

Then it's as simple as writing:
```TypeScript
const instance: TestClass = testClassBuilder.fromJSON(json);
```

### With Promises 🤞

The conversion tool can also be used with promises, to demonstrate this we'll be using a simple Axios request.

```TypeScript
import axios from 'axios' // 👈 Of course, you'll need to installl this

import tapi from '@sinisimattia/tapi'

import '@sinisimattia/tapi/extensions' // 👈 Use this line to import all the extended functionalities of core types

// Let's create a simple class...
class TestClass extends tapi.BuildableResource {
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
