---
title: "@Resource"
---

This is what checks if your class satisfies the requirements needed to be buildable. It is completely optional but highly recommended.

```typescript
import { BuildableResource, Properties } from "tapi.js";

@Properties.Resource
class TestClass extends BuildableResource {
	// ...
}
```

