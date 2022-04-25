const axios = require('axios')
const token = process.env.TWITTER_API_BEARER_TOKEN
const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

exports.handler = async function (event, context, callback) {
  var config = {
    method: 'get',
    url: 'https://api.twitter.com/2/tweets?ids=2244994945',
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie:
        'guest_id=v1%3A162377817197282362; personalization_id="v1_zff9K6eccpx9/aVCvgIIhQ=="',
    },
  }

  const result = axios(config)
    .then((res) => {
      console.log(JSON.stringify(res.data))
      return { statusCode: 200, body: JSON.stringify(res.data)}
    })
    .catch(function (error) {
      return {
        statusCode: 422,
        body: `Error: ${error}`,
      }
    })

  return result
}
