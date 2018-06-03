# stdrpc

ES6+ compatible, isomorphic JSON-RPC module for node and the browser.

[![Build Status](https://travis-ci.org/montyanderson/stdrpc.svg?branch=master)](https://travis-ci.org/montyanderson/stdrpc)
[![Coverage Status](https://coveralls.io/repos/github/montyanderson/stdrpc/badge.svg?branch=master)](https://coveralls.io/github/montyanderson/stdrpc?branch=master)

* Compatible with [Bitcoin](https://bitcoin.org/), [Ethereum](https://www.ethereum.org/), [Zcash](https://z.cash/), and many more.
* Supports on-the-fly RPC methods using [Proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* Works in browser and in node
* Very small codebase
* Uses [axios](https://github.com/mzabriskie/axios) behind the scenes

## Usage

``` javascript
const rpc = stdrpc({
	url: "http://localhost:8332"
});

rpc.getbalance().then(balance => {
	// woo!
});
```

## API

### stdrpc(options)

Returns a proxied object, returning a function for every method.

#### options

##### url

Type: `string`

Address of the RPC server

##### username

Type: `string`

Username for authentication

##### password

Type: `string`

Password authentication

##### methodTransform

Type: `function`

Transform function for method names

``` javascript
const rpc = stdrpc({
	url: "http://localhost:8545",
	methodTransform: require("decamelize")
});

rpc.ethCoinbase() // becomes rpc.eth_coinbase()
```
