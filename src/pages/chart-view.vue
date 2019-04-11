<template>
  <q-page ref="chartView" padding>
    <div v-show="is_category">
      <q-select
        v-show="chart_data && filtered_results.length !== 0"
        v-model="selection"
        :options="select_options"/>
      <q-inner-loading :visible="!chart_data && filtered_results.length === 0">
        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
      </q-inner-loading>
      <Chart
        v-if="chart_data && filtered_results.length !== 0"
        :comparisons="comparisons"
        :filters="filters"
        :selected_product_feature_in_units="selected_product_feature_in_units"/>
      <div class="row" v-if="show_info">
        <q-page class="col-8" padding>
          <blockquote class="lime-6">
            <h6 class="uppercase q-mt-none">Oops!!</h6>
            <p>Вашему выбору соответствует  <b>0 товаров</b>.</p>
            <p>Попробуйте убрать один или несколько фильтров</p>
          </blockquote>
        </q-page>
      </div>
    </div>
    <div v-show="!is_category">
      <Index/>
    </div>
  </q-page>
</template>

<script>
import Chart from '../components/Chart'
import Index from '../pages/index'

export default {
  name: 'PageChartView',
  components: {
    Chart,
    Index
  },
  computed: {
    selected_category () {
      return this.$store.state.data.selected_category
    },
    is_category () {
      return Object.keys(this.$store.state.data.selected_category).length !== 0
    },
    filtered_results () {
      return this.$store.state.data.filtered_results
    },
    active_filters () {
      return this.$store.state.data.active_filters
    },
    products () {
      return this.$store.state.data.products
    },
    filters () {
      return this.$store.state.data.filters
    },
    select_options () {
      return this.$store.state.data.product_features_in_units
    },
    selected_product_feature_in_units () {
      return this.$store.state.data.selected_product_feature_in_units
    },
    selection: {
      get () { return this.$store.state.data.selected_product_feature_in_units.value },
      set (val) {
        let selectObj = this.select_options.find((item) => item.value === val)
        this.$store.dispatch('data/changeChartDataDueToTriggerProductFeatureInUnits', selectObj)
      }
    },
    comparisons () {
      return this.$store.state.data.comparisons
    },
    chart_data () {
      return this.comparisons.length !== 0 && this.select_options !== 0 && this.filters !== 0
    },
    show_load_gears () {
      return this.active_filters !== 0 && !this.chart_data
    },
    show_info () {
      return this.chart_data && this.filtered_results.length === 0
    }
  }
}
</script>
