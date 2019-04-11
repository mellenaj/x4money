let storage = localStorage
export default ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    const category = storage.getItem('category')
    // eslint-disable-next-line camelcase
    const requires_category = to.matched.some(record => record.meta.requires_category)
    // eslint-disable-next-line camelcase
    if (!category && requires_category) {
      next('/')
    } else {
      next()
    }
  })
}
