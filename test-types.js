import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
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

export default function () {
	http.get('https://dummyjson.com/todos/1')
	sleep(1)
}