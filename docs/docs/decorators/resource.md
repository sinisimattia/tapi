---
title: "@Resource"
---

This is what checks if your class satisfies the requirements needed to be buildable. It is completely optional but highly recommended.

```typescript
import { BuildableResource, Decorators } from "@sinisimattia/tapi";

@Decorators.Resource
class TestClass extends BuildableResource {
	// ...
}
```

