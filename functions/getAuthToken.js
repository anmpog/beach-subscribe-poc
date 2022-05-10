const axios = require('axios')

exports.handler = async function (event, context, callback) {
  // Step 1 - POST oauth/request_token
  const authTokenUrl = `https://api.twitter.com/oauth/request_token?oauth_consumer_key=${process.env.TWITTER_API_KEY}&oauth_signature_method=HMAC-SHA1&&oauth_version=1.0&x_auth_access_type=write`
  try {
    const authToken = await axios({
      method: 'POST',
      url: authTokenUrl,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log(
      'The response from the requestAuthToken function: ',
      JSON.stringify(authToken.data),
    )
    return {
      statusCode: 200,
      body: JSON.stringify(authToken.data),
    }
  } catch (err) {
    console.error('There was an error in the requestAuthToken function: ', err)
  }
}
