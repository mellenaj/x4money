export const isAuth = (state) => {
  return Object.keys(state.user).length !== 0
}
