import http from 'k6/http'
import { Rate } from 'k6/metrics'

const completedRate = new Rate('todo_completed_rate')

export default function () {
	for(let i = 1; i < 10; i++) {
		const res = http.get('https://dummyjson.com/todos/' + i)
		completedRate.add(res.json().completed)
	}
}