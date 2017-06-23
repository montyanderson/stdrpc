# stdrpc

Isomorphic, configuration-less JSON RPC module for Node.js.

* Supports on-the-fly RPC methods
* Works in Browser and in Node
* Very small codebase

## Usage

``` javascript
// Connecting to an Ethereum Geth node
const web3 = stdrpc("http://localhost:8545");

web3.eth_coinbase().then(address => {
	console.log(address);
});
```
