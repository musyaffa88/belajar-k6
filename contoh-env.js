import http from 'k6/http'

export default function () {
	http.get('https://dummyjson.com/todos/' + __ENV.todoId)
}