<div align="center">
	<pre>
   __              _     _     
  / /_____ _____  (_)   (_)____
 / __/ __ `/ __ \/ /   / / ___/
/ /_/ /_/ / /_/ / /   / (__  ) 
\__/\__,_/ .___/_(_)_/ /____/  
        /_/       /___/        
	</pre>
	<h3>Consume APIs as <strong>typed objects</strong>!</h3>
</div>

<div align="center" style="margin-top: 40px">

![License](https://badgen.net/github/license/sinisimattia/tapi)
![TS](https://badgen.net/npm/types/tapi.js)
![Dependencies](https://badgen.net/bundlephobia/dependency-count/tapi.js)
![Latest Tag](https://badgen.net/github/tag/sinisimattia/tapi)
![Stars](https://badgen.net/github/stars/sinisimattia/tapi)

</div>


## Imagine doing this...

```javascript
http
  .get('/some-url-that-returns-an-object') // Get data 📡
  .as(YourClass) // Map it onto your class ✨
  .then((builtObject) => {
    builtObject.doSomething(); // Use it directly 🎉
  })
```

Or even this...

```javascript
const builtObject = await http.get('/some-url-that-returns-an-object').as(YourClass)
builtObject.doSomething();
```

## How?

Introducing **tapi**, a tiny TypeScript package used to define how to interpret any given API response as a typed object.

It **automatically** converts JSON objects into TypeScript class instances, however you can still configure it however you want with *Aliases*, *Transformers*, *Mappers* and more.

___

<div align="center">

### **[🚀 Get started 🚀](https://tapi.js.org)**

</div>

___

## More info

📦 [Check it out on **npm**](https://npm.im/tapi.js)

🦕 [Check it out on **deno**](https://deno.land/x/tapi)

😱 [Check it out on **Bundlephobia**](https://bundlephobia.com/package/tapi.js@latest)

☁ [Use directly from the browser](https://cdn.jsdelivr.net/npm/tapi.js/)

📚 [Additional info on the file on **libraries.io**](https://libraries.io/npm/tapi.js)

## Big thanks to anyone who contributes!

**You** could be here!

👇

![Contributors](https://contrib.rocks/image?repo=sinisimattia/tapi)
___

Thanks for using **tapi**! 😊 I hope it's been useful to you in some way.
