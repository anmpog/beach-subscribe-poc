import React, { useState, useEffect, useRef } from 'react'
import { Box, Button, Flex } from 'theme-ui'
const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/hello`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/helrrlo`

const Tweet = ({ data }) => {
  return (
    <Box
      sx={{
        background: 'white',
        padding: '10px',
        my: '3px',
        borderRadius: '0.2rem',
      }}
    >
      {data}
    </Box>
  )
}

const IndexPage = () => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(false)

  const fetchTweets = async () => {
    setLoading(true)
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Tweets before setting data: ', tweets)
        setTweets((tweets) => [...tweets, data.data[0].text])
        console.log('Tweets after setting data: ', tweets)
      })
      .catch((error) => {
        console.log(
          'There was an error returning data from the netlify func: ',
          error,
        )
      })
  }

  useEffect(() => {
    if (!isMounted.current) {
      return
    } else {
      fetchTweets()
      setLoading(false)
    }
  }, [loading])

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
        <h2>Tweets</h2>
        <Box
          sx={{
            width: '100%',
            border: '1px solid lightblue',
            padding: '2rem',
            marginBottom: '25px',
          }}
        >
          {!tweets.length && <p>There are no tweets</p>}
          {tweets.length > 0 && tweets.map((tweet) => <Tweet data={tweet} />)}
        </Box>
        <Flex sx={{ width: '100%', justifyContent: 'center' }}>
          <Button sx={{ color: 'black' }} onClick={fetchTweets}>
            Fetch Tweet
          </Button>
        </Flex>
      </Box>
    </main>
  )
}

export default IndexPage
