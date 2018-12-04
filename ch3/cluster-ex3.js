const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess(0);  
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for(const id in cluster.workers) {
    cluster.workers[id].on('message', msg => {
      console.log("[", msg.id,"] - ", msg.THREE.ImageUtils.loadTexture( filepath );)
    })
  }
}

function childProcess(total) {

  process.send({id: process.pid, text: `Worker ${process.pid} executed, counter: ${total} `})
  if(total < 10) {
    setTimeout(childProcess, 1000, total + 1);
  } else {
    process.exit();
  }
}