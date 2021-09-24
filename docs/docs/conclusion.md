---
title: Conclusion
description: Thanks for using tapi.js!
---

This is what our new class looks like, everything can now be mapped automatically!

```typescript
import { BuildableResource, Decorators } from "@sinisimattia/tapi";

@Decorators.Resource
class TestClass extends BuildableResource {
    @Decorators.Alias("_param_1")
	public param1: string;
    
    @Decorators.Transformer(incomingValue => {
        return incomingValue.toUpperCase();
    })
	public param2: string;

    @Decorators.ListOf(string)
	public list: string[];

    public thing: AnotherClass;
    
    @Decorators.Ignore
    public thingToBeIgnored: string = "Leave me here!"
}
```

