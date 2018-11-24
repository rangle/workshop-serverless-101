const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

var today = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    return yyyy + '-' + mm + '-' + dd;
}

exports.handler = async (event) => {
	const params = {
	    Item: {
	        "username": {
                S: event.name
            },
            "score": {
                N: event.score,
            },
            "date": {
                S: today()
            }
	   },
	   TableName: "trex-scoreboard"
	};
	const putItemPromise = dynamodb.putItem(params).promise();
	const response = await putItemPromise.then(function(data) {
	    console.log(data);
	    return {statusCode: 200, body: "Success"};
	}).catch(function(err) {
		console.log(err);
		return {statusCode: 500, body: "Failed to save score: " + err};
	});
	
	return response;
};

