<template>
  <Modal
    :footer-hide="true"
    @on-cancel="cancel"
    :fullscreen="fullscreen"
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
        <Table :columns="tb_head1" :data="tb_res1" border height="520" size="small" stripe>
          <template slot-scope="{ row, index }" slot="action">
            <Button v-if="row.state === '邀请成功'" type="error" size="small" @click="remove(row.id)">
              删除
            </Button>
            <Button v-else type="success" size="small" disabled >
              {{row.state}}
            </Button>
          </template>
        </Table>
      </Col>
      <Col span="11" offset="2">
        <Table :columns="tb_head2" :data="tb_res2" border height="520" size="small" stripe>
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
import { mapActions } from 'vuex'

export default {
  name: 'group-invite-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    groupId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      getter: this.$store.getters,
      fullscreen: false,
      tb_head1: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }, {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tb_res1: [],
      tb_head2: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }, {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tb_res2: [],
      groupList: []
    }
  },
  methods: {
    ...mapActions([
      'handleInviteTeacherMember',
      'handleGetTeacherGroup',
      'handleGetAllTeacher',
      'handleRemoveTeacherFromGroup'
    ]),
    full () {
      this.fullscreen = !this.fullscreen
    },
    cancel () {
      this.$emit('cancel')
    },
    /**
     * 差集
     */
    differSet () {
      this.tb_res2 = this.tb_res2.filter(item => {
        return this.tb_res1.every((i) => {
          return i.id !== item.id
        })
      })
    },
    invite (index) {
      let params = {
        groupId: this.groupId,
        teacherId: this.tb_res2[index].id
      }
      this.handleInviteTeacherMember(params).then(res => {
        if (res) {
          this.$store.dispatch('handleGetTeacherByGroupId', { groupId: this.groupId }).then(r => {
            this.tb_res1 = r
            this.tb_res2 = this.allTeacher
            this.differSet()
            this.$Message.info('邀请中')
          })
        }
      })
    },
    remove (id) {
      console.info(id)
      this.handleRemoveTeacherFromGroup({ groupId: this.groupId, teacherId: id }).then(res => {
        if (res) {
          this.$Message.info('!')
          this.differSet()
        } else {
          this.$Message.info('?')
        }
      })
    },
    /**
     * 获取教师所在工作组
     */
    getTeacherGroup () {
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
        this.groupId = res[0].id
      })
    },
    /**
     * 获取所有教师
     */
    getAllTeacher () {
      this.handleGetAllTeacher().then(res => {
        this.tb_res2 = res
      })
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
    allTeacher () {
      return this.getter.getAllTeacher
    }
  },
  watch: {
    groupId (val) {
      this.$store.dispatch('handleGetTeacherByGroupId', { groupId: val }).then(res => {
        this.tb_res1 = res
        this.tb_res2 = this.allTeacher
        this.differSet()
      })
    }
  }
}
</script>

<style scoped>

</style>
