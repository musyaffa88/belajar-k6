import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
	stages: [
		{ duration: '5s', target: 60 },
		{ duration: '10s', target: 60 },
		{ duration: '5s', target: 0 },
	]
}

export default function () {
	http.get('https://dummyjson.com/todos/1')
	sleep(0.8)
}