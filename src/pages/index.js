import React, { useState, useEffect } from 'react'
import { Box, Button, Flex } from 'theme-ui'
import { dataUrl, postTweetUrl, notifyUrl } from '../utils/urls'

const IndexPage = () => {
  // Hard-coding broadcast channels, but envision that these would come from some other source/config file
  const broadcastChannels = ['safebeachday', 'text', 'twitter']

  // Setting state values w/ hooks where appropriate
  const [authedStatus, setAuthedStatus] = useState(false)
  const [broadcastTitle, setBroadcastTitle] = useState('')

  // *REVIEW* PublicDashboard.js (post public bulletin function) should cover functionality of the actual text inputs, will need a title field as existing UI
  // does not have a title field.
  const [broadcastBody, setBroadcastBody] = useState('')
  // *REVIEW* // 

  // *REVIEW* Will need to add checkbox inputs to existing UI
  const [selectedBroadcastChannels, setSelectedBroadcastChannels] = useState(
    broadcastChannels.map((channel) => {
      return { channelName: channel, channelSelected: false }
    }),
  )
  // *REVIEW //

  // // // Twitter Related Functions // // //
  // Initiate twitter auth flow
  const initiateTwitterAuthFlow = async () => {
    try {
      const res = await fetch(n )
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

  // Post tweet w/ postTweet endpoint
  const handlePostTweet = async () => {
    // event.preventDefault()
    let twitterAccessToken = localStorage.getItem('oauthAccessToken')
    let twitterAccessTokenSecret = localStorage.getItem(
      'oauthAccessTokenSecret',
    )

    let tweetBody = broadcastTitle

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

  // // // Control form inputs // // //
  // Handle title input change
  const handleBroadcastTitleChange = (event) => {
    setBroadcastTitle(event)
  }

  // Handle body input change
  const handleBroadcastBodyChange = (event) => {
    setBroadcastBody(event)
  }

  // Control checkbox inputs
  const handleChannelSelect = (selectedChannelName) => {
    const updatedChannelSelection = selectedBroadcastChannels.map((channel) => {
      if (channel.channelName === selectedChannelName) {
        // Initiate twitter auth flow
        if (selectedChannelName === 'twitter' && !authedStatus) {
          initiateTwitterAuthFlow()
        }

        return { ...channel, channelSelected: !channel.channelSelected }
      }

      return channel
    })

    setSelectedBroadcastChannels(updatedChannelSelection)
  }

  // Handle form reset
  const handleFormReset = () => {
    setBroadcastTitle('')
    setBroadcastBody('')
    let defaultChannelSelections = selectedBroadcastChannels.map((channel) => {
      return { ...channel, channelSelected: false }
    })

    setSelectedBroadcastChannels(defaultChannelSelections)
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    let channelsToSend = selectedBroadcastChannels.filter((channel) => {
      if (channel.channelSelected) {
        return channel
      }
      return
    })

    if (channelsToSend.filter(channel => channel.channelName === 'twitter')) {
      handlePostTweet()
    }

    // let notificationData = {
    //   broadcastTitle,
    //   broadcastBody,
    //   channelsToSend,
    // }

    // const res = await fetch(notifyUrl, {
    //   method: 'POST',
    //   body: JSON.stringify(notificationData),
    // })

    // console.log('The res from the notify function: ', res)
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
              onSubmit={(event) => handleSubmit(event)}
              sx={{
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <label
                htmlFor="notification-title"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px',
                  marginBottom: '25px',
                }}
              >
                Safety Message Title:
                <textarea
                  name="notification-title"
                  maxLength="280"
                  type="text"
                  value={broadcastTitle}
                  placeholder={'Add a title'}
                  onChange={(event) =>
                    handleBroadcastTitleChange(event.target.value)
                  }
                  style={{
                    marginTop: '10px',
                    borderRadius: '0.5rem',
                    border: '2px solid lightgray',
                    resize: 'none',
                    padding: '0.5rem',
                    fontFamily: 'sans-serif',
                    marginBottom: '0px',
                  }}
                />
              </label>
              <label
                htmlFor="notification-body"
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px',
                }}
              >
                Safety Message Body:
                <textarea
                  name="notification-body"
                  maxLength="280"
                  type="text"
                  value={broadcastBody}
                  placeholder={'Add a body'}
                  onChange={(event) =>
                    handleBroadcastBodyChange(event.target.value)
                  }
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
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
                      {channel.channelName === 'twitter' && (
                        <p
                          style={{
                            fontSize: '0.75rem',
                            fontStyle: 'italic',
                            marginBottom: '0px',
                            marginLeft: '10px',
                          }}
                        >
                          {authedStatus
                            ? '(Authenticated)'
                            : '(Not authenticated)'}
                        </p>
                      )}
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
                <Button variant="naked" onClick={handleFormReset}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  sx={{ width: '125px' }}
                >
                  Submit
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
