---
title: "@Alias"
---

Sometimes the front-end and back-end don't agree on what a property should be called, that's no problem thanks to this decorator!

```typescript
import { BuildableResource, Decorators } from "@sinisimattia/tapi";

@Decorators.Resource
class TestClass extends BuildableResource {
	@Decorators.Alias("incomingPropertyName")
	public myProperty: string;
}
```

