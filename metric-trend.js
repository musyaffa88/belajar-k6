import http from 'k6/http'
import { Trend } from 'k6/metrics'

export const options = {
	iterations: 3
}

const todosAllDuration = new Trend('todos_all_duration')
const todosDetailDuration = new Trend('todos_detail_duration')

export default function () {
	const resAll = http.get('https://dummyjson.com/todos')
	const resDetail = http.get('https://dummyjson.com/todos/1')

	todosAllDuration.add(resAll.timings.duration)
	todosDetailDuration.add(resDetail.timings.duration)
}