<template>
  <q-page class="column fit q-gutter-md q-pa-md">
    <div class="text-h3">{{ $t('portfolio_capital') }}</div>

    <q-markup-table flat>
      <tbody>
        <tr>
          <td></td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            Активы в
            {{ currency }}
          </td>
        </tr>
        <tr>
          <td>Наличка</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.cash) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>Акции</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.shares) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>Облигации</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.bonds) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>Фонды</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.funds) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Всего</td>
          <td align="right" style="font-weight: bold;" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.cash + balance.shares + balance.bonds + balance.funds) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div>
      <div class="text-h6">
        Оценочная стоимость портфеля
      </div>
      <q-markup-table flat>
        <tbody>
          <tr>
            <td>В пересчёте на Рубль РФ</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_rub) }} ₽</td>
          </tr>
          <tr>
            <td>В пересчёте на Доллар США</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_usd) }} $</td>
          </tr>
          <tr>
            <td>В пересчёте на Евро</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_eur) }} €</td>
          </tr>
        </tbody>
      </q-markup-table>

    </div>



  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const currencies = [
  {label: '€', value: 'EUR', name: 'Евро'},
  {label: '₽', value: 'RUB', name: 'Рубль'}, 
  {label: '$', value: 'USD', name: 'Доллар США'}
]

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const accounts = store.getters['tinkoff/accounts']
    const eur_price = store.getters['tinkoff/eur_price']
    const usd_price = store.getters['tinkoff/usd_price']

    const balance_in_eur = ref(0)
    const balance_in_rub = ref(0)
    const balance_in_usd = ref(0)
    const balances = ref({})
    const number_format = Intl.NumberFormat('ru-RU')
    
    if (!accounts) {
      router.push('/settings')
    } else {
      accounts.forEach(account => {
        account.currencies.forEach(r => {
          if (!balances.value[r.currency] && r.balance != 0) { balances.value[r.currency] = { bonds: 0, cash: 0, funds: 0, shares: 0 } }
          if (r.balance != 0) { balances.value[r.currency].cash += r.balance }
        })

        account.positions.forEach(r => {
          if (!balances.value[r.averagePositionPrice.currency]) { balances.value[r.averagePositionPrice.currency] = { bonds: 0, cash: 0, funds: 0, shares: 0 } }

          switch(r.instrumentType) {
          case 'Bond':
            balances.value[r.averagePositionPrice.currency].bonds += r.averagePositionPrice.value * r.balance + r.expectedYield.value
          break
          case 'Currency':
          break
          case 'Etf':
            balances.value[r.averagePositionPrice.currency].funds += r.averagePositionPrice.value * r.balance + r.expectedYield.value
          break
          case 'Stock':
            balances.value[r.averagePositionPrice.currency].shares += r.averagePositionPrice.value * r.balance + r.expectedYield.value
          break
          }
        }) 
      })

      for (var currency in balances.value) {
        let balance = balances.value[currency]
        let eur_exchange_rate = currency == 'EUR' ? 1 : (currency == 'USD' ? usd_price / eur_price : 1 / eur_price)
        let rub_exchange_rate = currency == 'EUR' ? eur_price : (currency == 'USD' ? usd_price : 1)
        let usd_exchange_rate = currency == 'EUR' ? eur_price / usd_price : (currency == 'USD' ? 1 : 1 / usd_price)
        balance_in_eur.value += eur_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)
        balance_in_rub.value += rub_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)
        balance_in_usd.value += usd_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)
      }
    }

    return { balance_in_eur, balance_in_rub, balance_in_usd, balances, currencies, eur_price, number_format, usd_price }
  }
})
</script>
