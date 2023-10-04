import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
	scenarios: {
		berdasarkan_durasi: {
			executor: 'constant-vus',
			duration: '10s',
			vus: 10
		},
		berdasarkan_iterasi: {
			executor: 'per-vu-iterations',
			iterations: 10,
			vus: 10,
			startTime: '10s'
		},
		simulasi_ramping: {
			executor: 'ramping-vus',
			stages: [
				{ duration: '5s', target: 10 },
				{ duration: '5s', target: 10 },
				{ duration: '5s', target: 0 },
			],
			startTime: '23s'
		}
	}
}

export default function () {
	http.get('https://dummyjson.com/todos/1')
	sleep(1)
}