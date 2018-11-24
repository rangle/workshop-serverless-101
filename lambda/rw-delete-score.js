const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = async (event) => {
	const params = {
            Key: {
                "username": {
                    S: event.username
                },
                "score": {
                    N: event.score
                }
            },
            TableName: "trex-scoreboard"
        }
	const deleteItemPromise = dynamodb.deleteItem(params).promise();
	const response = await deleteItemPromise.then(function(data) {
	    console.log(data);
	    return {statusCode: 200, body: "Success"};
	}).catch(function(err) {
	  console.log(err);
	  return {statusCode: 500, body: "Failed to delete score: " + err};
	});
	
	return response;
};

