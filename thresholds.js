import http from 'k6/http'

export const options = {
	thresholds: {
		http_req_duration: ['avg<300', 'p(90)<250'],
		http_req_failed: ['rate<0.5'],
		iterations: ['count>400']
	}
}

export default function () {
	http.get('https://dummyjson.com/todos/1')
}