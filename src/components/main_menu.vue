<template>
  <q-list>
    <q-item clickable tag="a" to="/capital">
      <q-item-section avatar>
        <q-icon color="primary" name="paid" />
      </q-item-section>
      <q-item-section>{{ $t('portfolio_capital') }}</q-item-section>
    </q-item>

    <q-item clickable tag="a" to="/dividends">
      <q-item-section avatar>
        <q-icon color="primary" name="space_dashboard" />
      </q-item-section>
      <q-item-section>{{ $t('dividends') }}</q-item-section>
    </q-item>

    <q-item clickable tag="a" to="/settings">
      <q-item-section avatar>
        <q-icon color="primary" name="settings" />
      </q-item-section>
      <q-item-section>{{ $t('settings') }}</q-item-section>
    </q-item>

    <q-item clickable tag="a" to="/about">
      <q-item-section avatar>
        <q-icon color="primary" name="info" />
      </q-item-section>
      <q-item-section>{{ $t('about_app') }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({})
</script>
