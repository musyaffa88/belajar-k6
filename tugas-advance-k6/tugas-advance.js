import http from 'k6/http'
import { check, group } from 'k6'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js'
import { Trend, Rate } from 'k6/metrics'

const productsAllDuration = new Trend('products_all_duration')
const productsDetailDuration = new Trend('products_detail_duration')
const ratingRate = new Rate('products_rating_rate_less_than_4.5')


export const options = {
    iterations: 20,
    vus: 5,
    thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.1'],
		iterations: ['count<=120']
	},
    // stages: [
	// 	{ duration: '2s', target: 2 },
	// 	{ duration: '2s', target: 3 },
	// 	{ duration: '2s', target: 5 },
	// 	{ duration: '4s', target: 0 },
	// ]
}


export default function () {
	const res = http.get('https://dummyjson.com/products', {
		tags: { judul: 'Semua Produk' }
	})

    productsAllDuration.add(res.timings.duration)
	ratingRate.add(res.json().rating < 4.5)

	check(res, {
		'Respon harus 200': (r) => r.status === 200,
		'Harus ada produk': (r) => 'products' in r.json(),
        'Jumlah produk adalah 100': (r) => r.json().total === 100,
        'Jumlah produk yang ditampilkan adalah 30': (r) => r.json().products.length === 30
	})

    group('Test API Detail Produk 1 - 3', function () {
		for (let i = 1; i <= 3; i++) {
			const res = http.get('https://dummyjson.com/products/' + i)

            productsDetailDuration.add(res.timings.duration)
	        ratingRate.add(res.json().rating < 4.5)

			check(res, {
				'request detail statusnya 200': r => r.status === 200,
		        'Harus ada title': (r) => 'title' in r.json(),
			})
		}

	})

    describe('Test API detail produk dengan Id 4', function () {
		const res = http.get('https://dummyjson.com/products/4')

        productsDetailDuration.add(res.timings.duration)
	    ratingRate.add(res.json().rating < 4.5)

		expect(res.status, 'Status').to.equal(200)
		expect(res.json().id, 'Id').to.equal(4)
		expect(res.json().title, 'Title').to.exist
	})
}