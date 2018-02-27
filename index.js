const axios = require("axios");

module.exports = function stdrpc(url, config = {}) {
	if(typeof url !== "string") {
		throw new Error("stdrpc: url must be a string");
	}

	const overwrites = {};

	return new Proxy({}, {
		set(target, method, handler) {
			overwrites[method] = handler; // allow overwriting of methods for testing
		},

		has() {
			return true; // for sinon spies/stubs testing
		},

		get(target, method) {
			if(typeof overwrites[method] === "function")
				return overwrites[method];

			return function() {
				method = (config.methodTransform || (a => a))(method);

				const params = [...arguments];

				const data = {
					jsonrpc: "2.0",
					method,
					params,
					id: 1
				};

				return axios.post(url, data, config.req || {}).then(res => {
					if(res.data.error)
						throw new Error(`stdrpc: ${res.data.error.message}`);

					return res.data.result;
				});
			}
		}
	});
};
