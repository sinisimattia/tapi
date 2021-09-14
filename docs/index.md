---
layout: page
title: Convert JSON data into TypeScript objects with tapi!
banner_with_image: true
image: https://i.ibb.co/stfLH8B/tepi-demo.png
banner_darken: false
banner_style: is-primary
banner_height: is-large
---

![Warning: Testing before release](https://img.shields.io/badge/🧪-Testing%20before%20release-blue)

### **Typed** API consumer

**tapi** is a tiny TypeScript package used to define how to interpret any given API response as a typed object.

## Install 📦
```bash
npm i -S sinisimattia/tapi
```
<small>Remember, since it's on the GitHub registry, don't put @ before the scope.</small>

## Usage 🚀

First off you need to implement the `BuildableResource` interface and define the builder the class will use.

### With decorators ✨

```typescript
// TestClass.ts
import tapi from '@sinisimattia/tapi';
import { Alias, Transformer, Ignore, Resource } from '@sinisimattia/tapi/decorators';

@Resource
class TestClass extends tapi.BuildableResource {
	@Alias('_param_1')
	public param: string = 'unassigned';

	@Ignore
	public toBeIgnored: string = 'still private'

	@Transformer((value: string) => {
		return value.toUppercase();
	})
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
```

Then it's as simple as writing:
```typescript
const instance: TestClass = new TestClass().currentBuilder.fromJSON(json);
```

### ... or with explicit builder 👷‍♂️

```typescript
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
	.ignore(['toBeIgnored'])
	.transform('toBeTransformed', (value) => {
		return 'transformed';
	})
	.alias('_param_1', 'param');
```

Then it's as simple as writing:
```typescript
const instance: TestClass = testClassBuilder.fromJSON(json);
```

### ... and also with Promises 🤞

The conversion tool can also be used with promises, to demonstrate this we'll be using a simple Axios request.

```typescript
import axios from 'axios' // 👈 Of course, you can use whatever library you want

import tapi from '@sinisimattia/tapi'

import '@sinisimattia/tapi/extensions' // 👈 Use this line to import all the extended functionalities of core types

// Let's create a simple class...
class TestClass extends tapi.BuildableResource {
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
