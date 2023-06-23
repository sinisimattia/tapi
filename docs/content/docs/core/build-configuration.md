---
title: Build Configuration
---

This is what specifies how to build an object, it can be configured by hand or [with decorators](/docs/decorators) (*suggested*).

All the available configuration methods are the same as the decorators mentioned above, the only difference is how you set them.

> Please use this **only** if you can't enable TypeScript's decorators.

```typescript
import { Builder, BuildConfiguration } from 'tapi.js';

const buildConfig = new BuildConfiguration<TestClass>()
	.ignore("param2")
	.transform('toBeTransformed', value => "transformed", value => "transformed again")
	.alias("_param_1", "param1");
	// etc...

const builtObject = new Builder(TestClass, buildConfig).fromJSON(json);
```
