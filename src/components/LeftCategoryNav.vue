<template>
  <div>
    <q-list class="left-categories-nav" highlight link no-border sparse separator>
      <q-list-header class="q-title">Категории</q-list-header>
      <q-item v-for="(value, index) in product_categories" :key="index">
        <div
          :class="{ active_category: value.id == selected_category.id }"
          class="category__inner-wrp"
          @click="selectCategory(value)">
            <q-item-side right icon="folder" />
            <q-item-main :label="value.desc" />
        </div>
      </q-item>
      <q-item v-if="auth" @click.native="goToAdmin">
        <q-item-side right icon="settings" />
        <q-item-main label="Admin panel" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { setCategory, removeActiveFiltersDueToChangeCategory } from '../plugins/local-store.js'

export default {
  name: 'ComponentLeftCategoryNav',
  computed: {
    selected_category () {
      return this.$store.state.data.selected_category
    },
    product_categories () {
      return this.$store.state.data.product_categories
    },
    auth () {
      return this.$store.getters['data/isAuth']
    }
  },
  methods: {
    goToAdmin () {
      this.$router.push('/admin')
    },
    selectCategory (category) {
      removeActiveFiltersDueToChangeCategory()
      this.$store.commit('data/clearData')
      this.$store.dispatch('data/getDataByCategory', category)
      setCategory(category)
      if (this.$route.path === '/') {
        this.$router.replace('chart-view')
      }
    },
    fetchFilterCategories () {
      this.$store.dispatch('data/getProductCategories')
    }
  },
  created () {
    this.fetchFilterCategories()
  }
}
</script>
<style lang="stylus">
@import '../css/themes/common.variables.styl'
.left-categories-nav{
  padding-top: 2px;
  .q-title{
    padding: 13px;
  }
}
.category__inner-wrp{
  display: inherit;
}
.q-item.q-item-division {
  padding: 0;
  .category__inner-wrp {
    padding: 20px 16px;
    width: 100%;
  }
}
.active_category{
  background-color: $warning;
  width: 100%;
  color: #ffffff;
}
</style>
