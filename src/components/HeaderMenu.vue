<template>
  <div>
    <q-toolbar color="indigo-5">
      <q-btn
        flat
        dense
        round
        @click="toogleLeftDrawer"
        aria-label="Menu">
          <q-icon name="menu"/>
      </q-btn>
      <q-toolbar-title>
        X4Money
      </q-toolbar-title>
      <q-btn-group v-if="auth" align="rigth">
        <q-btn icon-right="input" label="Sign Out" @click="SignOut"/>
      </q-btn-group>
      <q-btn
        v-if="is_category && is_chart_view"
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
        v-if="is_category"
        icon="show_chart"
        to="/chart-view"
        label="График"
        exact
        slot="title"/>
      <q-route-tab
        v-if="is_category"
        icon="pie_chart"
        to="/pie-chart-view"
        exact
        label="Круговая диаграмма"
        slot="title"/>
    </q-tabs>
  </div>
</template>

<script>

export default {
  name: 'ComponentHeaderMenu',
  computed: {
    selected_category () {
      return this.$store.state.data.selected_category
    },
    is_chart_view () {
      return this.$route.path === '/chart-view' || this.$route.path === '/'
    },
    auth () {
      return this.$store.getters['data/isAuth']
    },
    is_category () {
      if (this.selected_category) {
        return Object.keys(this.selected_category).length !== 0
      }
    }
  },
  methods: {
    goToProfile () {
      this.$router.push('profile')
    },
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
<style>
.q-toolbar-title{
  font-size: 30px;
}
</style>
