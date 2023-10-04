import { group } from "k6"
import http from "k6/http"
import generateHeaders from "../utils/generateHeaders.js"

export default function withLogin (token) {
	group('with login', function () {
		http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
	})
}