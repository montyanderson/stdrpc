# stdrpc

ES6+ compatible, isomorphic JSON-RPC module for node and the browser.

* Compatible with [Komodo](https://komodoplatform.com), [Bitcoin](https://bitcoin.org/), [Ethereum](https://www.ethereum.org/), [Zcash](https://z.cash/), and many more.
* Supports on-the-fly RPC methods using [Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* Works in browser and in node
* Very small codebase
* Uses [axios](https://github.com/mzabriskie/axios) behind the scenes

## Usage

``` javascript
const rpc = stdrpc("http://localhost:7771");

rpc.getbalance().then(balance => {
	// woo!
});

const rpc = stdrpc('http://localhost:7771', {
    req: {
        auth: {
			username: "__username__",
			password: "__password__"
		}
    }
});
```

## API

### stdrpc(url [, options ])

Returns a proxied object, returning a function for every method.

#### options

##### methodTransform

A `Function` which all method names will be passed through.

``` javascript
// connecting to an ethereum node
const rpc = stdrpc("http://localhost:8545", {
	methodTransform: require("decamelize")
});

rpc.ethCoinbase() // becomes rpc.eth_coinbase()
```
