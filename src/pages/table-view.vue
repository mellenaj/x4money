<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12">
        <q-table v-if="selected_category"
          :data="filtered_results"
          :columns="columns"
          row-key="name"/>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageTableView',
  computed: {
    columns () {
      return this.$store.state.data.product_table_columns_header
    },
    selected_category () {
      return this.$store.state.data.selected_category
    },
    filtered_results () {
      return this.$store.state.data.filtered_results
    }
  }
}
</script>
