const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

function compare(a,b) {
  if (a.score > b.score)
    return -1;
  if (a.score < b.score)
    return 1;
  return 0;
}

exports.handler = async (event) => {
    const type = event.type;
    if (type === 'all') {
        const params = {
            TableName: 'trex-scoreboard'
        };
        
        const scanPromise = dynamodb.scan(params).promise();
        const response = await scanPromise.then(function(data) {
            console.log(data);
            const items = data.Items.map(
                (dataField) => {
                    return {score: parseInt(dataField.score.N), date: dataField.date.S, username: dataField.username.S};
                });
            items.sort(compare);
            return {statusCode: 200, body: items.slice(0, 5)};
        }).catch(function(err) {
            console.log(err);
            return {statusCode: 500, body: "Failed to get scores: " + err}
        });
        
        return response;
    } else if ( type === 'me') {
        const params = {
            TableName: 'trex-scoreboard',
            KeyConditionExpression: 'username = :username',
            Limit: 5,
            ScanIndexForward: false,    // true = ascending, false = descending
            ExpressionAttributeValues: {
                ':username': {S: event.username}
            }
        };
        
        const queryPromise = dynamodb.query(params).promise();
        const response = await queryPromise.then(function(data) {
            console.log(data);
            const items = data.Items.map(
                (dataField) => {
                    return {score: dataField.score.N, date: dataField.date.S, username: dataField.username.S};
                });
            return {statusCode: 200, body: items};
        }).catch(function(err) {
            console.log(err);
            return {statusCode: 500, body: "Failed to get me score: " + err};
        });
        
        return response;
    } 
    else {
        return {statusCode: 400, body: "Bad request type: " + type};
    }
};

