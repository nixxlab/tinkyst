<template>
  <q-page class="column fit q-gutter-md q-pa-md" style="max-width: 500px">
    <div class="text-h3">{{ $t('dividends') }}</div>

    <div v-for="(rows, year) in dividends_by_months" :key="year">
      <q-markup-table dense>
        <thead>
          <tr>
            <td colspan="2" style="font-size: 1.5em; font-weight: bold; text-align: center;">
              {{ year }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="month in months" :key="month">
            <td>{{ month.label }}</td>
            <td style="text-align: right;">{{ dividends_formatted(rows[month.value]) }}</td>
          </tr>
        </tbody>
        <thead style="font-weight: bold;">
          <tr>
            <td>{{ $t('total') }}</td>
            <td style="text-align: right;">{{ dividends_formatted(dividends_by_years[year]) }}</td>
          </tr>
        </thead>
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

const months = [
  { label: 'Январь', value: 1 },
  { label: 'Февраль', value: 2 },
  { label: 'Март', value: 3 },
  { label: 'Апрель', value: 4 },
  { label: 'Май', value: 5 },
  { label: 'Июнь', value: 6 },
  { label: 'Июль', value: 7 },
  { label: 'Август', value: 8 },
  { label: 'Сентябрь', value: 9 },
  { label: 'Октябрь', value: 10 },
  { label: 'Ноябрь', value: 11 },
  { label: 'Декабрь', value: 12 },
]

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    const accounts = store.getters['tinkoff/accounts']

    const number_format = Intl.NumberFormat('ru-RU')

    const dividends_by_months = ref({})
    const dividends_by_years = ref({})
    
    if (!accounts) {
      router.push('/settings')
    } else {
      accounts.forEach(account => {
        account.operations.forEach(operation => {
          if (operation.status == 'Done' && operation.operationType === 'Dividend') {
            const date = new Date(operation.date)
            const year = date.getFullYear()
            const month = date.getMonth()

            if (!dividends_by_months.value[year]) {
              dividends_by_months.value[year] = {}
            }

            if (!dividends_by_months.value[year][month]) {
              dividends_by_months.value[year][month] = {}
            }

            if (!dividends_by_months.value[year][month][operation.currency]) {
              dividends_by_months.value[year][month][operation.currency] = 0
            }

            dividends_by_months.value[year][month][operation.currency] += operation.payment

            if (!dividends_by_years.value[year]) {
              dividends_by_years.value[year] = {}
            }

            if (!dividends_by_years.value[year][operation.currency]) {
              dividends_by_years.value[year][operation.currency] = 0
            }

            dividends_by_years.value[year][operation.currency] += operation.payment
          }
        })
      })
    }

    function dividends_formatted (row) {
      if (row) {
        return ['EUR', 'RUB', 'USD'].map(currency => {
          return row[currency] ? (number_format.format(row[currency]) + ' ' + currencies.find(o => o.value === currency).label) : null
        }).filter(o => { return o }).join(' + ')
      } else {
        return ''
      }
    }

    return { accounts, currencies, dividends_by_months, dividends_by_years, dividends_formatted, months, number_format }
  }
})
</script>
