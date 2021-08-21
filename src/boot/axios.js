import axios from 'axios'
import { Loading, LocalStorage, Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api-invest.tinkoff.ru/openapi' })

export default boot(({ app, router, store }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  api.interceptors.request.use(function (params) {
    Loading.show()
    return params
  })

  api.interceptors.response.use(function (response) {
    Loading.hide()

    // Every Tinkoff API response has "status" column which we can use for a common logic
    if (response.data.status.toLowerCase() == 'ok') {
      return response.data.payload
    } else {
      return Promise.reject(response)
    }
  }, function (error) {
    Loading.hide()

    switch (error.response ? error.response.status : null) {
    case null:
      router.push('/settings')
    break
    case 401:
      router.push('/settings')
    break
    case 404:
      router.push('/error/404')
    break  
    default:
      Notify.create({ color: 'negative', icon: 'report_problem', message: (error.response ? error.response.status : ''), position: 'bottom' })  
    }

    return Promise.reject(error)
  })

  // Load api_token from LocalStorage
  const api_token = LocalStorage.getItem('api_token')

  // Set authorization token to all API request headers
  if (api_token) {
    api.defaults.headers.common.Authorization = api_token ? ('Bearer ' + api_token) : ''
  }
})

export { api }
