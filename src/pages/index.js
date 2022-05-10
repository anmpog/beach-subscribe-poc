import React, { useState, useEffect } from 'react'
import { Box, Button, Flex } from 'theme-ui'

const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/getAuthToken`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/getAuthToken`

const postTweetUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/postTweet`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/postTweet`

const IndexPage = () => {
  const [authedStatus, setAuthedStatus] = useState(false)
  const [tweetInput, setTweetInput] = useState('')

  // Handle initial token request
  const handleAuthButtonClick = async () => {
    try {
      const res = await fetch(dataUrl)
      const data = await res.json()
      const params = new URLSearchParams(data)
      const authToken = params.get('oauth_token')
      console.log('the authToken:', authToken)
      window.open(
        `https://api.twitter.com/oauth/authorize?oauth_token=${authToken}`,
        '_blank',
        'location=yes, popup=yes, width=650, height=800',
      )
    } catch (err) {
      console.error(
        'There was an error starting the authentication process: ',
        err,
      )
    }
  }

  // Control input
  const handleInputChange = (event) => {
    setTweetInput(event)
  }

  // Post tweet w/ postTweet endpoint
  const handlePostTweet = async (event) => {
    event.preventDefault()
    let twitterAccessToken = localStorage.getItem('oauthAccessToken')
    let twitterAccessTokenSecret = localStorage.getItem(
      'oauthAccessTokenSecret',
    )
    let tweetBody = tweetInput
    const res = await fetch(postTweetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: twitterAccessToken,
        accessTokenSecret: twitterAccessTokenSecret,
        tweet: tweetBody,
      }),
    })
    let data = await res.json()
    console.log('Data that came back from Post Tweet: ', data)
  }

  // Check if correct tokens exist to use twitter Api
  useEffect(() => {
    let twitterAccessToken = localStorage.getItem('oauthAccessToken')
    let twitterAccessTokenSecret = localStorage.getItem(
      'oauthAccessTokenSecret',
    )

    if (twitterAccessToken && twitterAccessTokenSecret) {
      setAuthedStatus(true)
    }
    return
  }, [])

  return (
    <main>
      <Box
        sx={{
          width: '800px',
          border: '2px solid royalblue',
          borderRadius: '0.2rem',
          margin: '0 auto',
          height: '800px',
          backgroundColor: 'cornflowerblue',
          padding: '2rem',
        }}
      >
        <h2>Beach Subscribe Twitter POC</h2>
        <Box
          sx={{
            width: '100%',
            border: '1px solid lightblue',
            padding: '2rem',
            marginBottom: '25px',
          }}
        >
          <Flex sx={{ width: '100%', justifyContent: 'center' }}>
            {authedStatus && (
              <Flex sx={{ flexDirection: 'column' }}>
                <h2>You're authed. You can post a tweet.</h2>
                <Box as="form" onSubmit={(event) => handlePostTweet(event)}>
                  <label htmlFor="tweet-body">
                    Enter a tweet:
                    <input
                      name="tweet-body"
                      maxLength="280"
                      type="text"
                      value={tweetInput}
                      onChange={(event) =>
                        handleInputChange(event.target.value)
                      }
                    />
                  </label>
                  <p>{tweetInput}</p>
                  <input type="submit" value="Send Tweet" />
                </Box>
              </Flex>
            )}
            {!authedStatus && (
              <Button sx={{ color: 'black' }} onClick={handleAuthButtonClick}>
                Auth as anmpog
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </main>
  )
}

export default IndexPage
