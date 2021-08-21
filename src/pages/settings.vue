<template>
  <q-page class="column content-start fit items-start justify-start q-gutter-md q-pa-md" style="max-width: 1000px">
    <div class="text-h3">{{ $t('settings') }}</div>
    <q-input filled :label="$t('api_token')" :rules="[ is_valid ]" style="width: 100%;" type="textarea" v-model="api_token" />
    <q-btn @click="submit" color="primary" :disable="!is_valid" @keydown.enter="submit" :label="$t('save')" />
  </q-page>
</template>

<script>
  import { computed, defineComponent, ref } from 'vue';
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router';

  export default defineComponent({
    setup () {
      const i18n = useI18n({ useScope: 'global' })
      const store = useStore()
      const router = useRouter()

      const api_token = ref(store.getters['tinkoff/api_token'])

      const is_valid = computed(() => {
        return validate() === true
      })

      function validate() {
        if (api_token.value.length < 80) { return i18n.t('wrong_token') }
        else { return true }
      }

      function submit() {
        store.commit('tinkoff/api_token', api_token.value)
        router.push('/')
      }

      return { api_token, is_valid, submit }
    }
  });
</script>
