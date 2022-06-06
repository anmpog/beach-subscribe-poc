import React, { useState, useEffect } from 'react'
import { Box, Button, Flex } from 'theme-ui'

const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/getAuthToken`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/getAuthToken`

const postTweetUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/postTweet`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/postTweet`

const notifyUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/notify`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/notify`

const IndexPage = () => {
  const [authedStatus, setAuthedStatus] = useState(false)
  const [broadcastInput, setBroadcastInput] = useState('')
  const broadcastChannels = ['safebeachday', 'text', 'twitter']
  const selectedChannels = broadcastChannels.map((channel) => {
    return { channelName: channel, channelSelected: false }
  })
  const [selectedBroadcastChannels, setSelectedBroadcastChannels] = useState(
    selectedChannels,
  )

  // Handle initial Twitter token request
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

  // Control tweet text input
  const handleInputChange = (event) => {
    setBroadcastInput(event)
  }

  // Control checkbox inputs
  const handleChannelSelect = (selectedChannelName) => {
    const updatedChannelSelection = selectedBroadcastChannels.map((channel) => {
      if (channel.channelName === selectedChannelName) {
        return { ...channel, channelSelected: !channel.channelSelected }
      }

      return channel
    })

    setSelectedBroadcastChannels(updatedChannelSelection)
  }

  // Post tweet w/ postTweet endpoint
  const handlePostTweet = async (event) => {
    event.preventDefault()
    let twitterAccessToken = localStorage.getItem('oauthAccessToken')
    let twitterAccessTokenSecret = localStorage.getItem(
      'oauthAccessTokenSecret',
    )
    let tweetBody = broadcastInput
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

  const handleNotify = async () => {
    const res = await fetch(notifyUrl)
    const data = await res.json()
    console.log('Data from notify route: ', data)
  }

  // Check if correct tokens exist to use twitter Api and control UI
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
          width: '600px',
          flexDirection: 'column',
          border: '2px solid royalblue',
          borderRadius: '0.2rem',
          margin: '0 auto',
          height: '800px',
          marginTop: '50px',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            height: '75px',
            width: '100%',
            backgroundColor: '#5477d4',
          }}
        >
          <h2 style={{ color: 'white' }}>Broadcast Safety Message</h2>
          <Button
            sx={{
              borderRadius: '100%',
              padding: '10px',
              margin: '0px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              height: '10px',
              width: '10px',
              bg: 'gray',
            }}
            onClick={() => console.log('Close dialogue button clicked')}
          >
            x
          </Button>
        </Flex>
        <Box
          sx={{
            width: '100%',
            border: '1px solid lightblue',
            padding: '1rem',
            marginBottom: '25px',
            flex: '1 0 auto',
          }}
        >
          <Flex
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Flex
              as="form"
              onSubmit={(event) => {
                event.preventDefault()
                // console.log('The checkboxes: ', checkedState)
                console.log('The text area state: ', broadcastInput)
                console.log('The checkbox sate: ', selectedBroadcastChannels)
              }}
              sx={{
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <label
                htmlFor="tweet-body"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px',
                }}
              >
                Safety Message:
                <textarea
                  name="tweet-body"
                  maxLength="280"
                  type="text"
                  value={broadcastInput}
                  placeholder={'Add text'}
                  onChange={(event) => handleInputChange(event.target.value)}
                  style={{
                    marginTop: '10px',
                    borderRadius: '0.5rem',
                    height: '350px',
                    border: '2px solid lightgray',
                    resize: 'none',
                    padding: '0.5rem',
                    fontFamily: 'sans-serif',
                    marginBottom: '0px',
                  }}
                />
              </label>
              <fieldset
                style={{
                  marginTop: '25px',
                  width: '100%',
                  flexWrap: 'wrap',
                  border: 'none',
                }}
              >
                <legend>Choose Broadcast Channels:</legend>
                {selectedBroadcastChannels.map((channel, index) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        key={index}
                        type="checkbox"
                        id={channel.channelName}
                        name={channel.channelName}
                        value={channel.channelName}
                        checked={channel.channelSelected}
                        onChange={() =>
                          handleChannelSelect(channel.channelName)
                        }
                      />
                      <label htmlFor={channel.channelName}>
                        {channel.channelName}
                      </label>
                    </div>
                  )
                })}
              </fieldset>
              <Flex
                sx={{
                  width: '100%',
                  justifyContent: 'flex-end',
                  marginTop: '25px',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Button variant="naked">Cancel</Button>
                <Button
                  type="submit"
                  variant="secondary"
                  sx={{ width: '125px' }}
                >
                  Preview
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </main>
  )
}

export default IndexPage
