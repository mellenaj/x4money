<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header>
      <AdminHeaderMenu />
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AdminHeaderMenu from '../components/AdminHeaderMenu.vue'

export default {
  name: 'LayoutAdmin',
  components: {
    AdminHeaderMenu
  }
}
</script>
