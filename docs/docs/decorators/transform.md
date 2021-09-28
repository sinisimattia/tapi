---
title: "@Transform"
---

Sometimes, assigning the value as it arrives is not enough. What if we want to apply a transformation before it gets assigned? Simple!

```typescript
import { BuildableResource, Properties } from "@sinisimattia/tapi";

@Properties.Resource
class TestClass extends BuildableResource {
    @Properties.Transform(incomingValue => {
        return incomingValue.toUpperCase();
    })
	public needsToBeUppercase: string;
}
```
