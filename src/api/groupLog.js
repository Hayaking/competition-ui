import axios from '@/libs/api.request'

export const get_teacher_group_log = (groupId, pageNum, pageSize) => {
  return axios.request({
    url: `/teacherGroupLog/${groupId}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
