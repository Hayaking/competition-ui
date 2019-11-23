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
      groupId: -1,
      groupList: []
    }
  },
  mounted () {
    this.getTeacherGroup()
    this.getAllTeacher()
  },
  methods: {
    ...mapActions([
      'handleInviteTeacherMember',
      'handleGetTeacherGroupList',
      'handleGetAllTeacher',
      'handleRemoveTeacherFromGroup'
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
      this.handleGetTeacherGroupList().then(res => {
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
