import fetch from 'node-fetch'

exports.handler = async function (event, context, callback) {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      })
    })
    .catch((error) => {
      callback((error) => {
        console.log('There was an error fetching the data: ', error)
      })
    })
}
