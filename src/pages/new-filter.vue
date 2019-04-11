<template>
  <q-page padding>
    <div class="row justify-center gutter-xs">
      <div class="col-4">
        <q-select
          v-model="filter.category"
          float-label="Select category"
          @input="changeAdminSelectedCategory"
          :options="product_categories"/>
        <q-select
          v-model="filter.type"
          float-label="Select filter type"
          radio
          :options="types"/>
        <q-select
          v-model="filter.product_property_id"
          float-label="Select filter name"
          :options="product_properties"/>
        <q-input v-model="filter.order" float-label="Order" placeholder="Order" />
        <q-btn class="q-my-md" @click="createFilter" label="Create Filter" />
      </div>
      <div class="col-7 offset-1">
        <q-table
          v-if="admin_selected_category"
          :data="admin_products"
          :columns="columns"
          row-key="name"/>
        <div v-else>
          <q-chat-message
            name="Creator"
            avatar="statics/linux-avatar.png"
            :text="['Here you will see a table display of products of the selected category']"
            size="11"
            bg-color="warning"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageNewFilter',
  data () {
    return {
      filter: {
        product_property_id: '1',
        category_product_type_id: '1',
        product_property_unit_type_id: '1',
        order: '10'
      },
      types: [
        {
          label: 'Checkbox',
          value: 'checkbox'
        },
        {
          label: 'Slider',
          value: 'slider'
        }
      ]
    }
  },
  computed: {
    product_categories () {
      return this.$store.state.data.product_categories.map((item) => {
        return {
          label: item[Object.keys(item)],
          value: Object.keys(item)[0]
        }
      })
    },
    product_properties () {
      let names = []
      this.$store.state.data.admin_product_table_columns_header.forEach((item) => {
        if (item.name !== 'id' && item.name !== 'name') {
          names.push({
            label: item.label,
            value: item.name
          })
        }
      })
      return names
    },
    admin_selected_category () {
      return this.$store.state.data.admin_selected_category
    },
    columns () {
      return this.$store.state.data.admin_product_table_columns_header
    },
    admin_products () {
      return this.$store.state.data.admin_products
    }
  },
  methods: {
    fetchFilterCategories () {
      this.$store.dispatch('data/getProductCategories')
    },
    changeAdminSelectedCategory () {
      if (this.filter.category !== this.admin_selected_category) {
        this.$store.dispatch('data/getAdminProductsByAdminCategory', this.filter.category)
      }
    },
    createFilter () {
      this.$store.dispatch('data/createNewFilter', this.filter)
    }
  },
  created () {
    this.fetchFilterCategories()
  }
}
</script>
