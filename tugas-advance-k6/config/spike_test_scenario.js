const spike_test = {
	executor: 'ramping-vus',
	stages: [
		{ duration: '3m', target: 500 },
		{ duration: '1m', target: 0 },
	]
}

export default spike_test