import { fetchProducts } from '../../plugins/db'
import { URL_API, PRODUCT_CATEGORIES, PRODUCTS_BY_CATEGORY, FILTERS_BY_CATEGORY } from '../../../config/index'
import axios from 'axios'
import { Notify } from 'quasar'

export const logOutUser = ({state, commit}) => {
  commit('clearAdminData')
}

export const createNewFilter = ({state, commit}, filter) => {
  axios.post(URL_API + 'new-filter', filter).catch(err => {
    Notify.create({
      message: err,
      type: 'negative'
    })
  })
}

export const getDataByCategory = ({state, commit}, category) => {
  function getProducts () {
    return axios.get(PRODUCTS_BY_CATEGORY + category.id)
  }
  function getFilters () {
    return axios.get(FILTERS_BY_CATEGORY + category.id)
  }
  axios.all([getProducts(), getFilters()])
    .then(axios.spread((products, filters) => {
      commit('setSelectedCategory', {'selected_category': category})
      commit('setData', {'data': [products.data.data, filters.data]})
      commit('generateTableColumnsHeader', {'admin': false})
      commit('generateProductFeaturesInUnits')
      commit('generateProductFeatures')
      commit('setSelectedProductFeatureInUnits', { 'product_feature_in_units': state.product_features_in_units[0] })
      commit('setSelectedProductFeature', { 'product_feature': state.product_features[0] })
      commit('generateFilteredResults')
      commit('generateComparisons', { 'axis': {x: 'low_price', y: state.selected_product_feature_in_units.value} })
      commit('generateProductAmount')
      commit('generateDataForPieChart')
    })).catch(err => {
      Notify.create({
        message: err,
        type: 'negative'
      })
    })
}

export const getAdminProductsByAdminCategory = ({state, commit}, category) => {
  fetchProducts(category).then((res) => {
    commit('setAdminSelectedCategory', {'admin_selected_category': category})
    commit('setAdminProducts', {'admin_products': res.val()})
    commit('generateTableColumnsHeader', {'admin': true})
  }).catch(err => {
    Notify.create({
      message: err,
      type: 'negative'
    })
  })
}
export const dataChangesDueToToggleCkeckboxGroupType = ({state, commit}, filter) => {
  commit('resetCheckboxCurrentGroupOfFilters', {'involved_filter': filter})
  commit('generateFilteredResults')
  commit('generateComparisons', { 'axis': {x: 'low_price', y: state.selected_product_feature_in_units.value} })
  commit('generateProductAmount')
}

export const dataChangesDueToTriggerFilter = ({state, commit}, filter) => {
  commit('generateActiveFilters', {'involved_filter': filter})
  commit('generateFilteredResults')
  commit('generateComparisons', { 'axis': {x: 'low_price', y: state.selected_product_feature_in_units.value} })
  commit('generateProductAmount')
}

// eslint-disable-next-line camelcase
export const dataChangesDueToRemoveFilter = ({state, commit}, filter_name) => {
  commit('removeFromActiveFilters', {'name_of_removable_filter': filter_name})
  commit('generateFilteredResults')
  commit('generateComparisons', { 'axis': {x: 'low_price', y: state.selected_product_feature_in_units.value} })
  commit('generateProductAmount')
}

export const dataChangesDueToRemoveValueFromCheckboxFilter = ({state, commit}, payload) => {
  commit('removeValueFromActiveCheckboxFilter', {'filter_name': payload.filter_name, 'removable_filter_value': payload.removable_filter_value})
  commit('generateFilteredResults')
  commit('generateComparisons', { 'axis': {x: 'low_price', y: state.selected_product_feature_in_units.value} })
  commit('generateProductAmount')
}

// eslint-disable-next-line camelcase
export const changeChartDataDueToTriggerProductFeatureInUnits = ({commit}, feature_in_units) => {
  commit('setSelectedProductFeatureInUnits', { 'product_feature_in_units': feature_in_units })
  commit('generateComparisons', { 'axis': {x: 'low_price', y: feature_in_units.value} })
}

export const changePieChartDataDueToTriggerProductFeature = ({commit}, feature) => {
  commit('setSelectedProductFeature', { 'product_feature': feature })
}

export const getProductCategories = ({commit}) => {
  axios.get(PRODUCT_CATEGORIES).then(res => {
    commit('setProductCategories', {'product_categories': res.data.data})
  }).catch(err => {
    Notify.create({
      message: err,
      type: 'negative'
    })
  })
}
