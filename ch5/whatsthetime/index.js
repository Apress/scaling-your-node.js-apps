const express = require('express')
const app = express()
const metrics = require("./metrics")


app.get('/', (req, res) => {

	let start = (new Date()).getTime()
	res.send(Date() )
	let total = (new Date()).getTime() - start + (Math.round(Math.random() * 100));

	metrics.report('API/TRAFFIC', {name: 'VISITS', value: 1.0, unit: 'Count'}, {Name: 'Counter', Value: 'Requests'}, (err) => {
		if(err) console.error(err);
		else console.log(" - Count stat sent - ")
		metrics.report('API/TRAFFIC', {name: 'VISITS', value: total, unit: 'Milliseconds'}, {Name: 'PERF', Value: 'DELAY'}, (err) => {
			if(err) console.error(err);
			else console.log(" - Time stat sent - ")
		})
	})
})

app.listen(3000, () => console.log("What's the time API up and running on port 3000"))