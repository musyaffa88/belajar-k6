import { group, sleep } from 'k6'
import http from 'k6/http'

import thresholds from './config/thresholds.js'
import smoke_test_scenario from './config/smoke_test_scenario.js'
import average_load_test_scenario from  './config/average_load_test_scenario.js'

import getAuthToken from './utils/getAuthToken.js'

import withLogin from './groups/withLogin.js'
import withoutLogin from './groups/withoutLogin.js'

const scenarioList = {
	smoke: smoke_test_scenario,
	average: average_load_test_scenario,
}

export const options = {
	thresholds,
	scenarios: {
		current_scenario: scenarioList[__ENV.SCENARIO] || smoke_test_scenario
	}
}

export function setup() {
	return getAuthToken()
}

export default function (token) {
	withLogin(token)
	withoutLogin()

	sleep(1)
}