import { group, check } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import todos from "../payload/todos.js"

export default function todosWithLogin (token) {
	group('Todos', function () {
		describe('Mengambil semua todos', function () {
			const res = http.get('https://dummyjson.com/auth/todos', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})	
		describe('Mengambil hanya 1 todos dengan id = 1', function () {
			const res = http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengambil random todo', function () {
			const res = http.get('https://dummyjson.com/auth/todos/random', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mencari todos dengan limit dan skip', function () {
			const res = http.get('https://dummyjson.com/auth/todos?limit=3&skip=10', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengambil todos berdasarkan user id 5', function () {
			const res = http.get('https://dummyjson.com/auth/todos/user/5', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Menambah todos', function () {
			const res = http.post('https://dummyjson.com/auth/todos/add', todos, generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengubah informasi todos', function () {
			const res = http.put('https://dummyjson.com/auth/todos/1', todos, generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Menghapus todos', function () {
			const res = http.del('https://dummyjson.com/auth/todos/1', generateHeaders(token))
			console.log('Ini log hapus todo ', res.json());
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
	})
}