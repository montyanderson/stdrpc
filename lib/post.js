const got = require("got");

module.exports = (url, body) => {
	return got.post(url, { body }).then(res => res.body);
};
