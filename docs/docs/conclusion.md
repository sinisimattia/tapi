---
title: Conclusion
description: Thanks for using tapi.js!
---

This is what our new class looks like, everything can now be mapped automatically!

```typescript
import { BuildableResource, Properties } from "tapi.js";

@Properties.Resource
class TestClass extends BuildableResource {
	@Properties.Alias("_param_1")
	public param1: string;

	@Properties.Transform(incomingValue => {
		return incomingValue.toUpperCase();
	})
	public param2: string;

	@Properties.ListOf(string)
	public list: string[];

	public thing: AnotherClass;

	@Properties.Ignore
	public thingToBeIgnored: string = "Leave me here!"
}
```

