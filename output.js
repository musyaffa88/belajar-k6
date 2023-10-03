import http from 'k6/http'

export const options = {
	iterations: 2,
}

export default function () {
	http.get('https://dummyjson.com/todos/1')
}