const restify = require("restify"),
	restifyPlugins = restify.plugins,
	config = require("config");

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


function start(){

	const server = restify.createServer(config.get('server'))

	server.use(restifyPlugins.queryParser({
		mapParams: true
	}))
	server.use(restifyPlugins.bodyParser())

	restify.defaultResponseHeaders = data => {
	  this.header('Access-Control-Allow-Origin', '*')
	}


	server.listen(config.get('server.port'), () => {
	})
}

if(cluster.isMaster) {
	for(let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	process.exit();
} else {
	start();
}

module.exports.start = start;