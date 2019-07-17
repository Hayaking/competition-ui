<template>
  <Card>
    <Row>
      <Col span="11">
        <Row>
          <Select v-model="groupId">
            <Option :key="item.id" :value="item.id" v-for="item in groupList">
              {{item.groupName}}
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
export default {
  name: 'invite_teacher_member',
  data () {
    return {
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
            return h('div', [
              h('Button', {
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
            ])
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
      tb_res2_back: [],
      groupId: -1,
      groupList: []
    }
  },
  mounted () {
    this.$store.dispatch('handleGetAllTeacher').then(res => {
      this.tb_res2 = res
      this.tb_res2_back = res
    })
    this.$store.dispatch('handleGetTeacherGroup').then(res => {
      this.groupList = res
    })
  },
  methods: {
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
      this.$Message.info('邀请中')
    }
  },
  watch: {
    groupId (val) {
      this.$store.dispatch('handleGetTeacherByGroupId', { groupId: val }).then(res => {
        this.tb_res1 = res
        this.tb_res2 = this.tb_res2_back
        this.differSet()
      })
    }
  }
}
</script>

<style scoped>

</style>
