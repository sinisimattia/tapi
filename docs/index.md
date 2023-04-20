---
title: Convert JSON data into TypeScript objects with tapi!
banner_with_image: true
image: https://i.ibb.co/stfLH8B/tepi-demo.png
banner_darken: false
banner_style: is-light
banner_height: is-large
---

### **Typed** API consumer

**tapi** is a tiny TypeScript package used to define how to interpret any given API response as a typed object.

## Install 📦
```bash
npm i -S tapi.js
```

## Usage 🚀

First off you need to implement the `BuildableResource` interface and define the builder the class will use.

### With decorators ✨

```typescript
// TestClass.ts
import { BuildableResource, Properties } from 'tapi.js';

@Properties.Resource
class TestClass extends BuildableResource {
	@Properties.Alias('_param_1')
	public param: string = 'unassigned';

	@Properties.Ignore
	public toBeIgnored: string = 'still private'

	@Properties.Transform((value: string) => {
		return value.toUppercase();
	})
	public toBeTransformed = 'not transformed';

	@Properties.ListOf<SomeOtherClass>
	public list: Array<SomeOtherClass> = []

	// Define a constructor with no arguments.
	constructor() {
		super();
	}
}
```

Then it's as simple as writing:
```typescript
const instance: TestClass = new TestClass().fromJSON(json);
```

### ... or with explicit builder 👷‍♂️

```typescript
// TestClass.ts
import { BuildableResource, BuildConfiguration } from 'tapi.js';

class TestClass extends BuildableResource {
	public param: string = 'unassigned';
	public toBeIgnored: string = 'still private'
	public toBeTransformed = 'not transformed';
	public list: Array<any> = []

	constructor() {
		super();
	}
}

// example.ts
const testClassBuildConfig = new BuildConfiguration<TestClass>()
	.ignore(['toBeIgnored'])
	.transform('toBeTransformed', (value) => {
		return 'transformed';
	})
	.alias('_param_1', 'param');

const builtObject = new Builder(TestClass, testClassBuildConfig).fromJSON(json);
```

### ... and also with Promises 🤞

The conversion tool can also be used with promises, to demonstrate this we'll be using a simple Axios request.

```typescript
import axios from 'axios' // 👈 Of course, you can use whatever library you want

import { BuildableResource, ... } from 'tapi.js'

import 'tapi.js/extensions' // 👈 Use this line to import all the extended functionalities of core types

// Let's create a simple class...
class TestClass extends BuildableResource {
	// You know the drill by now...
}

// Then make a request and get a promise...
axios.get('/some-url-that-returns-an-object')
	// Now let's build the object with its defined builder! 🎉
	.as(TestClass)
	// Aaaaand we can use the typed object to do whatever we want.
	.then((builtObject) => {
		builtObject.doSomething();
	})
```

If you want to select only a specific field of the response object (for example: *data*) you can define it as a string.

```typescript
axios.get('/some-url-that-returns-an-object')
	// Now let's build the object with its defined builder! 🎉
	.as(TestClass, 'data')
	// Aaaaand we can use the typed object to do whatever we want.
	.then((builtObject) => {
		builtObject.doSomething();
	})
```

___

Thanks for using **tapi**! 😊 I hope it's been useful to you in some way.
