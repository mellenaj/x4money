<template>
  <q-page ref="pieChartView" padding>
    <div v-show="is_category">
      <q-inner-loading :visible="show_load_gears">
        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
      </q-inner-loading>
      <div v-if="!show_load_gears">
        <q-select
          v-show="select_options.length !== 0"
          v-model="selection"
          :options="select_options"/>
        <PieChart v-if="pie_chart_data" :series="series"/>
      </div>
    </div>
    <div v-show="!is_category">
      <Index/>
    </div>
  </q-page>
</template>

<script>
import PieChart from '../components/PieChart'
import Index from '../pages/index'
export default {
  name: 'PagePieChartView',
  components: {
    PieChart,
    Index
  },
  computed: {
    is_category () {
      return Object.keys(this.$store.state.data.selected_category).length !== 0
    },
    select_options () {
      return this.$store.state.data.product_features
    },
    series_for_pie_chart () {
      return this.$store.state.data.series_for_pie_chart
    },
    show_load_gears () {
      return Object.keys(this.$store.state.data.series_for_pie_chart).length === 0
    },
    selection: {
      get () { return this.$store.state.data.selected_product_feature.value },
      set (val) {
        let selectObj = this.select_options.find((item) => item.value === val)
        this.$store.dispatch('data/changePieChartDataDueToTriggerProductFeature', selectObj)
      }
    },
    series () {
      return this.series_for_pie_chart[this.selection]
    },
    pie_chart_data () {
      if (this.series) {
        return Object.keys(this.series).length !== 0
      }
    }
  }
}
</script>
