export default function generateHeaders(token) {
	return {
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	}
}