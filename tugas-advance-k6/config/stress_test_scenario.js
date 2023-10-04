const stress_test = {
	executor: 'ramping-vus',
	stages: [
		{ duration: '10m', target: 200 },
		{ duration: '40m', target: 200 },
		{ duration: '5m', target: 0 },
	]
}

export default stress_test