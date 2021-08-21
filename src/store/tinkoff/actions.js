import { api } from 'boot/axios'

// Get accounts and after that also get cash, securities and transactions history of every account
export async function get_accounts ({ commit }) {  
  let accounts = []

  let response_accounts = (await api.get('/user/accounts')).accounts
  for (var i in response_accounts) {
    const account = response_accounts[i]
    const id = account.brokerAccountId

    const type = {
      tinkoffiis: 'investment',
      tinkoff: 'spot',
    }[account.brokerAccountType.toLowerCase()]

    const currencies = (await api.get('/portfolio/currencies', { params: { brokerAccountId: id } })).currencies

    const operations = (await api.get('/operations', { params: { from: '2000-01-01T00:00:00+03:00', to: (new Date).toISOString(), brokerAccountId: id } })).operations

    const positions = (await api.get('/portfolio', { params: { brokerAccountId: id } })).positions

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

export function get_bonds ({ commit }) {
  return api.get('/market/bonds')
  .then(response => {
    commit('bonds', response.instruments)
    return response.instruments  
  })
}

export function get_currencies ({ commit }) {
  return api.get('/market/currencies')
  .then(response => {
    commit('currencies', response.instruments)
    return response.instruments  
  })
}

export function get_funds ({ commit }) {
  return api.get('/market/etfs')
  .then(response => {
    commit('funds', response.instruments)
    return response.instruments  
  })
}

export function get_shares ({ commit }) {
  return api.get('/market/stocks')
  .then(response => {
    commit('shares', response.instruments)
    return response.instruments  
  })
}
