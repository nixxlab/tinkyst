<template>
  <q-page class="column content-start fit items-start justify-start q-gutter-md q-pa-md" style="max-width: 1000px">
    <div class="text-h3">{{ $t('settings') }}</div>

    <q-input filled :error="settings_validation !== true" :error-message="settings_validation.toString()" :loading="api_token_verification === null && api_token_sent !== null" :label="$t('api_token')" style="width: 100%;" type="textarea" v-model="api_token" />
    
    <q-btn @click="update_settings" color="primary" :disable="settings_validation !== true" @keydown.enter="update_settings" :label="$t('update')" />

    <div style="width: 100%;" v-if="accounts">
      <q-separator/>

      <h5>{{ $t('data_loaded') }}</h5>

      <q-list bordered separator style="width: 100%;">
        <q-item v-if="accounts">
          <q-item-section>
            <q-item-label>{{ $t('accounts') }}</q-item-label>
            <q-item-label caption class="q-gutter-xs">
              <q-badge rounded color="secondary" :label="$t(account.type + '_account')" text-color="dark" v-for="account in accounts" v-bind:key="account.id" />
            </q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('currencies_market') }}</q-item-label>
            <q-item-label caption>
              {{ currencies ? currencies.length : 0 }} {{ $t('pc') }}
            </q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('shares_market') }}</q-item-label>
            <q-item-label caption>
              {{ shares ? shares.length : 0 }} {{ $t('pc') }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('bonds_market') }}</q-item-label>
            <q-item-label caption>
              {{ bonds ? bonds.length : 0 }} {{ $t('pc') }}
            </q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t('funds_market') }}</q-item-label>
            <q-item-label caption>
              {{ funds ? funds.length : 0 }} {{ $t('pc') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
  import { computed, defineComponent, ref } from 'vue';
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  export default defineComponent({
    setup () {
      const i18n = useI18n({ useScope: 'global' })
      const store = useStore()

      const accounts = ref(store.getters['tinkoff/accounts'])
      const api_token = ref(store.getters['tinkoff/api_token'])
      const api_token_sent = ref(null)
      const api_token_verification = ref(null)
      const bonds = ref(store.getters['tinkoff/bonds'])
      const currencies = ref(store.getters['tinkoff/currencies'])
      const funds = ref(store.getters['tinkoff/funds'])
      const shares = ref(store.getters['tinkoff/shares'])

      const settings_validation = computed(() => {
        if (!api_token.value) { return i18n.t('no_token') }
        else if (api_token.value.length < 80) { return i18n.t('wrong_token') }
        else if (api_token.value === api_token_sent.value && api_token_verification.value === false) { return i18n.t('wrong_token') }
        else { return true }
      })

      function update_settings () {
        store.commit('tinkoff/api_token', api_token.value)

        api_token_sent.value = api_token.value
        api_token_verification.value = null

        store.dispatch('tinkoff/get_accounts', { spinner: false }).then(_ => {
          accounts.value = store.getters['tinkoff/accounts']
        }).then(_ => {
          api_token_verification.value = true

          store.dispatch('tinkoff/get_bonds', { spinner: false }).then(_ => {
            bonds.value = store.getters['tinkoff/bonds']
          })

          store.dispatch('tinkoff/get_currencies', { spinner: false }).then(_ => {
            currencies.value = store.getters['tinkoff/currencies']
          })
          
          store.dispatch('tinkoff/get_funds', { spinner: false }).then(_ => {
            funds.value = store.getters['tinkoff/funds']
          })
          
          store.dispatch('tinkoff/get_shares', { spinner: false }).then(_ => {
            shares.value = store.getters['tinkoff/shares']
          })        
        }).catch(error => {
          api_token_verification.value = false
          accounts.value = null
          bonds.value = null
          currencies.value = null
          funds.value = null
          shares.value = null
          store.commit('tinkoff/clear')
        })
      }

      if (settings_validation.value === true) {
        if (accounts.value) {
          api_token_verification.value = true
        } else {
          update_settings()
        }
      }

      return { accounts, api_token, api_token_sent, api_token_verification, bonds, currencies, funds, settings_validation, shares, update_settings }
    }
  });
</script>
