---
title: "@Ignore"
---

Not all of your class properties need to be mappable, some can be ignored. This is where this decorator comes in handy!

```typescript
import { BuildableResource, Decorators } from "@sinisimattia/tapi";

@Decorators.Resource
class TestClass extends BuildableResource {
	@Decorators.Ignore
	public thingToBeIgnored: string;
}
```

