<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">
    <DragList :list1.sync="left" :list2.sync="right"  @on-change="handleChange" >
      <h3 slot="left-title">拥有角色</h3>
      <Card class="drag-item"  slot="left" slot-scope="left" :padding="3">
        {{ left.itemLeft.roleName }}
      </Card>
      <h3 slot="right-title">所有角色</h3>
      <Card class="drag-item" slot="right" slot-scope="right" :padding="3">
        {{ right.itemRight.roleName }}
      </Card>
    </DragList>
    <div slot="footer">
      <div>拖拽</div>
    </div>
  </Modal>
</template>

<script>
import DragList from '_c/drag-list/drag-list'
import { mapActions } from 'vuex'
export default {
  name: 'RoleModal',
  components: { DragList },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      left: [],
      right: []
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods: {
    ...mapActions([
      'handleAddStudentRole',
      'handleDeleteStudentRole',
      'handleAddTeacherRole',
      'handleDeleteTeacherRole'
    ]),
    handleChange ({ src, target, oldIndex, newIndex }) {
      if (src === 'right') {
        this.saveRole(newIndex)
      } else {
        this.deleteRole(newIndex)
      }
    },
    /**
     * 保存角色
     * @param index
     */
    saveRole (index) {
      let roleId = this.left[index].id
      let id = this.user.id
      if (this.type === 'student') {
        this.handleAddStudentRole({ id, roleId }).then(res => {
          if (res) {
            this.$Message.success('成功')
          } else {
            this.$Message.error('失败')
          }
        })
      } else {
        this.handleAddTeacherRole({ id, roleId }).then(res => {
          if (res) {
            this.$Message.success('成功')
          } else {
            this.$Message.error('失败')
          }
        })
      }
    },
    /**
     * 删除角色
     * @param index
     */
    deleteRole (index) {
      let roleId = this.right[index].id
      let id = this.user.id
      if (this.type === 'student') {
        this.handleDeleteStudentRole({ id, roleId }).then(res => {
          if (res) {
            this.$Message.success('成功')
          } else {
            this.$Message.error('失败')
          }
        })
      } else {
        this.handleDeleteTeacherRole({ id, roleId }).then(res => {
          if (res) {
            this.$Message.success('成功')
          } else {
            this.$Message.error('失败')
          }
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  /**
   * props不能修改props里父组件传来的值
   */
  computed: {
    user () {
      return this.getter.getEditUser
    },
    type () {
      return this.getter.getEditType
    },
    modalShow: {
      get () {
        // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-side-effects-in-computed-properties
        this.$store.dispatch('handleGetRoleList').then(res => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.right = res
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.left = this.userRoles
        })
        return this.show
      },
      set (val) {
        console.info(val)
      }
    },
    allRole () {
      return this.getter.getAllRole
    },
    userRoles () {
      let list = this.getter.getUserRoles
      let left = this.allRole
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.right = left.filter(item => {
        return list.every(i => {
          return i.id !== item.id
        })
      })
      return list
    }
  }
}
</script>

<style scoped>

</style>
