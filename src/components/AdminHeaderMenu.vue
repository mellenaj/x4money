<template>
  <div>
    <q-toolbar color="indigo-5">
      <q-toolbar-title>
        X4Money
      </q-toolbar-title>
      <q-btn-group v-if="auth" align="rigth">
        <q-btn icon-right="input" label="Sign Out" @click="SignOut"/>
      </q-btn-group>
      <q-btn
          v-if="selected_category && is_chart_view"
          flat
          dense
          round
          @click="toogleRightDrawer"
          aria-label="Menu">
            <q-icon name="menu"/>
      </q-btn>
    </q-toolbar>
    <q-tabs align="center" color="indigo-4">
      <q-route-tab
        icon="exit_to_app"
        to="/"
        exact
        label="Exit to app"
        slot="title"/>
      <q-route-tab
        icon="face"
        to="/admin/"
        exact
        label="Profile"
        slot="title"/>
      <q-route-tab
        icon="filter_list"
        to="/admin/new-filter"
        label="New Filter"
        exact
        slot="title"/>
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: 'ComponentAdminHeaderMenu',
  computed: {
    selected_category () {
      return this.$store.state.data.selected_category
    },
    is_chart_view () {
      return this.$route.path === '/chart-view'
    },
    auth () {
      return this.$store.getters['data/isAuth']
    }
  },
  methods: {
    getDataBySelectedCategory () {
      this.$store.dispatch('data/getDataByCategory', this.selected_category)
    },
    toogleLeftDrawer () {
      this.$emit('toogleLeft')
    },
    toogleRightDrawer () {
      this.$emit('toogleRight')
    },
    signIn () {
      this.$router.push('sign-in')
    }
  }
}
</script>
