const axios = require('axios')

exports.handler = async function (event, context, callback) {
  // Step 3 - POST oauth/access_token
  let tokens = JSON.parse(event.body)
  const accessTokenUrl = `https://api.twitter.com/oauth/access_token?oauth_token=${tokens.token}&oauth_verifier=${tokens.verifier}`

  try {
    const accessToken = await axios({
      method: 'POST',
      url: accessTokenUrl,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log(
      'The response from the requestAuthToken function: ',
      JSON.stringify(accessToken.data),
    )
    return {
      statusCode: 200,
      body: JSON.stringify(accessToken.data),
    }
  } catch (err) {
    console.error('There was an error in the getAccessToken function: ', err)
  }
}
