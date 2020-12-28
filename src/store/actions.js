export const actions = {
  login ({commit}, payload) {
    commit('SET_USERNAME', payload)
  },
  logout ({commit}) {
    commit('SET_USERNAME', undefined)
  },
  directwebInit({commit}, payload) {
    commit('SET_DIRECTWEB', payload)
  }
}
