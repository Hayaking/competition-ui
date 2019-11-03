<template>
  <Modal
    :footer-hide="true"
    @on-cancel="cancel"
    :fullscreen="isFullScreen"
    width="800"
    v-model="modalShow">
    <div slot="header">
      <Row>
        <Col span="3"><h2>邀请组员</h2></Col>
        <Button @click="full"
                icon="md-qr-scanner"
                size="small"
                style="float: right;margin-right: 30px">
        </Button>
      </Row>
    </div>
    <Row>
      <Col span="11">
        <Table :columns="TABLE_HEAD_LEFT"
               :data="table_res_left"
               height="520"
               size="small"
               border
               stripe>
          <template slot-scope="{ row, index }" slot="action">
            <Button :type="buttonType(row.state)" size="small" @click="remove(row.id)">
              {{buttonText(row.state)}}
            </Button>
          </template>
        </Table>
      </Col>
      <Col span="11" offset="2">
        <Table :columns="TABLE_HEAD_RIGHT"
               :data="table_res_right"
               height="520"
               size="small"
               stripe
               border >
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="invite(row._index)">
              邀请
            </Button>
          </template>
        </Table>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'group-invite-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      isFullScreen: false,
      TABLE_HEAD_LEFT: [
        {
          title: '帐号',
          key: 'account'
        },
        {
          title: '姓名',
          key: 'teacherName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      TABLE_HEAD_RIGHT: [
        {
          title: '帐号',
          key: 'account'
        },
        {
          title: '姓名',
          key: 'teacherName'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      table_res_left: [],
      table_res_right: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleGetAllTeacher().then(res => {
        this.table_res_right = res
      })
    })
  },
  methods: {
    ...mapActions([
      'handleInviteTeacherMember',
      'handleGetAllTeacher',
      'handleGetTeacherByGroupId',
      'handleRemoveTeacherFromGroup'
    ]),
    full () {
      this.isFullScreen = !this.isFullScreen
    },
    cancel () {
      this.$emit('cancel')
    },
    /**
     * 差集
     */
    differSet () {
      this.table_res_right = this.table_res_right.filter(item => {
        return this.table_res_left.every((i) => {
          return i.id !== item.id
        })
      })
    },
    getTeacherByGroup (groupId) {
      this.handleGetTeacherByGroupId({ groupId }).then(res => {
        if (res.flag) {
          this.table_res_left = res.body
          this.table_res_right = this.allTeacher
          this.differSet()
        }
      })
    },
    invite (index) {
      this.handleInviteTeacherMember({
        groupId: this.getTeacherGroup.id,
        teacherId: this.table_res_right[index].id
      }).then(res => {
        if (res) {
          this.$Message.success('邀请中')
          this.getTeacherByGroup(this.getTeacherGroup.id)
        }
      })
    },
    remove (id) {
      this.handleRemoveTeacherFromGroup({ groupId: this.getTeacherGroup.id, teacherId: id }).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.getTeacherByGroup(this.getTeacherGroup.id)
        } else {
          this.$Message.error('失败')
        }
      })
    },
    buttonType (str) {
      if (str === '邀请成功') {
        return 'error'
      } else if (str === '邀请中') {
        return 'default'
      } else {
        return 'primary'
      }
    },
    buttonText (str) {
      if (str === '邀请成功') {
        return '删除'
      } else if (str === '邀请中') {
        return '取消'
      } else {
        return '失败'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroup',
      'getAllTeacher'
    ]),
    modalShow: {
      get () {
        return this.show
      },
      set () {}
    },
    allTeacher () {
      return this.getAllTeacher
    }
  },
  watch: {
    getTeacherGroup: {
      handler (newVal) {
        this.getTeacherByGroup(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
