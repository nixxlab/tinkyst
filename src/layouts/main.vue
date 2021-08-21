<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round :aria-label="$t('menu')" @click="toggleMenu" icon="menu" />

        <q-toolbar-title>
          {{ $t('app_name') }}
        </q-toolbar-title>

        <div>{{ $t('app_version') }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer bordered show-if-above class="bg-grey-1" v-model="menu_visibility">
      <main-menu/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  import MainMenu from 'components/main_menu.vue'

  export default defineComponent({
    components: {
      MainMenu
    },

    setup () {
      const menu_visibility = ref(false)

      function toggleMenu () {
        menu_visibility.value = !menu_visibility.value
      }

      return {
        menu_visibility,
        toggleMenu,
      }
    }
  })
</script>
