import { check, group } from 'k6'
import http from 'k6/http'

export default function () {
	group('semua todo', function () {
		const res = http.get('https://dummyjson.com/todos')

		check(res, {
			'statusnya 200': r => r.status === 200
		})
	})

	group('detail todo', function () {
		for (let i = 0; i < 5; i++) {
			const res = http.get('https://dummyjson.com/todos/'+i)

			check(res, {
				'request detail statusnya 200': r => r.status === 200
			})
		}

	})
}