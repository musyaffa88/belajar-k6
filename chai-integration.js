import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function () {
	describe('test api detail todo', function () {
		const res = http.get('https://dummyjson.com/todos/1')

		expect(res.status, 'statusnya').to.equal(200)
		expect(res.json().todo, 'responsenya').to.exist
	})
}