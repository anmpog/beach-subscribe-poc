const axios = require('axios')

exports.handler = function (event, context, callback) {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      })
    })
    .catch(error => {
      callback(error, {
        statusCode: 418,
        body: JSON.stringify("There was an error requesting data.")
      })
    })
}
