import {
  get_permission,
  get_all_permission,
  add_role_permission,
  delete_role_permission,
  add_permission,
  delete_permission,
  get_id,
  save_permission_menu
} from '@/api/permission'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetPermission ({ commit }, { roleId }) {
      return new Promise((resolve, reject) => {
        get_permission(roleId).then(res => {
          console.info(res)
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetAllPermission ({ commit }) {
      return new Promise((resolve, reject) => {
        get_all_permission().then(res => {
          console.info(res)
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddRolePermission ({ commit }, { roleId, permissionId }) {
      return new Promise((resolve, reject) => {
        add_role_permission(roleId, permissionId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteRolePermission ({ commit }, { roleId, permissionId }) {
      return new Promise((resolve, reject) => {
        delete_role_permission(roleId, permissionId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleAddPermission ({ commit }, { permissionName }) {
      return new Promise((resolve, reject) => {
        add_permission(permissionName).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeletePermission ({ commit }, { permissionId }) {
      return new Promise((resolve, reject) => {
        delete_permission(permissionId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetId ({ commit }, { menuId }) {
      return new Promise((resolve, reject) => {
        get_id(menuId).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSavePermissionMenu ({ commit }, { menuId, permissionId }) {
      return new Promise((resolve, reject) => {
        save_permission_menu(menuId, permissionId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
