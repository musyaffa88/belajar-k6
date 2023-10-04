import http from 'k6/http'

function generateHeaders (token) {
	return {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}
}

export function setup () {
	const url = 'https://dummyjson.com/auth/login'

	const payload = JSON.stringify({
		username: 'kminchelle',
		password: '0lelplR',
	})

	const headers = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const resLogin = http.post(url, payload, headers)
	return resLogin.json().token
}

export default function (token) {
	http.get('https://dummyjson.com/auth/todos/1', generateHeaders(token))
}

export function teardown (data) {
}