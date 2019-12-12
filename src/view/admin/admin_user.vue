<template>
  <Card>
    <Drawer title="菜单" :closable="false" draggable v-model="showDrawer">
      <Tree :data="data"
            show-checkbox
            @on-check-change="checkChange"/>
    </Drawer>
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
      <Select v-model="roleId"  style="width: 100px">
        <Option v-for="(item,index) in roleList" :value="item.id" :key="index">{{item.roleName}}</option>
      </Select>
      <Input search
             v-model="key"
             style="width: 300px"
             @on-change="search">
      </Input>
      <ButtonGroup>
        <Button @click="showUserInfoModal" type="primary">添加</Button>
        <Button @click="showMenuDrawer" type="primary">修改角色菜单</Button>
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

import { mapActions, mapGetters } from 'vuex'
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
        },
        {
          title: '姓名',
          key: 'teacherName',
          width: 100,
          fixed: 'left'
        },
        {
          title: '帐号',
          key: 'account',
          width: 150
        },
        {
          title: '密码',
          key: 'password',
          width: 150
        },
        {
          title: '性别',
          key: 'teacherSex',
          width: 70
        },
        {
          title: '电话',
          key: 'teacherPhone',
          width: 150
        },
        {
          title: '电话',
          key: 'teacherPhone',
          width: 150
        },
        {
          title: '擅长领域',
          key: 'teacherMaster',
          width: 150
        },
        {
          title: '职称',
          key: 'teacherLevel',
          width: 150
        },
        {
          title: '银行卡号',
          key: 'teacherBankCardNo',
          width: 150
        },
        {
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
        },
        {
          title: '姓名',
          key: 'stuName',
          width: 150,
          fixed: 'left'
        },
        {
          title: '帐号',
          key: 'account',
          width: 150
        },
        {
          title: '班级',
          key: 'stuClass',
          width: 150
        },
        {
          title: '密码',
          key: 'password',
          width: 150
        },
        {
          title: '性别',
          key: 'stuSex',
          width: 70
        },
        {
          title: '电话',
          key: 'stuPhone',
          width: 150
        },
        {
          title: '银行卡号',
          key: 'stuBankCardNo',
          width: 150
        },
        {
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
      showDrawer: false,
      key: '',
      deleteObject: {},
      roleId: 1,
      menuList: [],
      MENU_ALL: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getUserPage(1, 1, 12)
      this.TABLE_HEAD = this.tb_teacher_head
      this.$store.dispatch('handleGetRoleList')
      this.handleGetAllMenu().then(res => {
        res.flag
          ? this.MENU_ALL = res.body
          : this.$Message.error('获取失败')
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetStudentRole',
      'handleGetTeacherRole',
      'handleSearchStudent',
      'handleSearchTeacher',
      'handleGetUserPageByRole',
      'handleGetRoleList',
      'handleGetAllMenu',
      'handleGetMenuListByRoleId',
      'handleSetRoleAndMenu'
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
    getUserPage (id = 0, pageNum = 1, pageSize = 12) {
      this.handleGetUserPageByRole({ id, pageNum, pageSize }).then(res => {
        this.page = res.body
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
    },
    showMenuDrawer () {
      this.showDrawer = !this.showDrawer
      this.handleGetMenuListByRoleId({ roleId: this.roleId }).then(res => {
        res.flag
          ? this.menuList = res.body
          : this.$Message.error('获取失败')
      })
    },
    checkChange (obj, item) {
      // 一级菜单
      if (item.hasOwnProperty('children')) {
        let id = this.MENU_ALL.find(f => { return this.$t(f.name) === item.title }).id
        this.handleSetRoleAndMenu({
          roleId: this.roleId,
          menu1Id: id,
          flag: item.checked,
          tag: true
        }).then(res => {
          res ? this.$Message.success('成功') : this.$Message.error('失败')
        })
      } else {
        let menu1Id
        let menu2Id
        this.MENU_ALL.find(menu1 => {
          // 在一级菜单里找二级菜单
          let menu2 = menu1.children.find(menu2 => { return this.$t(menu2.name) === item.title })
          if (menu2 !== undefined) {
            menu2Id = menu2.id
            menu1Id = menu1.id
          }
          return menu2 !== undefined
        })
        this.handleSetRoleAndMenu({
          roleId: this.roleId,
          menu1Id,
          menu2Id,
          flag: item.checked,
          tag: false
        }).then(res => {
          res ? this.$Message.success('成功') : this.$Message.error('失败')
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getAllRole'
    ]),
    roleList () {
      return this.getAllRole
    },
    data () {
      return this.MENU_ALL.map(item => {
        let menu1
        this.menuList.length > 0
          ? menu1 = this.menuList.find(f => { return f.name === item.name })
          : menu1 = undefined
        return {
          id: item.id,
          title: this.$t(item.name),
          expand: true,
          children: item.children.map(child => {
            return {
              title: this.$t(child.name),
              // menu1===true时说明有一级菜单
              checked: menu1 !== undefined
                ? menu1.children.find(f => { return f.name === child.name }) !== undefined
                : false
            }
          })
        }
      })
    }
  },
  watch: {
    roleId (val) {
      this.getUserPage(val, 1, 12)
      if (val === 5) {
        this.TABLE_HEAD = this.tb_student_head
      } else {
        this.TABLE_HEAD = this.tb_teacher_head
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
