<template>
  <div>
    <q-collapsible v-model="open">
      <template slot="header">
          <q-chip color="primary" small class="q-mr-sm">
            <slot name="title">Custom header</slot>
          </q-chip>
      </template>
      <!-- <q-toggle
        color="tertiary"
        v-model="checked"
        checked-icon="add_circle"
        unchecked-icon="remove_circle"
        @input="toggleGroupType"/> -->
      <div>
        <q-option-group
          :color="checkbox_color"
          :type="type_option_group"
          v-model="group"
          @input="triggerFilter"
          :options="options"/>
      </div>
    </q-collapsible>
  </div>
</template>

<script>
import { setCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter } from '../plugins/local-store.js'
export default {
  name: 'ComponentFiltersCheckboxBlock',
  props: {
    'values': {
      type: Array,
      required: true
    },
    'name': {
      type: String,
      required: true
    },
    'desc': {
      type: String,
      required: true
    },
    'active_filter': {
      type: Object
    },
    'products_sum': {
      type: Object
    },
    'current_checkbox_filter': {
      type: Object
    },
    'products_sum_of_current_checkbox_filter': {
      type: Object
    }
  },
  data () {
    return {
      checkbox_color: 'secondary',
      open: false,
      group: [],
      type_option_group: 'checkbox',
      checked: true,
      options: []
    }
  },
  watch: {
    products_sum (val) {
      if (val) {
        this.updateCheckboxGroupComponentOptions()
        setCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter(this.current_checkbox_filter, this.products_sum_of_current_checkbox_filter)
      }
    },
    active_filter (val) {
      if (!val) {
        this.group = []
      }
    }
  },
  methods: {
    toggleGroupType () {
      this.group = []
      this.checkbox_color = (this.checked) ? 'secondary' : 'negative'
      this.switchCheckedIcon()
      this.$emit('resetCheckboxGroupType', { desc: this.desc })
    },
    triggerFilter () {
      // let group = (this.checked) ? this.group : [this.group[this.group.length - 1]]
      let filter = {
        name: this.name,
        values: this.group, // group,
        desc: this.desc,
        filter_type: this.type_option_group,
        add: this.checked,
        color: this.checkbox_color
      }
      this.$emit('getFilter', filter)
    },
    checkActiveFiltersFromStorage () {
      if (this.active_filter) {
        this.group = this.active_filter.values
        this.checkbox_color = this.active_filter.color
        this.checked = this.active_filter.add
        this.open = true
      }
    },
    generateValuesForCheckboxGroupComponent () {
      this.values.map(i => {
        this.options.push({
          label: (this.products_sum[this.desc]) ? `${i}  (${this.products_sum[this.desc][i] || 0})` : i,
          name: this.desc,
          value: i,
          disable: (this.products_sum[this.desc] && this.products_sum[this.desc][i] === undefined),
          checkedIcon: (this.checkbox_color === 'secondary') ? 'check_box' : 'indeterminate_check_box'
        })
      })
    },
    switchCheckedIcon () {
      this.options.forEach((el) => {
        el.checkedIcon = (el.checkedIcon === 'check_box') ? 'indeterminate_check_box' : 'check_box'
      })
    },
    updateCheckboxGroupComponentOptions () {
      if (this.products_sum[this.desc] === undefined) return
      this.options.forEach((el) => {
        el.label = `${el.value}  (${this.products_sum[this.desc][el.value] || 0})`
        el.disable = (this.products_sum[this.desc][el.value] === undefined)
        el.value = el.value
      })
    }
  },
  created () {
    this.checkActiveFiltersFromStorage()
    this.generateValuesForCheckboxGroupComponent()
  }
}
</script>
