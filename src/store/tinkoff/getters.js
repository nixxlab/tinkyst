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

export function eur_price (state) {
  return LocalStorage.getItem('eur_price')
}

export function funds (state) {
  return LocalStorage.getItem('funds')
}

export function shares (state) {
  return LocalStorage.getItem('shares')
}

export function usd_price (state) {
  return LocalStorage.getItem('usd_price')
}

