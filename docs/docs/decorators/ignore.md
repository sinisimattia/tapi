---
title: "@Ignore"
---

Not all of your class properties need to be mappable, some can be ignored. This is where this decorator comes in handy!

```typescript
import { BuildableResource, Properties } from "@sinisimattia/tapi";

@Properties.Resource
class TestClass extends BuildableResource {
	@Properties.Ignore
	public thingToBeIgnored: string;
}
```

