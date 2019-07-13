import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import data from './module/data'
import competition from './module/competition'
import type from './module/type'
import group from './module/group'

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
    app,
    data,
    competition,
    type,
    group
  }
})
