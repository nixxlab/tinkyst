<template>
  <div class="bg-dark flex flex-center fullscreen q-pa-md text-center text-secondary">
    <div class="q-gutter-md">
      <div style="font-size: 10vh">
        {{ $t('error') }}
      </div>

      <div style="font-size: 3vh; opacity:.4">
        {{ $t('page_not_found') }}
      </div>

      <q-btn
        @click="$router.go(-1)"
        color="secondary"
        :label="$t('go_back')"
        size="lg"
        text-color="dark"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
