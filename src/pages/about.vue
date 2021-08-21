<template>
  <q-page class="column fit items-start justify-start q-gutter-lg q-pa-lg">
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        О проекте

        <div style="font-size: 1.25rem; line-height: 1.25rem; padding-top: 1rem;">Тинкист - бесплатное приложение с открытым исходным кодом для анализа персонального инвестиционного портфеля в сервисе Тинькофф Инвестиции.</div>
      </q-timeline-entry>

      <q-timeline-entry icon="paid" subtitle="Приложение позволяет пользователю использовать OPEN API сервиса Тинькофф Инвестиции для получения данных о собственном инвестиционном портфеле">
        <q-btn outline @click="openURL('https://tinkoffcreditsystems.github.io/invest-openapi/')" padding="md" size="md">
          Читать описание OPEN API
        </q-btn>
      </q-timeline-entry>

      <q-timeline-entry avatar="~assets/quasar.svg" subtitle="Разработка проекта ведётся на основе фрэймворков VueJS и Quasar с использованием широко распространённого языка JavaScript">
        <q-btn outline @click="openURL('https://quasar.dev/')" padding="md" size="md">
          Смотреть документацию Quasar
        </q-btn>
      </q-timeline-entry>

      <q-timeline-entry avatar="~assets/github-octocat.png" subtitle="Кодовая база проекта полностью открыта и доступна в репозитории GitHub под лицензией GNU GPL v3">
        <q-btn outline @click="openURL('https://github.com/nixxlab/tinkyst')" padding="md" size="md">
          Перейдите на страницу проекта, чтобы узнать больше и помочь проекту
        </q-btn>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
  import { openURL } from 'quasar'
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup () {
      return { openURL }
    }
  });
</script>
