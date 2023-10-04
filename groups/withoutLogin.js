import { group } from "k6"
import http from "k6/http"

export default function withoutLogin () {
	group('without login', function () {
		http.get('https://dummyjson.com/todos/1')
	})
}