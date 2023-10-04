import { group, sleep } from 'k6'
import http from 'k6/http'

export const options = {
	thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.5'],
		iterations: ['count>400']
	},
	scenarios: {
		smoke_test: {
			executor: 'constant-vus',
			duration: '10s',
			vus: 10
		},
		average_load_test: {
			executor: 'ramping-vus',
			stages: [
				{ duration: '5m', target: 100 },
				{ duration: '30m', target: 100 },
				{ duration: '5m', target: 0 },
			]
		},
	}
}

export function setup() {
	const url = 'https://dummyjson.com/auth/login'

	const payload = JSON.stringify({
		username: 'kminchelle',
		password: '0lelplR',
	})

	const headers = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const resLogin = http.post(url, payload, headers)
	return resLogin.json().token
}


export default function () {
	group('with login', function () {
		http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
	})

	group('without login', function () {
		http.get('https://dummyjson.com/todos/1')
	})

	sleep(1)
}