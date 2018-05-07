---
title: workerize-loader
source: https://raw.githubusercontent.com/webpack-contrib/workerize-loader/master/README.md
edit: https://github.com/webpack-contrib/workerize-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/workerize-loader
---
<img src="https://i.imgur.com/HZZG8wr.jpg" width="1358" alt="workerize-loader">



> A webpack loader that moves a module and its dependencies into a Web Worker, automatically reflecting exported functions as asynchronous proxies.

- Bundles a tiny, purpose-built RPC implementation into your app
- If exported module methods are already async, signature is unchanged
- Supports synchronous and asynchronous worker functions
- Works beautifully with async/await
- Imported value is instantiable, just a decorated `Worker`


## Install

```sh
npm install -D workerize-loader
```


### Usage

**worker.js**:

```js
// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
	let start = Date.now(),
		count = 0
	while (Date.now() - start < time) count++
	return count
}
```

**index.js**: _(our demo)_

```js
import worker from 'workerize-loader!./worker'

let instance = worker()  // `new` is optional

instance.expensive(1000).then( count => {
	console.log(`Ran ${count} loops`)
})
```


### Credit

The inner workings here are heavily inspired by [worker-loader](/loaders/worker-loader/). It's worth a read!


### License

[MIT License](https://oss.ninja/mit/developit) © [Jason Miller](https://jasonformat.com/)
