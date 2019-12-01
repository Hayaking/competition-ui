import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import user_edit from './module/user_edit'
import app from './module/app'
import competition from './module/competition'
import type from './module/type'
import studentGroup from './module/studentGroup'
import teacherGroup from './module/teacherGroup'
import role from './module/role'
import permission from './module/persmission'
import teacher from './module/teacher'
import student from './module/student'
import enter from './module/enter'
import works from './module/works'
import join from './module/join'
import message from './module/message'
import menu from './module/menu'
import lead from './module/lead'
import process from './module/process'
import pic from './module/pic'
import budget from './module/budget'
import progress from './module/progress'
import price from './module/price'
import download from './module/download'

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
    competition,
    type,
    studentGroup,
    teacherGroup,
    role,
    permission,
    teacher,
    student,
    enter,
    works,
    join,
    message,
    menu,
    lead,
    process,
    pic,
    budget,
    progress,
    price,
    download
  }
})
