<template>
  <q-page class="column fit q-gutter-md q-pa-md" style="max-width: 1000px">
    <div class="text-h4">{{ $t('portfolio_capital') }}</div>

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
          <td>{{ $t('cash') }}</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.cash) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>{{ $t('shares') }}</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.shares) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>{{ $t('bonds') }}</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.bonds) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td>{{ $t('funds') }}</td>
          <td align="right" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.funds) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Всего</td>
          <td align="right" style="font-weight: bold;" v-for="(balance, currency) in balances" v-bind:key="currency">
            {{ number_format.format(balance.total) }}
            {{ currencies.find(o => o.value === currency).label }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <canvas ref="chart_canvas" style="width: 300px"></canvas>

    <div>
      <div class="text-h6">
        Оценочная стоимость портфеля
      </div>
      <q-markup-table flat>
        <tbody>
          <tr>
            <td>В пересчёте на Рубль РФ</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_rub.total) }} ₽</td>
          </tr>
          <tr>
            <td>В пересчёте на Доллар США</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_usd.total) }} $</td>
          </tr>
          <tr>
            <td>В пересчёте на Евро</td>
            <td align="right" style="font-weight: bold;">{{ number_format.format(balance_in_eur.total) }} €</td>
          </tr>
        </tbody>
      </q-markup-table>

    </div>



  </q-page>
</template>

<script>
  import Chart from 'chart.js/auto'
  import { defineComponent, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const currencies = [
    {label: '€', value: 'EUR', name: 'Евро'},
    {label: '₽', value: 'RUB', name: 'Рубль'}, 
    {label: '$', value: 'USD', name: 'Доллар США'}
  ]

  export default defineComponent({
    setup () {
      const i18n = useI18n({ useScope: 'global' })
      const router = useRouter()
      const store = useStore()

      const accounts = store.getters['tinkoff/accounts']
      const eur_price = store.getters['tinkoff/eur_price']
      const usd_price = store.getters['tinkoff/usd_price']

      const balance_in_eur = ref({ bonds: 0, cash: 0, funds: 0, shares: 0, total: 0 })
      const balance_in_rub = ref({ bonds: 0, cash: 0, funds: 0, shares: 0, total: 0 })
      const balance_in_usd = ref({ bonds: 0, cash: 0, funds: 0, shares: 0, total: 0 })
      const balances = ref({})
      const number_format = Intl.NumberFormat('ru-RU')

      const chart_canvas = ref(null)
      let chart_data = {}
      let chart_object = null

      if (!accounts) {
        router.push('/settings')
      } else {
        accounts.forEach(account => {
          account.currencies.forEach(r => {
            if (!balances.value[r.currency] && r.balance != 0) { balances.value[r.currency] = { bonds: 0, cash: 0, funds: 0, shares: 0, total: 0 } }
            if (r.balance != 0) { balances.value[r.currency].cash += r.balance }
          })

          account.positions.forEach(r => {
            if (!balances.value[r.averagePositionPrice.currency]) { balances.value[r.averagePositionPrice.currency] = { bonds: 0, cash: 0, funds: 0, shares: 0, total: 0 } }
            
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

            balances.value[r.averagePositionPrice.currency].total += r.averagePositionPrice.value * r.balance + r.expectedYield.value
          }) 
        })

        for (var currency in balances.value) {
          let balance = balances.value[currency]
          let eur_exchange_rate = currency == 'EUR' ? 1 : (currency == 'USD' ? usd_price / eur_price : 1 / eur_price)
          let rub_exchange_rate = currency == 'EUR' ? eur_price : (currency == 'USD' ? usd_price : 1)
          let usd_exchange_rate = currency == 'EUR' ? eur_price / usd_price : (currency == 'USD' ? 1 : 1 / usd_price)

          balance_in_eur.value.bonds += eur_exchange_rate * balance.bonds
          balance_in_eur.value.cash += eur_exchange_rate * balance.cash
          balance_in_eur.value.funds += eur_exchange_rate * balance.funds
          balance_in_eur.value.shares += eur_exchange_rate * balance.shares
          balance_in_eur.value.total += eur_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)

          balance_in_rub.value.bonds += rub_exchange_rate * balance.bonds
          balance_in_rub.value.cash += rub_exchange_rate * balance.cash
          balance_in_rub.value.funds += rub_exchange_rate * balance.funds
          balance_in_rub.value.shares += rub_exchange_rate * balance.shares
          balance_in_rub.value.total += rub_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)

          balance_in_usd.value.bonds += usd_exchange_rate * balance.bonds
          balance_in_usd.value.cash += usd_exchange_rate * balance.cash
          balance_in_usd.value.funds += usd_exchange_rate * balance.funds
          balance_in_usd.value.shares += usd_exchange_rate * balance.shares
          balance_in_usd.value.total += usd_exchange_rate * (balance.cash + balance.shares + balance.bonds + balance.funds)
        }
      }

      onMounted(() => {
        chart_data = {
          labels: [ i18n.t('bonds'), i18n.t('cash'), i18n.t('funds'), i18n.t('shares') ],
          datasets: [
            {
              data: [
                balance_in_usd.value.bonds,
                balance_in_usd.value.cash,
                balance_in_usd.value.funds,
                balance_in_usd.value.shares,
              ],
              backgroundColor: ['#537bc4', '#acc236', '#f53794', '#8549ba'],
            }
          ]
        }

        draw_chart()
      })

      function draw_chart () {
        Chart.defaults.color = 'rgba(0, 0, 0, 1)'
        Chart.defaults.font.size = 12

        if (chart_object) { chart_object.destroy() }

        chart_object = new Chart(chart_canvas.value, {
          type: 'pie',
          data: chart_data,
          options: {
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  footer: (list) => {
                    return [
                      i18n.t('weight') + ': ' + Math.round(100 * list[0].parsed / balance_in_usd.value.total) + '%',
                      i18n.t('usd_value_equivalent') + ': $' + number_format.format(parseInt(list[0].parsed)),
                    ].join("\n")
                  },
                  label: (o) => {
                    return ''
                  },
                  title: (list) => {
                    return list[0].label
                  }
                }
              },
            },
            responsive: false,
            title: {
              display: true,
              text: 'Распределение активов в портфеле',
            }
          }
        }) // new Chart
      }

      return { balance_in_eur, balance_in_rub, balance_in_usd, balances, chart_canvas, currencies, eur_price, number_format, usd_price }
    }
  })
</script>
