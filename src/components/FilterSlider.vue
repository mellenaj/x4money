<template>
  <div>
     <q-chip color="grey-4 text-dark justify-center" small class="q-mr-sm q-mt-sm">
      <slot name="title">Custom header</slot>
    </q-chip>
    <q-range
      :value="range_values"
      @change="val => { range_values = val, triggerFilter(val) }"
      label-always
      :min="values.min"
      :max="values.max"/>
  </div>
</template>

<script>
export default {
  name: 'ComponentFilterSlider',
  props: {
    'values': {
      type: Object,
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
    'units': {
      type: String
    }
  },
  data () {
    return {
      range_values: {
        min: this.active_filter.min,
        max: this.active_filter.max
      }
    }
  },
  watch: {
    active_filter (val) {
      this.$set(this.range_values, 'min', val['min'])
      this.$set(this.range_values, 'max', val['max'])
    }
  },
  methods: {
    triggerFilter (val) {
      let filter = (this.values.min === val.min && this.values.max === val.max)
        ? {name: this.name, reset: true, desc: this.desc, filter_type: 'slider'}
        : {name: this.name, min: val.min, max: val.max, desc: this.desc, filter_type: 'slider'}
      this.$emit('getFilter', filter)
    }
  }
}
</script>
