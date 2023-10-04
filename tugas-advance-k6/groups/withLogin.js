import { group, check } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import products from "../payload/product.js"
import todos from "../payload/todos.js"

export default function withLogin (token) {
	group('Products with Login', function () {
		describe('Mengambil semua produk', function () {
			const res = http.get('https://dummyjson.com/auth/products', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})	
		describe('Mengambil hanya 1 produk dengan id = 1', function () {
			const res = http.get('https://dummyjson.com/auth/products/1', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mencari produk dengan kata kunci = phone', function () {
			const res = http.get('https://dummyjson.com/auth/products/search?q=phone', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mencari produk dengan limit dan skip', function () {
			const res = http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengambil semua kategori produk', function () {
			const res = http.get('https://dummyjson.com/auth/products/categories', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengambil produk dengan kategori smartphones', function () {
			const res = http.get('https://dummyjson.com/auth/products/category/smartphones', generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Menambah produk', function () {
			const res = http.post('https://dummyjson.com/auth/products/add', generateHeaders(token), products)
			console.log('Ini log tambah produk ', res.json());
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengubah informasi produk', function () {
			const res = http.patch('https://dummyjson.com/auth/products/2', generateHeaders(token), products)
			console.log('Ini log edit produk ', res.json());
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Menghapus produk', function () {
			const res = http.del('https://dummyjson.com/auth/products/1', generateHeaders(token))
			console.log('Ini log hapus produk ', res.json());
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
	})


	group('Todos with Login', function () {
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
			const res = http.post('https://dummyjson.com/auth/todos/add', generateHeaders(token), todos)
			console.log('Ini log tambah todo ', res.json());
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengubah informasi todos', function () {
			const res = http.patch('https://dummyjson.com/auth/todos/1', generateHeaders(token), todos)
			console.log('Ini log edit todo ', res.json());
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