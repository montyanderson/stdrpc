const assert = require("assert");
const stdrpc = require("../");

describe("stdrpc", () => {
	it("should return a new object", () => {
		assert.equal(typeof stdrpc("http://localhost:8080"), "object");
	});
});
