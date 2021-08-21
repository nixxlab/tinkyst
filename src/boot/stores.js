import { LocalStorage } from 'quasar'

// Setup store data from the LocalStorage at the boot time
export default ({ store }) => {
  [ 
    'accounts',
    'api_token',
    'bonds',
    'currencies',
    'funds',
    'shares'
  ].forEach(k => {
    store.commit('tinkoff/' + k, LocalStorage.getItem(k))
  })
}
  