import request from 'superagent'

const API_VERSION = 'v1'

export default () => {
  const endpoint = `/${API_VERSION}/_resources`
  request.get(endpoint, (err, res) => {
    if (err) {
      console.log('Error fetching metadata at endpoint ' + endpoint)
    } else {
      window._resources = JSON.parse(res.text)
    }
  })
}
