import http from 'k6/http'

export const options = {
	stages: [
		{ duration: '10s', target: 10 },
		{ duration: '5s', target: 10 },
		{ duration: '2s', target: 15 },
		{ duration: '5s', target: 0 },
	]
}

export default function () {
	http.get('https://dummyjson.com/todos/1')
}