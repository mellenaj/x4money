const db = 0

function fetchFiltersAndProducts (category) {
  // eslint-disable-next-line camelcase
  let url_f = 'filter_categories/' + category
  // eslint-disable-next-line camelcase
  let filters_responce = db.ref(url_f).once('value').then((res) => {
    return res.val()
  })
  let urlP = 'product_categories/' + category
  let productsResponce = db.ref(urlP).once('value').then((res) => {
    return res.val()
  })
  // eslint-disable-next-line camelcase
  return Promise.all([filters_responce, productsResponce])
}

function fetchFilters (category) {
  // eslint-disable-next-line camelcase
  let url_f = 'filter_categories/' + category
  return db.ref(url_f).once('value')
}

function fetchProducts (category) {
  let urlP = 'product_categories/' + category
  return db.ref(urlP).once('value')
}

function fetchFilterCategories () {
  return db.ref('filter_categories').once('value')
}

export { db, fetchFiltersAndProducts, fetchFilterCategories, fetchFilters, fetchProducts }
export default ({ app, router, Vue }) => {
  Vue.prototype.$db = db
}
