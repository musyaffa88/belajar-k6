import http from 'k6/http'

export default function () {
	http.get('https://dummyjson.com/todos', {
		tags: { judul: 'semua-todo' }
	})

	http.get('https://dummyjson.com/todos/1', {
		tags: { judul: 'detail-todo' }
	})
}