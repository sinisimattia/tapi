---
title: "@Alias"
---

Sometimes the front-end and back-end don't agree on what a property should be called, that's no problem thanks to this decorator!

```typescript
import { BuildableResource, Properties } from "@sinisimattia/tapi";

@Properties.Resource
class TestClass extends BuildableResource {
	@Properties.Alias("incomingPropertyName")
	public myProperty: string;
}
```

