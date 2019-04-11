function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const generateComparisons = (state, payload) => {
  if (state.filtered_results.length === 0) return
  let comparisons = state.filters.find(i => i.desc === 'manufacturer').values
  let keysItem = Object.keys(state.filtered_results[0])
  // eslint-disable-next-line indent
      comparisons = comparisons.map(i => { return { name: i, data: [], marker: { symbol: 'circle' } } })
  state.filtered_results.map(item => {
    let obj = {}
    let x = +(parseInt(item[payload.axis.x]) / parseInt(item[payload.axis.y])).toPrecision(4)
    let index = comparisons.findIndex(i => i.name === item.manufacturer)

    obj.y = parseInt(item[payload.axis.y])
    if (x === Infinity) {
      obj.x = 1
    } else {
      obj.x = +(parseInt(item[payload.axis.x]) / parseInt(item[payload.axis.y])).toPrecision(4)
    }
    keysItem.forEach(key => {
      if (obj[key] === undefined && item[key] !== null) {
        obj[key] = item[key]
      }
    })
    if (index !== -1) {
      comparisons[index].data.push(obj)
    }
  })
  state.comparisons = comparisons
}

export const generateComparisons1 = (state, payload) => {
  if (state.filtered_results.length === 0) return
  let comparisons = []
  let keysItem = Object.keys(state.filtered_results[0])
  state.filtered_results.map(item => {
    let obj = {}
    obj.y = parseInt(item[payload.axis.y])
    obj.x = +(parseInt(item[payload.axis.x]) / parseInt(item[payload.axis.y])).toPrecision(4)
    keysItem.forEach(key => {
      if (obj[key] === undefined && item[key] !== null) {
        obj[key] = item[key]
      }
    })
    comparisons.push(obj)
  })
  state.comparisons = comparisons
}

export const generateTableColumnsHeader = (state, payload) => {
  let columns = []
  let keysArr = (payload.admin) ? state.admin_products[0] : state.products[0]
  Object.keys(keysArr)
    .forEach((item) => {
      columns.push(
        {
          name: item,
          required: true,
          label: capitalizeFirstLetter(item.split('_').join(' ')),
          align: 'left',
          field: item,
          sortable: true
        })
    })
  if (payload.admin) {
    state.admin_product_table_columns_header = columns
  } else {
    state.product_table_columns_header = columns
  }
}
export const clearAdminData = (state) => {
  state.user = {}
  state.admin_product_table_columns_header = []
  state.admin_products = []
  state.admin_selected_category = []
}

export const generateFilteredResults = (state) => {
  if (state.active_filters.length === 0) {
    state.filtered_results = state.products.slice()
    return
  }
  let result = []
  state.products.map((product) => {
    let check
    function filterProductsByPropertyNameAndNumericalRange (filter) {
      if (filter.filter_type === 'checkbox') {
        let index
        if (filter.add) {
          index = filter.values.findIndex(i => i === product[filter.desc])
        } else {
          index = filter.values.findIndex(i => i !== product[filter.desc])
        }
        if (index !== -1) {
          return true
        }
      }
      if (filter.filter_type === 'slider') {
        if (parseInt(product[filter.desc]) >= filter.min && parseInt(product[filter.desc]) <= filter.max) {
          return true
        }
      }
      return false
    }
    check = state.active_filters.every(filterProductsByPropertyNameAndNumericalRange)
    if (check) {
      result.push(product)
    }
  })
  state.filtered_results = result
}
    
export const generateProductFeaturesInUnits = (state) => {
  let productFeatures = []
  if (!state.filters || state.filters.length === 0) {
    state.product_features_in_units = productFeatures
    return
  }
  state.filters.forEach(i => {
    if (i.filter_type === 'slider' && i.desc !== 'low_price') {
      productFeatures.push({
        value: i.desc,
        label: i.name,
        units: i.units
      })
    }
  })
  state.product_features_in_units = productFeatures
}
export const generateProductFeatures = (state) => {
  let productFeatures = []
  if (!state.filters || state.filters.length === 0) {
    state.product_features = productFeatures
    return
  }
  state.filters.forEach(i => {
    if (i.filter_type === 'checkbox') {
      productFeatures.push({
        value: i.desc,
        label: i.name
      })
    }
  })
  state.product_features = productFeatures
}

export const generateDataForPieChart = (state) => {
  const amountAllProducts = state.products.length + 1
  const seriesByCheckboxFilters = {}
  // eslint-disable-next-line camelcase
  const products_sum = Object.assign({}, state.products_sum)
  Object.keys(products_sum).forEach((key) => {
    let obj = {name: capitalizeFirstLetter(key), colorByPoint: true, data: []}
    Object.keys(products_sum[key]).forEach(item => {
      obj.data.push({name: item, y: +(100 / (amountAllProducts / products_sum[key][item])).toFixed(2)})
    })
    if (seriesByCheckboxFilters[key] === undefined) {
      seriesByCheckboxFilters[key] = obj
    }
  })
  let keys = Object.keys(seriesByCheckboxFilters)
  keys.forEach((i) => {
    seriesByCheckboxFilters[i].data.sort((a, b) => b.y - a.y)
  })
  state.series_for_pie_chart = seriesByCheckboxFilters
}
export const generateProductAmount = (state) => {
  let productAmount = {}
  state.filtered_results.map(prod => {
    state.filters.map(i => {
      if (i.filter_type === 'checkbox') {
        if (productAmount[i.desc] === undefined) {
          productAmount[i.desc] = {}
        }
        if (productAmount[i.desc][prod[i.desc]] === undefined) {
          productAmount[i.desc][prod[i.desc]] = 1
        } else {
          productAmount[i.desc][prod[i.desc]]++
        }
      }
    })
  })
  if (Object.keys(state.current_checkbox_filter).length !== 0 && Object.keys(state.products_sum_of_current_checkbox_filter).length !== 0) {
    state.products_sum = Object.assign(productAmount, state.products_sum_of_current_checkbox_filter)
  } else {
    state.products_sum = productAmount
  }
}

