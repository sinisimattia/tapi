---
title: "@ListOf"
---

If the incoming object has a list that needs to be converted to a typed one we need to indicate the class of the individual items.

> **Remember**: The class of the list items must be a [`BuildableResource`](/docs/core/buildable-resource).

```typescript
import { BuildableResource, Properties } from "tapi.js";
import Post from "path/to/classes/Post";

@Properties.Resource
class TestClass extends BuildableResource {
	@Properties.ListOf(Post)
	public listOfPosts: Post[];
}
```

