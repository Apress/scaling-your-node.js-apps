// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create CloudWatch service object
var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});


module.exports = {
	report: (ns, metric, dimensions, cb) => {

		var params = {
		  MetricData: [
		    {
		      MetricName: metric.name.toUpperCase(),
		      Dimensions: [ dimensions ],
		      Unit: metric.unit, 
		      Value: metric.value
		    },
		  ],
		  Namespace: ns
		};

		cw.putMetricData(params, cb);
	}	
}

