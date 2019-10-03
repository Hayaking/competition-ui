<template>
  <Card>
    <Row>
      <Col span="11">
        <Row>
          <Select v-model="groupId">
            <Option :key="item.id" :value="item.id" v-for="item in groupList">
              {{item.name}}
            </Option>
          </Select>
        </Row>
        <Table :columns="tb_head1" :data="tb_res1" border height="520" size="small" stripe></Table>
      </Col>
      <Col span="11" offset="2">
        <Table :columns="tb_head2" :data="tb_res2" border height="520" size="small" stripe></Table>
      </Col>
    </Row>

  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'invite_teacher_member',
  data () {
    return {
      getter: this.$store.getters,
      tb_head1: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            if (params.row.state === '邀请成功') {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row._index)
                  }
                }
              }, '删除')
            } else {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: true
                },
                on: {
                  click: () => {
                    this.remove(params.row._index)
                  }
                }
              }, params.row.state)
            }
          }
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
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.invite(params.row._index)
                  }
                }
              }, '邀请')
            ])
          }
        }
      ],
      tb_res2: [],
      groupId: -1,
      groupList: []
    }
  },
  mounted () {
    this.$store.dispatch('handleGetTeacherGroup').then(res => {
      this.groupList = res
      this.groupId = res[0].id
    })
    this.$store.dispatch('handleGetAllTeacher').then(res => {
      this.tb_res2 = res
    })
  },
  methods: {
    ...mapActions([
      'handleInviteTeacherMember'
    ]),
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
  },
  computed: {
    allTeacher () {
      return this.getter.getAllTeacher
    }
  }
}
</script>

<style scoped>

</style>
