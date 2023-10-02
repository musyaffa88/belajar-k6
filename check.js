import http from 'k6/http'
import { check } from 'k6'

export default function () {
	const res = http.get('https://dummyjson.com/todos/1')

	check(res, {
		'responsenya harus 200': (r) => r.status === 200,
		'di dalamnya harus ada todo': (r) => 'todo' in r.json()
	})
}