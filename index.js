const axios = require("axios");

module.exports = function stdrpc(_config) {
	if(typeof _config !== "object")
		throw new Error("Expected 'config' to be an object");

	const config = {
		url: "http://localhost:8332",
		methodTransform: a => a,
		..._config
	};

	return new Proxy({}, {
		set(target, method, handler) {
			target[method] = handler; // allow overwriting of methods for testing
		},

		has() {
			return true; // for sinon spies/stubs testing
		},

		get(target, method) {
			if(typeof target[method] === "function")
				return target[method];

			return async (...params) => {
				method = config.methodTransform(method);

				const requestData = {
					jsonrpc: "2.0",
					method,
					params,
					id: Date.now()
				};

				const requestConfig = {};

				if(typeof config.username === "string" && typeof config.password === "string")
					requestConfig.auth = {
						username: config.username,
						password: config.password
					};

				const { data } = await axios.post(config.url, requestData, requestConfig);

				if(data.error)
					throw new Error(`${data.error.code}: ${data.error.message}`);

				return data.result;
			};
		}
	});
};
