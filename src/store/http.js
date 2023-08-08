import axios from 'axios'
import get from 'lodash/get'

let apiVersion = '1.1'

if (process.env && process.env.VUE_APP_STANDALONE_BUNDLE === 'true') {
  let axiosDefaults = require('axios/lib/defaults')
  axiosDefaults.baseURL = '/api'
}

/**
 * Set up all axios requests to contain the necessary account_id/portal version headers
 */
axios.interceptors.request.use((config) => {

  if (config.skipHeaders) {
    return config
  }
  config.headers = {
    ...(config.headers || {}),
    'Accept': 'application/json',
    'X-Accept-Version': apiVersion
  }
  if (window.localStorage.token && window.localStorage.token !== 'undefined' && !config.headers['Authorization']) {
    config.headers['Authorization'] = 'Bearer ' + window.localStorage.token
  }
  console.log(config);
  return config
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  const store = require('./index').default
  if (get(error, 'status') + '' === '401') {
    // Log Out
    return
  }
  console.log('http error', store, error)

  store.commit('setGlobalError', get(error, 'response.data') || get(error, 'data') || error.message)
  throw error
})
