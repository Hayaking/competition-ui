import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import user_edit from './module/user_edit'
import app from './module/app'
import data from './module/data'
import competition from './module/competition'
import type from './module/type'
import group from './module/group'
import role from './module/role'
import permission from './module/persmission'
import teacher from './module/teacher'
import student from './module/student'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    user_edit,
    app,
    data,
    competition,
    type,
    group,
    role,
    permission,
    teacher,
    student
  }
})
