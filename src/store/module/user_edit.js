export default {
  state: {
    edit_user: {},
    edit_type: ''
  },
  mutations: {
    setEditType (state, type) {
      state.edit_type = type
    },
    setEditUser (state, user) {
      state.edit_user = user
    }
  },
  getters: {
    getEditUser: state => state.edit_user,
    getEditType: state => state.edit_type
  },
  actions: {

  }
}
