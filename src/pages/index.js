import * as React from 'react'
import { Box, Button, Flex } from 'theme-ui'

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: '#663399',
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: '#8954A8',
  fontWeight: 'bold',
  fontSize: 16,
  verticalAlign: '5%',
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: 'none',
  marginBottom: 24,
}

const descriptionStyle = {
  color: '#232129',
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: 'Documentation',
  url: 'https://www.gatsbyjs.com/docs/',
  color: '#8954A8',
}

const badgeStyle = {
  color: '#fff',
  backgroundColor: '#088413',
  border: '1px solid #088413',
  fontSize: 11,
  fontWeight: 'bold',
  letterSpacing: 1,
  borderRadius: 4,
  padding: '4px 6px',
  display: 'inline-block',
  position: 'relative',
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

// markup
const IndexPage = () => {
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
          <Button sx={{ color: 'black' }}>CLICK ME</Button>
        </Flex>
      </Box>
    </main>
  )
}

export default IndexPage
