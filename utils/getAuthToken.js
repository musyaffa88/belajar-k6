import http from 'k6/http'

export default function getAuthToken () {
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