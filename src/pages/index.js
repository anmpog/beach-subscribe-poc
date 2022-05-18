import React, { useState, useEffect } from 'react'
import { Box, Button, Flex } from 'theme-ui'
import MagicBell, {
  FloatingNotificationInbox,
} from '@magicbell/magicbell-react'

const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/getAuthToken`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/getAuthToken`

const postTweetUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/postTweet`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/postTweet`

const magicBellApiKey = process.env.MAGIC_BELL_API_KEY
console.log('Api key for magic bell: ', magicBellApiKey)

console.log('Gatsby stage: ', process.env.GATSBY_STAGE)
console.log('Twitter API: ', process.env.TWITTER_API_KEY)

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
      <Flex
        sx={{
          width: '800px',
          flexDirection: 'column',
          border: '2px solid royalblue',
          borderRadius: '0.2rem',
          margin: '0 auto',
          height: '800px',
          backgroundColor: 'cornflowerblue',
          padding: '0 2rem',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <h2>Beach Subscribe Twitter POC</h2>
          <h3>{authedStatus ? 'Authorized' : 'Not Authorized'}</h3>
        </Flex>
        <Box
          sx={{
            width: '100%',
            border: '1px solid lightblue',
            padding: '2rem',
            marginBottom: '25px',
            flex: '1 0 auto',
          }}
        >
          <Flex
            as="nav"
            sx={{
              width: '100%',
              justifyContent: 'flex-end',
              border: '2px solid red',
              py: '15px',
              background: 'lightgray',
            }}
          >
            <MagicBell
              apiKey={magicBellApiKey}
              userExternalId={'poglianoster@gmail.com'}
            >
              {(props) => (
                <FloatingNotificationInbox
                  width={400}
                  height={500}
                  {...props}
                />
              )}
            </MagicBell>
          </Flex>
          <Flex
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            {authedStatus && (
              <Flex
                as="form"
                onSubmit={(event) => handlePostTweet(event)}
                sx={{
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                  height: '33.33%',
                }}
              >
                <label
                  htmlFor="tweet-body"
                  style={{
                    padding: '15px 0px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  Enter a tweet:
                  <input
                    name="tweet-body"
                    maxLength="280"
                    type="text"
                    value={tweetInput}
                    onChange={(event) => handleInputChange(event.target.value)}
                    style={{
                      marginTop: '10px',
                      borderRadius: '0.2rem',
                    }}
                  />
                </label>
                <input type="submit" value="Send Tweet!" />
              </Flex>
            )}
            {!authedStatus && (
              <Button sx={{ color: 'black' }} onClick={handleAuthButtonClick}>
                Auth as anmpog
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </main>
  )
}

export default IndexPage
