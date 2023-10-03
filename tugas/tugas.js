import http from 'k6/http'
import { check } from 'k6'

export const options = {
	// iterations: 300,
    // duration : '10s',
	// vus: 5,
    thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.1'],
		iterations: ['count<=120']
	},
    stages: [
		{ duration: '2s', target: 2 },
		{ duration: '2s', target: 5 },
		{ duration: '2s', target: 2 },
		{ duration: '2s', target: 1 },
		{ duration: '2s', target: 0 },
	]
}


export default function () {
	const res = http.get('https://dummyjson.com/carts/user/5')

	check(res, {
		'Respon harus 200': (r) => r.status === 200,
		'Harus ada carts': (r) => 'carts' in r.json(),
        'User ID harus 5': (r) => r.json().carts[0].userId === 5,
        'Harus ada produk' : (r) => 'products' in r.json().carts[0],
        'Jumlah produk yang ada di keranjang adalah 5': (r) => r.json().carts[0].products.length === 5
	})
}