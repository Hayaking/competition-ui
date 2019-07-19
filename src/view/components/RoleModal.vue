<template>
  <Modal
    @on-cancel="cancel"
    title="title"
    v-model="modalShow">
    <DragList :list1.sync="left" :list2.sync="right"  @on-change="handleChange" >
      <h3 slot="left-title">拥有的角色</h3>
      <Card class="drag-item" slot="left" slot-scope="left" :padding="3">
        {{ left.itemLeft.roleName }}
      </Card>
      <h3 slot="right-title">所有角色</h3>
      <Card class="drag-item" slot="right" slot-scope="right" :padding="3">
        {{ right.itemRight.roleName }}
      </Card>
    </DragList>
  </Modal>
</template>

<script>
import DragList from '_c/drag-list/drag-list'
import { mapActions } from 'vuex'
export default {
  name: 'RoleModal',
  components: { DragList },
  props: {
    leftList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    rightList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    },
    student: {
      type: Object
    }
  },
  data () {
    return {
      leftData: [],
      rightData: []
    }
  },
  methods: {
    ...mapActions([
      'handleAddStudentRole',
      'handleDeleteStudentRole'
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
      let roleId = this.leftData[index].id
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
      let roleId = this.rightData[index].id
      let account = this.student.account
      this.handleDeleteStudentRole({ account, roleId }).then(res => {
        console.info(res)
      })
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    modalShow: {
      get () {
        return this.show
      },
      set (val) {
        console.info(val)
      }
    },
    left: {
      get () {
        if (this.leftData.length === 0) {
          [...this.leftData] = this.leftList
        }
        return this.leftData
      },
      set (val) {
        console.info(val)
        this.leftData = val
      }
    },
    right: {
      get () {
        if (this.rightData.length === 0) {
          [...this.rightData] = this.rightList
        }
        return this.rightData
      },
      set (val) {
        console.info(val)
        this.rightData = val
      }
    }
  }
}
</script>

<style scoped>

</style>
