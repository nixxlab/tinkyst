import { api } from 'boot/axios'

// Get accounts and after that also get cash, securities and transactions history of every account
export async function get_accounts ({ commit }, options) {  
  let accounts = []

  let response_accounts = (await api.get('/user/accounts', options)).accounts
  for (var i in response_accounts) {
    const account = response_accounts[i]
    const id = account.brokerAccountId

    const type = {
      tinkoffiis: 'investment',
      tinkoff: 'spot',
    }[account.brokerAccountType.toLowerCase()]

    const currencies = (await api.get('/portfolio/currencies', Object.assign({params: { brokerAccountId: id }}, options) )).currencies

    const operations = (await api.get('/operations', Object.assign({ params: { from: '2000-01-01T00:00:00+03:00', to: (new Date).toISOString(), brokerAccountId: id } }, options))).operations

    const positions = (await api.get('/portfolio', Object.assign({ params: { brokerAccountId: id } }, options))).positions

    accounts.push({
      currencies: currencies,
      id: id,
      operations: operations,
      positions: positions,
      type: type,
    })
  }
  
  commit('accounts', accounts)
  return accounts  
}

export function get_bonds ({ commit }, options) {
  return api.get('/market/bonds', options)
  .then(response => {
    commit('bonds', response.instruments)
    return response.instruments  
  })
}

export function get_currencies ({ commit }, options) {
  return api.get('/market/currencies', options)
  .then(response => {
    commit('currencies', response.instruments)
    return response.instruments  
  })
}

export function get_eur_price ({ commit }, options) {
  return api.get('/market/orderbook', {params: {figi: 'BBG0013HJJ31', depth: 1}, ...options})
  .then(response => {
    commit('eur_price', response.lastPrice)
    return response.lastPrice  
  })
}

export function get_usd_price ({ commit }, options) {
  return api.get('/market/orderbook', {params: {figi: 'BBG0013HGFT4', depth: 1}, ...options})
  .then(response => {
    commit('usd_price', response.lastPrice)
    return response.lastPrice  
  })
}

export function get_funds ({ commit }, options) {
  return api.get('/market/etfs', options)
  .then(response => {
    commit('funds', response.instruments)
    return response.instruments  
  })
}

export function get_shares ({ commit }, options) {
  return api.get('/market/stocks', options)
  .then(response => {
    commit('shares', response.instruments)
    return response.instruments  
  })
}
