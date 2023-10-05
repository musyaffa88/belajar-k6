import { group, check } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import products from "../payload/product.js"

export default function productsWithLogin (token) {
	group('Products', function () {
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
			const res = http.post('https://dummyjson.com/auth/products/add', products, generateHeaders(token))
			check(res, {
				'Respon harus 200': (r) => r.status === 200,
			})
		})
		describe('Mengubah informasi produk', function () {
			const res = http.put('https://dummyjson.com/auth/products/1', products, generateHeaders(token))
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
}