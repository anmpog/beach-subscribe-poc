import React, { useState } from 'react'
import { Box } from 'theme-ui'

const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/getAccessToken`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/getAccessToken`

const IndexPage = () => {
  const [authedStatus, setAuthedStatus] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const oauthToken = params.get('oauth_token')
  const oauthVerifier = params.get('oauth_verifier')

  const getAccessToken = async () => {
    try {
      let res = await fetch(dataUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: oauthToken,
          verifier: oauthVerifier,
        }),
      })
      let data = await res.json()
      console.log('Response from get access tokens: ', data)
      const params = new URLSearchParams(data)
      const oauthAccessToken = params.get('oauth_token')
      const oauthAccessTokenSecret = params.get('oauth_token_secret')
      localStorage.setItem('oauthAccessToken', oauthAccessToken)
      localStorage.setItem('oauthAccessTokenSecret', oauthAccessTokenSecret)
      setAuthedStatus(true)
      window.close()
    } catch (err) {
      console.error(
        'There was an error fetching the authorization token: ',
        err,
      )
    }
  }

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
        <h2>Beach Subscribe Twitter POC (Authed)</h2>
        <p>Auth verifier token: {oauthVerifier}</p>
        <p>Auth token: {oauthToken}</p>
        {authedStatus && <h2>Succesfully Authenticated</h2>}
        <button onClick={getAccessToken}>Click For Access Token</button>
      </Box>
    </main>
  )
}

export default IndexPage
