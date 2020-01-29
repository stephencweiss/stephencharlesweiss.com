/**
 * This works by using a demo `cors-anywhere` server hosted on heroku.
 * All requests are routed through that server
 * TODO: Migrate to a server hosted by me so that I don't use up the bandwidth on someone else's hosted server
 */
const PROXY_URL = 'https://cors-anywhere.herokuapp.com'

const proxiedRequest = (url, options = {}) =>
  fetch(`${PROXY_URL}/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'wololo',
    },
  })
    .then(resp => resp)
    .catch(error => console.error(`oh no --> `, error))

const proxiedGet = url => proxiedRequest(url)

module.exports = { proxiedGet, proxiedRequest}