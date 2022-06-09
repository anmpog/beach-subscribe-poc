const axios = require('axios')
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')



exports.handler = async function (event, context, callback) {
  // // // Step 3 - POST oauth/access_token // // //
  console.log('The postTweet function was hit.')
  let clientData = JSON.parse(event.body)

  // Tweet body
  const tweetBody = clientData.tweet

  // Keys from .env
  const keys = {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_KEY_SECRET,
  }

  // Tokens from auth flow
  const tokens = {
    key: clientData.accessToken,
    secret: clientData.accessTokenSecret,
  }

  try {
    const oauth = OAuth({
      consumer: {
        key: keys.consumerKey,
        secret: keys.consumerSecret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64')
      },
    })

    const twitterRequest = {
      url: `https://api.twitter.com/1.1/statuses/update.json?status=${encodeURIComponent(
        tweetBody,
      )}`,
      method: 'POST',
    }

    const authorization = oauth.authorize(twitterRequest, tokens)
    const authHeader = oauth.toHeader(authorization)

    const twitterResponse = await axios.post(
      twitterRequest.url,
      {},
      { headers: authHeader },
    )

    console.log('Twitter response: ', twitterResponse)
    return {
      statusCode: 200,
      body: twitterResponse,
    }
  } catch (err) {
    console.error('There was an error attempting to post your tweet: ', err)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'There was an error with the post tweet function',
      }),
    }
  }
}
