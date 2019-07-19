<template>
  <Card>
<!--角色对话框-->
    <RoleModal
      :show="show1"
      @ok="cancelModal"
      @cancel="cancelModal">
    </RoleModal>
<!--编辑学生对话框-->
    <UserInfoModal
      :show="show2"
      :stu="user"
      @ok="cancelModal"
      @cancel="cancelModal">
    </UserInfoModal>

    <Row>
      <Select v-model="type">
        <Option value="teacher">教师</option>
        <Option value="student">学生</option>
      </Select>
    </Row>
    <Row>
      <Table :columns="tb_head" :data="tb_res" border height="520" size="small" stripe></Table>
      <Page show-total
            :total="page.total"
            :current="page.current"
            :page-size="page.page_size"
            @on-change = "pageChange"
      />
    </Row>
  </Card>
</template>

<script>

import { mapActions } from 'vuex'
import RoleModal from '@/view/components/role-modal'
import UserInfoModal from '@/view/components/user-info-modal'

export default {
  name: 'edit_user',
  components: { RoleModal, UserInfoModal },
  created () {
    // 禁止火狐拖拽搜索
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      type: 'student',
      tb_head: [],
      tb_teacher_head: [
        {
          title: '姓名',
          key: 'teacherName',
          width: 100
        }, {
          title: '帐号',
          key: 'account',
          width: 150
        }, {
          title: '密码',
          key: 'password',
          width: 150
        }, {
          title: '性别',
          key: 'teacherSex',
          width: 70
        }, {
          title: '电话',
          key: 'teacherPhone'
        }, {
          title: '电话',
          key: 'teacherPhone'
        }, {
          title: '擅长领域',
          key: 'teacherMaster'
        }, {
          title: '职称',
          key: 'teacherLevel'
        }, {
          title: '银行卡号',
          key: 'teacherBankCardNo'
        }, {
          title: '编辑',
          key: 'stuPhone',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showRoleModal(params.row)
                  }
                }
              }, '角色'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showUserInfoModal(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Message.info('撤回')
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_student_head: [
        {
          title: '姓名',
          key: 'stuName',
          width: 100
        }, {
          title: '帐号',
          key: 'account',
          width: 150
        }, {
          title: '密码',
          key: 'password',
          width: 150
        }, {
          title: '班级',
          key: 'stuClass',
          width: 120
        }, {
          title: '性别',
          key: 'stuSex',
          width: 70
        }, {
          title: '电话',
          key: 'stuPhone'
        }, {
          title: '银行卡号',
          key: 'stuBankCardNo'
        }, {
          title: '编辑',
          key: 'stuPhone',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showRoleModal(params.row)
                  }
                }
              }, '角色'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showUserInfoModal(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Message.info('撤回')
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tb_res: [],
      tb_role_head: [
        {
          title: 'id',
          key: 'id'
        }, {
          title: '角色名',
          key: 'roleName'
        }
      ],
      page: {
        current: 1,
        page_size: 2,
        total: 0,
        records: []
      },
      show1: false,
      show2: false,
      user: {

      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.search()
      this.$store.dispatch('handleGetRoleList')
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllStudent',
      'handleGetAllTeacherByPage',
      'handleGetStudentRole',
      'handleGetTeacherRole'
    ]),
    /**
     * 页码改变时执行
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      let start = (index - 1) * this.page.page_size
      let end = index * this.page.page_size
      this.tb_res = this.page.records.slice(start, end)
    },
    /**
     * 分页获取学生或教师
     */
    search () {
      let pageNum = this.page.current
      let pageSize = this.page.page_size
      if (this.type === 'student') {
        this.handleGetAllStudent({ pageNum, pageSize }).then(res => {
          this.tb_head = this.tb_student_head
          this.page.records = res.records
          this.page.total = res.length
          this.pageChange(1)
        })
      } else {
        this.handleGetAllTeacherByPage({ pageNum, pageSize }).then(res => {
          this.tb_head = this.tb_teacher_head
          this.page.records = res.records
          this.page.total = res.length
          this.pageChange(1)
        })
      }
    },
    /**
     * 显示角色对话框
     * @param account
     */
    showRoleModal (obj) {
      this.$store.commit('setEditUser', obj)
      this.$store.commit('setEditType', this.type)
      let account = obj.account
      if (this.type === 'teacher') {
        this.handleGetTeacherRole({ account }).then(res => {
          this.show1 = true
        })
      } else {
        this.handleGetStudentRole({ account }).then(res => {
          this.show1 = true
        })
      }
    },
    /**
     * 取消角色对话框
     */
    cancelModal () {
      this.show1 = false
      this.show2 = false
    },
    /**
     * 显示编辑对话框
     * @param obj
     */
    showUserInfoModal (obj) {
      this.user = obj
      this.show2 = true
    }
  },
  watch: {
    type (val) {
      this.$store.commit('setEditUser', val)
      this.search()
    }
  }
}
</script>

<style>
  .drag-item{
    margin: 10px;
  }
  .drop-box1 ,.drop-box2{
    height: 400px;
  }
</style>
