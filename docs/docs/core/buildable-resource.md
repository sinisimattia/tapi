---
title: BuildableResource
---

In order to make a class buildable from a JSON we have to inherit some common behaviors to make is usable to the `Builder`.

# How to create a *buildable* class

To do this all we need is to extend the `BuildableResource` abstract class and to create **a constructor without arguments**, this will be needed in order to create the instance.

```typescript
import { BuildableResource } from 'tapi.js';

class TestClass extends BuildableResource {
	// All your other stuff here
}
```

Forgetting to include the constructor will result in a compilation error due to the [`ResourceFactory`](/docs/core/resource-factory) contract.