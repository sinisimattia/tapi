---
title: Documentation
description: Let's get started with tapi.js!
---

# The situation

Let's imagine that you have a class, we'll call it `TestClass`.

```typescript
class TestClass {
	public param1: string;
	public param2: string;
	public list: string[];
	public thing: AnotherClass;
	public thingToBeIgnored: string = "Leave me here!"
}
```

Now we want to instantiate that class from a generic JSON response.

```json
{
	"_param_1": "something",
	"param2": "something else",
	"items": ["item 1", "item 2", "item 3"],
	"something": {
		"inner1": "inner thing",
		"inner2": "another inner thing"
	},
	"thingToBeIgnored": "some useless data"
}
```

How do we go about it? Mapping manually is too cumbersome... that's where **tapi.js** comes to help!

___

We can begin, first [let's make your class ***buildable***](/docs/core/buildable-resource)!

___

When you're done come back [here](/docs/conclusion) to see what our new configuration looks like. No spoilers!
