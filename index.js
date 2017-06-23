const post = require("./lib/post");

module.exports = function stdrpc(url) {
	return new Proxy({}, {
		get(target, method) {
			return function() {
				const params = [...arguments];

				const data = {
					jsonrpc: "2.0",
					method,
					params,
					id: 1
				};

				return post(url, JSON.stringify(data))
				.then(JSON.parse)
				.then(res => {
					if(res.error) {
						throw new Error(res.error.data);
					} else {
						return res.result;
					}
				});
			}
		}
	});
};
