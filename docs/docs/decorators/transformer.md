---
title: "@Transformer"
---

Sometimes, assigning the value as it arrives is not enough. What if we want to apply a transformation before it gets assigned? Simple!

```typescript
import { BuildableResource, Decorators } from "@sinisimattia/tapi";

@Decorators.Resource
class TestClass extends BuildableResource {
    @Decorators.Transformer(incomingValue => {
        return incomingValue.toUpperCase();
    })
	public needsToBeUppercase: string;
}
```
