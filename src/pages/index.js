import * as React from 'react'
import { Box, Button, Flex } from 'theme-ui'

// markup
const IndexPage = () => {
  const dataUrl = `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/hello`
  const clickHandler = () => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => console.log(data))
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
        <Box
          sx={{ width: '90%', border: '1px solid lightblue', padding: '2rem' }}
        >
          THIS IS WHERE TWEETS WILL BE
        </Box>
        <Flex sx={{ width: '100%' }}>
          <Button sx={{ color: 'black' }} onClick={clickHandler}>
            CLICK ME
          </Button>
        </Flex>
      </Box>
    </main>
  )
}

export default IndexPage
