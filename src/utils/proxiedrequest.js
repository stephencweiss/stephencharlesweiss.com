/**
 * This PROXY_URL is an AWS Lamda function that is used to avoid CORS limitations of client side requests
 */
const PROXY_URL =
  'https://0yglv2r21e.execute-api.us-east-2.amazonaws.com/default/xkcd_request_comics'

const proxiedRequest = (url, options = {}) => {
  if (!url) return
  console.log({PROXY_URL})
  return fetch(`${PROXY_URL}?url=${url}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
    .then(resp => resp)
    .catch(error => console.error(`oh no --> `, error))
}

const proxiedGet = url => proxiedRequest(url)

module.exports = { proxiedGet, proxiedRequest }
