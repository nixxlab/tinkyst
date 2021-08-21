import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

export function accounts (state, value) {
  state.accounts = value
  LocalStorage.set('accounts', value)
}

export function api_token (state, value) {
  state.api_token = value
  LocalStorage.set('api_token', value)
  api.defaults.headers.common.Authorization = value ? ('Bearer ' + value) : ''
}

export function bonds (state, value) {
  state.bonds = value
  LocalStorage.set('bonds', value)
}

export function currencies (state, value) {
  state.currencies = value
  LocalStorage.set('currencies', value)
}

export function funds (state, value) {
  state.funds = value
  LocalStorage.set('funds', value)
}

export function shares (state, value) {
  state.shares = value
  LocalStorage.set('shares', value)
}

