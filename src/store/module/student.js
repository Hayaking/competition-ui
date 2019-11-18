import {
  get_all_student_by_page,
  insert_or_update_student,
  is_exist,
  search_student_by_page, update_student_info
} from '@/api/student'

export default {
  state: {
    edit_student: {}
  },
  mutations: {
    setEditStudent (state, stu) {
      state.edit_student = stu
    }
  },
  getters: {
    getEditStudent: state => state.edit_student
  },
  actions: {
    handleGetAllStudent ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_all_student_by_page(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleStudentIsExist ({ commit }, { list }) {
      return new Promise((resolve, reject) => {
        is_exist(list).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSaveStudent ({ commit }, { student }) {
      return new Promise((resolve, reject) => {
        insert_or_update_student(student).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleUpdateStudentInfo ({ commit }, { student }) {
      return new Promise((resolve, reject) => {
        update_student_info(student).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSearchStudent ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_student_by_page(key, pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
