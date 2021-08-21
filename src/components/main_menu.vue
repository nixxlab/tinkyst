<template>
  <q-list>
    <q-item clickable tag="a" to="/settings">
      <q-item-section avatar>
        <q-icon color="primary" name="settings" />
      </q-item-section>
      <q-item-section>Настройки</q-item-section>
    </q-item>

    <q-item clickable tag="a" to="/about">
      <q-item-section avatar>
        <q-icon color="primary" name="info" />
      </q-item-section>
      <q-item-section>О проекте</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({})
</script>
