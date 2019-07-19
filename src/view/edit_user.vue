<template>
  <Card>
<!--角色对话框-->
    <RoleModal :show="show1"
      :left-list="tb_role_res"
      :right-list="tb_role_res_all"
      :student="student"
      @cancel="cancelRoleModal"
    >
    </RoleModal>
<!--    <Modal-->
<!--      @on-ok="saveRole"-->
<!--      @on-cancel="cancelRoleModal"-->
<!--      title="角色"-->
<!--      v-model="show1">-->
<!--      <DragList :list1.sync="tb_role_res" :list2.sync="tb_role_res_all"  @on-change="handleChange" >-->
<!--        <h3 slot="left-title">拥有的角色</h3>-->
<!--        <Card class="drag-item" slot="left" slot-scope="left" :padding="3">-->
<!--          {{ left.itemLeft.roleName }}-->
<!--        </Card>-->
<!--        <h3 slot="right-title">所有角色</h3>-->
<!--        <Card class="drag-item" slot="right" slot-scope="right" :padding="3">-->
<!--          {{ right.itemRight.roleName }}-->
<!--        </Card>-->
<!--      </DragList>-->
<!--    </Modal>-->
<!--编辑对话框-->
    <Modal
      title="编辑"
      @on-ok="saveStudent"
      v-model="show2">
      <Form :model="student" label-position="left" :label-width="70">
        <FormItem label="账号">
          <Input v-model="student.account" :disabled="true"/>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="student.password"/>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="student.stuName"/>
        </FormItem>
        <FormItem label="性别">
          <Input v-model="student.stuSex"/>
        </FormItem>
        <FormItem label="班级">
          <Input v-model="student.stuClass"/>
        </FormItem>
        <FormItem label="电话">
          <Input v-model="student.stuPhone"/>
        </FormItem>
        <FormItem label="银行卡号">
          <Input v-model="student.stuBankCardNo"/>
        </FormItem>
      </Form>
    </Modal>
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
import RoleModal from '@/view/components/RoleModal'

export default {
  name: 'edit_user',
  components: { RoleModal },
  created () {
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  data () {
    return {
      type: 'teacher',
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
                    this.showStudentModal(params.row)
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
      tb_role_res: [],
      tb_role_res_all: [],
      tb_role_res_all_back: [],
      page: {
        current: 1,
        page_size: 2,
        total: 0,
        records: []
      },
      show1: false,
      show2: false,
      student: {

      },
      handleList: []

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.search()
      this.$store.dispatch('handleGetRoleList').then(res => {
        this.tb_role_res_all = res
        this.tb_role_res_all_back = res
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllStudent',
      'handleGetAllTeacherByPage',
      'handleUpdate',
      'handleGetStudentRole',
      'handleAddStudentRole',
      'handleDeleteStudentRole'
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
      this.student = obj
      let account = obj.account
      this.handleGetStudentRole({ account }).then(res => {
        this.tb_role_res = res
        this.tb_role_res_all = this.tb_role_res_all.filter((item) => {
          return this.tb_role_res.every(i => {
            return i.id !== item.id
          })
        })
        this.show1 = true
      })
    },
    /**
     * 取消角色对话框
     */
    cancelRoleModal () {
      console.info(this.tb_role_res_all_back)
      this.tb_role_res_all = this.tb_role_res_all_back
      this.show1 = false
    },
    /**
     * 显示编辑对话框
     * @param obj
     */
    showStudentModal (obj) {
      this.student = obj
      this.show2 = true
    },
    /**
     * 保存学生
     */
    saveStudent () {
      this.handleUpdate({ student: this.student }).then(res => {
        console.info(res)
        this.student = {}
      })
    },
    /**
     * 保存角色
     * @param index
     */
    saveRole (index) {
      let roleId = this.tb_role_res[index].id
      let account = this.student.account
      this.handleAddStudentRole({ account, roleId }).then(res => {
        console.info(res)
      })
    },
    /**
     * 删除角色
     * @param index
     */
    deleteRole (index) {
      let roleId = this.tb_role_res_all[index].id
      let account = this.student.account
      this.handleDeleteStudentRole({ account, roleId }).then(res => {
        console.info(res)
      })
    },
    /**
     * 拖拽列表改变时
     * @param src
     * @param target
     * @param oldIndex
     * @param newIndex
     */
    handleChange ({ src, target, oldIndex, newIndex }) {
      console.info(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
      if (src === 'right') {
        this.saveRole(newIndex)
      } else {
        this.deleteRole(newIndex)
      }
    }
  },
  watch: {
    type () {
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
