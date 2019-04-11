<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { checkFilters, checkCategory, checkCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter } from './plugins/local-store.js'

export default {
  name: 'App',
  created () {
    checkCategory.call(this)
    checkFilters.call(this)
    checkCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter.call(this)
  }
}
</script>
