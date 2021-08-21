import { LocalStorage } from "quasar"

export function accounts (state) {
  return LocalStorage.getItem('accounts')
}

export function api_token (state) {
  return LocalStorage.getItem('api_token')
}

export function bonds (state) {
  return LocalStorage.getItem('bonds')
}

export function currencies (state) {
  return LocalStorage.getItem('currencies')
}

export function funds (state) {
  return LocalStorage.getItem('funds')
}

export function shares (state) {
  return LocalStorage.getItem('shares')
}

