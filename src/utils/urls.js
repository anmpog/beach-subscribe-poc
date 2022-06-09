export const dataUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/getAuthToken`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/getAuthToken`

export const postTweetUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/postTweet`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/postTweet`

export const notifyUrl = process.env.GATSBY_STAGE
  ? `.netlify/functions/notify`
  : `https://charming-snickerdoodle-12baa5.netlify.app/.netlify/functions/notify`
