<template>
  <q-tabs color="warning">
    <q-tab default label="Фильтры" slot="title" name="Filters" icon="filter_list" />
    <q-tab slot="title" label="Выбранные" name="Selected" icon="check_circle" />
    <q-tab-pane name="Filters" :keep-alive="true">
      <div class="q-pa-md">
        <div v-for="(item, index) in filters" :key="index">
          <div v-if="item.filter_type == 'slider'">
            <FilterSlider
              v-if="item.values"
              :name="item.name"
              :desc="item.desc"
              :units="item.units"
              :values="item.values"
              :active_filter="(active_filters_from_storage[item.name]) ? active_filters_from_storage[item.name] : {min: item.values.min, max: item.values.max}"
              @getFilter="getFilter">
              <span class="text-center" slot="title">{{item.name}}</span>
            </FilterSlider>
          </div>
          <div v-if="item.filter_type == 'checkbox'">
            <FiltersCheckboxBlock
              :values="item.values"
              :name="item.name"
              :desc="item.desc"
              :products_sum = "products_sum"
              :current_checkbox_filter = "current_checkbox_filter"
              :products_sum_of_current_checkbox_filter = "products_sum_of_current_checkbox_filter"
              :active_filter="active_filters_from_storage[item.name] || null"
              @getFilter="getFilter"
              @resetCheckboxGroupType="resetCheckboxGroupType">
              <span slot="title">{{item.name}}</span>
            </FiltersCheckboxBlock>
          </div>
        </div>
      </div>
    </q-tab-pane>
    <q-tab-pane name="Selected">
      <div v-if="active_filters.length">
        <div class="filter" v-for="(item, index) in active_filters" :key="index">
          <div v-if="item.filter_type === 'slider'">
            <span class="filter-name" @click="removeActiveFilter(item.desc)">
              {{item.name}} <q-icon  size="22px" color="negative" name="remove_circle"></q-icon>
            </span>
          </div>
          <div class="filter" v-if="item.filter_type === 'checkbox'">
            <span class="filter-name">{{item.name}}</span>
            <div v-for="(val, index) in item.values" :key="index">
              <span @click="removeCheckboxFilterValue(item.desc, val, item)">
                <i class="filter-name-values"> {{val}}</i> <q-icon  size="22px" color="negative" name="remove_circle"></q-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Нет выбраных фильтров</p>
      </div>
    </q-tab-pane>
  </q-tabs>
</template>

<script>
import FilterSlider from './FilterSlider.vue'
import FiltersCheckboxBlock from './FiltersCheckboxBlock.vue'
import { setFilters } from '../plugins/local-store.js'

export default {
  name: 'ComponentRightSideFilters',
  components: {
    FilterSlider,
    FiltersCheckboxBlock
  },
  computed: {
    filters () {
      return this.$store.state.data.filters
    },
    products_sum () {
      return this.$store.state.data.products_sum
    },
    active_filters () {
      return this.$store.state.data.active_filters
    },
    current_checkbox_filter () {
      return this.$store.state.data.current_checkbox_filter
    },
    products_sum_of_current_checkbox_filter () {
      return this.$store.state.data.products_sum_of_current_checkbox_filter
    },
    active_filters_from_storage () {
      let filters = {}
      this.active_filters.forEach((f) => {
        if (f.filter_type === 'checkbox') {
          filters[f.name] = { values: f.values, color: f.color, add: f.add }
        }
        if (f.filter_type === 'slider') {
          filters[f.name] = { min: f.min, max: f.max }
        }
      })
      return filters
    }
  },
  methods: {
    getFilter (filter) {
      this.$store.dispatch('data/dataChangesDueToTriggerFilter', filter)
      setFilters(this.active_filters)
    },
    removeActiveFilter (name) {
      this.$store.dispatch('data/dataChangesDueToRemoveFilter', name)
      setFilters(this.active_filters)
    },
    resetCheckboxGroupType (filter) {
      this.$store.dispatch('data/dataChangesDueToToggleCkeckboxGroupType', filter)
      setFilters(this.active_filters)
    },
    removeCheckboxFilterValue (name, value, item) {
      if (item.values.length === 1) {
        this.$store.dispatch('data/dataChangesDueToRemoveFilter', name)
      } else {
        this.$store.dispatch('data/dataChangesDueToRemoveValueFromCheckboxFilter', {'filter_name': name, 'removable_filter_value': value})
      }
      setFilters(this.active_filters)
    }
  }
}
</script>

<style>
.filter {
  padding: 3px 0;
}
.filter-name{
  text-transform: uppercase;
  font-weight: bold
}
.filter-name-values{
  font-style: normal;
}
.q-tab-pane{
  border: none !important;
}
</style>
