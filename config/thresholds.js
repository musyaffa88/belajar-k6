const thresholds = {
	http_req_duration: ['avg<300', 'p(90)<250'],
	http_req_failed: ['rate<0.5'],
	iterations: ['count>400']
}

export default thresholds