export const generateActiveFilters = (state, payload) => {
  if (payload.involved_filter.filter_type === 'checkbox') {
    state.current_checkbox_filter = Object.assign({}, payload.involved_filter)
    state.products_sum_of_current_checkbox_filter[state.current_checkbox_filter.desc] = Object.assign({}, state.products_sum[state.current_checkbox_filter.desc])
  } else {
    state.current_checkbox_filter = {}
    state.products_sum_of_current_checkbox_filter = {}
  }
  let index = state.active_filters.findIndex(i => i.desc === payload.involved_filter.desc)
  if (index === -1) {
    state.active_filters.push(payload.involved_filter)
  } else if (payload.involved_filter.values.length !== 0) {
    state.active_filters.splice(index, 1, payload.involved_filter)
  } else {
    state.active_filters = []
  }
}

export const resetCheckboxCurrentGroupOfFilters = (state, payload) => {
  let index = state.active_filters.findIndex(i => i.desc === payload.involved_filter.desc)
  if (index !== -1) {
    state.active_filters.splice(index, 1)
  }
  state.current_checkbox_filter = {}
  state.products_sum_of_current_checkbox_filter = {}
}

export const removeFromActiveFilters = (state, payload) => {
  if (state.current_checkbox_filter.desc === payload.name_of_removable_filter) {
    state.current_checkbox_filter = {}
    state.products_sum_of_current_checkbox_filter = {}
  }
  let activeFilters = state.active_filters.filter((f) => f.desc !== payload.name_of_removable_filter)
  state.active_filters = activeFilters
}
export const removeValueFromActiveCheckboxFilter = (state, payload) => {
  let removableCheckboxFilter = (el) => el.desc === payload.filter_name
  let filter = state.active_filters.find(removableCheckboxFilter)
  let removableFilterValueIndex = filter.values.findIndex((val) => val === payload.removable_filter_value)
  filter.values.splice(removableFilterValueIndex, 1)
}
  
export const setSelectedCategory = (state, payload) => {
  state.selected_category = Object.assign({}, payload.selected_category)
}

export const setAdminSelectedCategory = (state, payload) => {
  state.admin_selected_category = payload.admin_selected_category.slice()
}

export const setAdminProducts = (state, payload) => {
  state.admin_products = payload.admin_products.slice()
}

export const setSelectedProductFeatureInUnits = (state, payload) => {
  state.selected_product_feature_in_units = Object.assign({}, payload.product_feature_in_units)
}

export const setSelectedProductFeature = (state, payload) => {
  state.selected_product_feature = Object.assign({}, payload.product_feature)
}

export const setProductCategories = (state, payload) => {
  state.product_categories = payload.product_categories.slice()
}

export const clearData = (state) => {
  state.products = []
  state.filters = []
  state.comparisons = []
  state.filtered_results = []
  state.active_filters = []
  state.products_sum = {}
  state.series_for_pie_chart = {}
}
export const setUser = (state, payload) => {
  state.user = Object.assign({}, payload.loggedInUser)
}

export const setFiltersValues = (state) => {
  if (!state.filters.length) return
  state.filters.map((filter) => {
    let filterValues = []
    state.products.find((product) => {
      let idx = filterValues.indexOf(product[filter.desc])
      if (idx === -1) {
        filterValues.push(product[filter.desc])
      }
    })
    if (filter.filter_type === 'slider') {
      let tempArr = filterValues.map((item) => isNaN(parseInt(item)) ? 0 : parseInt(item))
      filterValues = [Math.min(...tempArr.filter(Boolean)), Math.max(...tempArr.filter(Boolean))]
    }
    filter.values = filterValues
  })
  state.filters.sort((a, b) => a.order - b.order)
}
export const setActiveFiltersFromStorage = (state, payload) => {
  state.active_filters = payload.filtersFromStorage.slice()
}
export const setCurrentCheckboxFilter = (state, payload) => {
  state.current_checkbox_filter = Object.assign({}, payload.current_checkbox_filter)
}
export const setProductsSumOfCurrentCheckboxFilter = (state, payload) => {
  state.products_sum_of_current_checkbox_filter = Object.assign({}, payload.products_sum_of_current_checkbox_filter)
}
export const setData = (state, payload) => {
  state.products = payload.data[0].slice()
  state.filters = payload.data[1].slice()
}

export const setProducts = (state, payload) => {
  state.products = payload.data.slice()
}
