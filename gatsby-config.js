require('dotenv').config()

console.log('Gatsby Env Details: ', process.env.NODE_ENV)

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: ['gatsby-plugin-theme-ui', 'gatsby-plugin-netlify'],
}
