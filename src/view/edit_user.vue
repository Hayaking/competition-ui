<template>
  <Card>
    <!-- 角色对话框-->
<!--    <Modal-->
<!--      @on-ok="addPermission"-->
<!--      title="角色"-->
<!--      v-model="show1">-->
<!--      <Input type="text" v-model="permissionName">-->
<!--        <span slot="prepend">权限名</span>-->
<!--      </Input>-->
<!--    </Modal>-->
    <!-- 编辑对话框-->
    <Modal
      title="编辑"
      @on-ok="saveStudent"
      v-model="show2">
      <Form :model="student" label-position="left" :label-width="70">
        <FormItem label="账号">
          <Input v-model="student.account"/>
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

export default {
  name: 'edit_user',
  data () {
    return {
      type: 'student',
      tb_head: [],
      tb_teacher_head: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }
      ],
      tb_student_head: [
        {
          title: '姓名',
          key: 'stuName'
        }, {
          title: '帐号',
          key: 'account'
        }, {
          title: '密码',
          key: 'password'
        }, {
          title: '班级',
          key: 'stuClass'
        }, {
          title: '性别',
          key: 'stuSex'
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
                    this.show1 = true
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
                    this.edit(params.row)
                    this.show2 = true
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
      page: {
        current: 1,
        page_size: 2,
        total: 0,
        records: []
      },
      show1: false,
      show2: false,
      student: {

      }

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.search()
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllStudent',
      'handleGetAllTeacherByPage',
      'handleUpdate'
    ]),
    pageChange (index) {
      this.page.current = index
      let start = (index - 1) * this.page.page_size
      let end = index * this.page.page_size
      this.tb_res = this.page.records.slice(start, end)
    },
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
    edit (obj) {
      this.student = obj
    },
    saveStudent () {
      this.handleUpdate({ student: this.student }).then(res => {
        console.info(res)
        this.student = {}
      })
    }
  },
  watch: {
    type () {
      this.search()
    }
  }
}
</script>

<style scoped>

</style>
