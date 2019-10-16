<template>
  <Card>
    <!--角色对话框-->
    <RoleModal
      :show="show1"
      @ok="cancelModal"
      @cancel="cancelModal"
    />
    <!--编辑学生对话框-->
    <StudentEditModal
      :show="show2"
      @ok="cancelModal"
      @cancel="cancelModal"
    />
    <!--编辑老师对话框-->
    <TeacherEditModal
      :show="show3"
      @ok="cancelModal"
      @cancel="cancelModal"
    />
    <div slot="title">
      <Select v-model="type"  style="width: 100px">
        <Option value="teacher">教师</option>
        <Option value="student">学生</option>
      </Select>
      <Input search
             v-model="key"
             style="width: 300px"
             @on-change="search">
      </Input>
      <ButtonGroup>
        <Button @click="showUserInfoModal" type="primary">添加</Button>
      </ButtonGroup>
    </div>

    <Row>
      <Table :columns="TABLE_HEAD"
             :data="page.records"
             border
             size="small"
             stripe>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="showRoleModal(row)">
            角色
          </Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="showUserInfoModal(row)">
            编辑
          </Button>
          <Button type="error" size="small" @click="deleteUser(row)">
            删除
          </Button>
        </template>
      </Table>
      <Page show-total
            :total="page.total"
            :current="page.current"
            :page-size="page.size"
            class="page-bar"
            @on-change = "pageChange"
      />
    </Row>
  </Card>
</template>

<script>

import { mapActions } from 'vuex'
import RoleModal from '@/view/components/modal/role-modal'
import StudentEditModal from '@/view/components/modal/student-edit-modal'
import TeacherEditModal from '@/view/components/modal/teacher-edit-modal'

export default {
  name: 'edit_user',
  components: { RoleModal, StudentEditModal, TeacherEditModal },
  created () {
    // 禁止火狐拖拽搜索
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  data () {
    return {
      type: 'student',
      TABLE_HEAD: [],
      tb_teacher_head: [
        {
          title: 'id',
          key: 'id',
          width: 100,
          fixed: 'left'
        }, {
          title: '姓名',
          key: 'teacherName',
          width: 100,
          fixed: 'left'
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
          key: 'teacherPhone',
          width: 150
        }, {
          title: '电话',
          key: 'teacherPhone',
          width: 150
        }, {
          title: '擅长领域',
          key: 'teacherMaster',
          width: 150
        }, {
          title: '职称',
          key: 'teacherLevel',
          width: 150
        }, {
          title: '银行卡号',
          key: 'teacherBankCardNo',
          width: 150
        }, {
          title: '编辑',
          width: 200,
          fixed: 'right',
          slot: 'action'
        }
      ],
      tb_student_head: [
        {
          title: 'id',
          key: 'id',
          width: 100,
          fixed: 'left'
        }, {
          title: '姓名',
          key: 'stuName',
          width: 150,
          fixed: 'left'
        }, {
          title: '帐号',
          key: 'account',
          width: 150
        }, {
          title: '班级',
          key: 'stuClass',
          width: 150
        }, {
          title: '密码',
          key: 'password',
          width: 150
        }, {
          title: '性别',
          key: 'stuSex',
          width: 70
        }, {
          title: '电话',
          key: 'stuPhone',
          width: 150
        }, {
          title: '银行卡号',
          key: 'stuBankCardNo',
          width: 150
        }, {
          title: '编辑',
          width: 200,
          slot: 'action'
        }
      ],
      page: {
        current: 1,
        size: 12,
        total: 0,
        records: []
      },
      show1: false,
      show2: false,
      show3: false,
      key: '',
      deleteObject: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUser()
      this.TABLE_HEAD = this.tb_student_head
      this.$store.dispatch('handleGetRoleList')
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllStudent',
      'handleGetAllTeacherByPage',
      'handleGetStudentRole',
      'handleGetTeacherRole',
      'handleSearchStudent',
      'handleSearchTeacher'
    ]),
    /**
     * 页码改变时执行
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      this.key !== ''
        ? this.search(index, this.page.size)
        : this.getUser(index, this.page.size)
    },
    /**
     * 分页获取学生或教师
     */
    getUser (pageNum = 1, pageSize = 12) {
      this.type === 'student'
        ? this.getStudent(pageNum, pageSize)
        : this.getTeacher(pageNum, pageSize)
    },
    getTeacher (pageNum, pageSize) {
      this.handleGetAllTeacherByPage({ pageNum, pageSize }).then(res => {
        this.page = res
      })
    },
    getStudent (pageNum, pageSize) {
      this.handleGetAllStudent({ pageNum, pageSize }).then(res => {
        // this.tb_res = res.records
        this.page = res
      })
    },
    /**
     * 搜索
     */
    search (pageNum = 1, pageSize = 12) {
      switch (this.type) {
        case 'student':
          this.key === ''
            ? this.getStudent(1, 12)
            : this.searchStudent(this.key, pageNum, pageSize)
          break
        case 'teacher':
          this.key === ''
            ? this.getTeacher(1, 12)
            : this.searchTeacher(this.key, pageNum, pageSize)
          break
      }
    },
    searchStudent (key, pageNum, pageSize) {
      this.handleSearchStudent({ key, pageNum, pageSize }).then(res => {
        // this.tb_res = res.records
        this.page = res
      })
    },
    searchTeacher (key, pageNum, pageSize) {
      this.handleSearchTeacher({ key, pageNum, pageSize }).then(res => {
        // this.tb_res = res.records
        this.page = res
      })
    },
    /**
     * 删除
     * @param obj
     */
    deleteUser (obj) {
      this.deleteObject = obj
      this.$Modal.confirm({
        title: '删除',
        content: '三思啊',
        onOk: () => {
          this.submitDelete()
        },
        onCancel: () => {
          this.cancelDelete()
        }
      })
    },
    cancelDelete () {
      this.deleteObject = {}
    },
    submitDelete () {
      this.$Message.error(this.deleteObject)
    },
    /**
     * 显示角色对话框
     * @param account
     */
    showRoleModal (obj) {
      this.$store.commit('setEditUser', obj)
      this.$store.commit('setEditType', this.type)
      let id = obj.id
      if (this.type === 'teacher') {
        this.handleGetTeacherRole({ id }).then(res => {
          this.show1 = true
        })
      } else {
        this.handleGetStudentRole({ id }).then(res => {
          this.show1 = true
        })
      }
    },
    /**
     * 取消角色对话框
     */
    cancelModal (flag = false) {
      this.show1 = false
      this.show2 = false
      this.show3 = false
      this.$store.commit('setEditUser', {})
      if (flag) {
        this.getUser()
      }
    },
    /**
     * 显示编辑对话框
     * @param obj
     */
    showUserInfoModal (obj) {
      this.$store.commit('setEditUser', obj)
      if (this.type === 'teacher') {
        this.show3 = true
      } else {
        this.show2 = true
      }
    }
  },
  watch: {
    type (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getUser()
        newVal === 'student'
          ? this.TABLE_HEAD = this.tb_student_head
          : this.TABLE_HEAD = this.tb_teacher_head
      }
    }
  }
}
</script>

<style>
  .tool-bar {
    margin-bottom: 15px ;
  }
  .page-bar {
    margin-top: 15px;
  }
  .drag-item{
    margin: 10px;
  }
  .drop-box1 ,.drop-box2{
    height: 400px;
  }
</style>
