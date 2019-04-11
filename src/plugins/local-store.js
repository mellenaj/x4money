/* eslint-disable camelcase */
let storage = localStorage
function setCategory (category) {
  storage.setItem('category', JSON.stringify(category))
}

function checkCategory () {
  let category = storage.getItem('category')
  if (category) {
    this.$store.dispatch('data/getDataByCategory', JSON.parse(category))
  }
}

function setFilters (active_filters) {
  if (active_filters.length !== 0) {
    storage.setItem('active_filters', JSON.stringify(active_filters))
  } else {
    storage.removeItem('active_filters')
  }
}

function removeActiveFiltersDueToChangeCategory () {
  storage.removeItem('active_filters')
}

function checkFilters () {
  let activeFilters = storage.getItem('active_filters')
  if (activeFilters) {
    this.$store.commit('data/setActiveFiltersFromStorage', {'filtersFromStorage': JSON.parse(activeFilters)})
  }
}

function setCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter (current_checkbox_filter, products_sum_of_current_checkbox_filter) {
  if (Object.keys(current_checkbox_filter).length !== 0) {
    storage.setItem('current_checkbox_filter', JSON.stringify(current_checkbox_filter))
    storage.setItem('products_sum_of_current_checkbox_filter', JSON.stringify(products_sum_of_current_checkbox_filter))
  } else {
    storage.removeItem('current_checkbox_filter')
    storage.removeItem('products_sum_of_current_checkbox_filter')
  }
}

function checkCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter () {
  let current_checkbox_filter = storage.getItem('current_checkbox_filter')
  let products_sum_of_current_checkbox_filter = storage.getItem('products_sum_of_current_checkbox_filter')
  if (current_checkbox_filter && products_sum_of_current_checkbox_filter) {
    this.$store.commit('data/setCurrentCheckboxFilter', {'current_checkbox_filter': JSON.parse(current_checkbox_filter)})
    this.$store.commit('data/setProductsSumOfCurrentCheckboxFilter', {'products_sum_of_current_checkbox_filter': JSON.parse(products_sum_of_current_checkbox_filter)})
  }
}

function clearStore () {
  storage.clear()
}

export { setCategory, setFilters, checkCategory, checkFilters, clearStore, setCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter, checkCurrentCheckboxFilterAndProductsSumOfCurrentCheckboxFilter, removeActiveFiltersDueToChangeCategory }
