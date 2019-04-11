<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header>
      <HeaderMenu @toogleLeft="toogleLeftDrawerOpen" @toogleRight="toogleRightDrawerOpen"/>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      v-model="left_drawer"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <LeftCategoryNav />
    </q-layout-drawer>
    <q-layout-drawer
      v-if="is_category"
      side="right"
      v-model="right_drawer"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <RightSideFilters />
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
import LeftCategoryNav from '../components/LeftCategoryNav.vue'
import RightSideFilters from '../components/RightSideFilters.vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      left_drawer_open: this.$q.platform.is.desktop,
      right_drawer_open: this.$q.platform.is.desktop
    }
  },
  components: {
    HeaderMenu,
    LeftCategoryNav,
    RightSideFilters
  },
  computed: {
    is_category () {
      return Object.keys(this.$store.state.data.selected_category).length !== 0
    },
    left_drawer: {
      get () {
        return this.left_drawer_open
      },
      set (val) {
        this.left_drawer_open = val
      }
    },
    right_drawer: {
      get () {
        return this.right_drawer_open && (this.$route.path === '/chart-view' || this.$route.path === '/')
      },
      set (val) {
        this.right_drawer_open = val
      }
    }
  },
  methods: {
    toogleLeftDrawerOpen () {
      this.left_drawer_open = !this.left_drawer_open
      if (this.$q.platform.is.desktop && (this.$q.screen.width > 992)) {
        this.$root.$emit('redrawChartDueToLeftDrawer', this.left_drawer)
        this.$root.$emit('redrawPieChartDueToLeftDrawer', this.left_drawer)
      }
    },
    toogleRightDrawerOpen () {
      this.right_drawer_open = !this.right_drawer_open
      if (this.$q.platform.is.desktop && (this.$q.screen.width > 992)) {
        this.$root.$emit('redrawChartDueToRightDrawer', this.right_drawer)
      }
    }
  }
}
</script>
