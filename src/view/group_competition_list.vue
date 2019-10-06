<template>
  <Card>
    <div slot="title">
      <Row>
        <Col span="3">
          <Select v-model="groupId">
            <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
              {{item.name}}
            </Option>
          </Select>
        </Col>
        <Col span="5">
          <Input search
                 class="tool-bar"/>
        </Col>
        <Col span="5">
          <Button type="primary" @click="addCompetition">增加</Button>
        </Col>
      </Row>
    </div>

    <Table :columns="tb_head" :data="tb_res" stripe border >
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="toEnterList(row.id)">
          报名列表
        </Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="setEnterState(row.id, true)">
          编辑
        </Button>
        <Button type="error" size="small" @click="deleteCompetition(row.id)">
          删除
        </Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
  </Card>
</template>

<script>
import { mapActions } from 'vuex'
import { dateFomat } from '@/libs/tools'
export default {
  name: 'group_competition_list',
  data () {
    return {
      getter: this.$store.getters,
      competition: {
        name: '',
        startTime: '',
        org: '',
        personInCharge: '',
        type: ''
      },
      groupId: 0,
      competitionType: [],
      groupList: [],
      tb_head: [
        {
          title: 'id',
          key: 'id',
          width: 100,
          fixed: 'left'
        }, {
          title: '竞赛名',
          key: 'name',
          width: 200,
          fixed: 'left'
        }, {
          title: '开始时间',
          key: 'startTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.startTime))
          }
        }, {
          title: '结束时间',
          key: 'endTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.endTime))
          }
        }, {
          title: '报名开始时间',
          key: 'enterStartTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.enterStartTime))
          }
        }, {
          title: '报名结束时间',
          key: 'enterEndTime',
          width: 160,
          render: (h, params) => {
            return h('div', {}, dateFomat(params.row.enterEndTime))
          }
        },
        {
          title: '主办方',
          key: 'org',
          width: 100
        },
        {
          title: '参赛形式',
          key: 'typeJoinId',
          width: 100
        },
        {
          title: '竞赛级别',
          key: 'type',
          width: 100
        }, {
          title: '审核状态',
          key: 'state',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.state === '申请中' ? 'default' : params.row.state === '通过' ? 'success' : 'error'
              }
            }, params.row.state)
          }
        }, {
          title: '报名状态',
          key: 'enterState',
          width: 100,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.enterState === '已开始' ? 'success' : params.row.enterState === '结束' ? 'error' : 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  this.setEnterState(params.row.id, params.row.enterState !== '已开始')
                }
              }
            }, params.row.enterState)
          }
        }, {
          title: '操作',
          slot: 'action',
          width: 200,
          fixed: 'right'
        }
      ],
      tb_res: [],
      page: {
        current: 1,
        page_size: 12,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.groupId = this.$route.params.id
      this.getApply()
      this.getCompetitionType()
      // 获取该老师属于的工作组
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
        if (this.groupId === 0) {
          this.groupId = res[0].id
        }
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetByGroupId',
      'handleSetEnterState',
      'handleGetTeacherGroup',
      'handleGetType',
      'handleDeleteCompetition'
    ]),
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    /**
     * 获取竞赛
     */
    getApply (pageNum = 1, pageSize = 12) {
      let groupId = this.groupId
      this.handleGetByGroupId({ pageNum, pageSize, groupId }).then(res => {
        this.page = res
        this.tb_res = res.records
        this.tb_res.map((item) => {
          item.type = this.competitionType[item.typeId - 1].typeName
        })
      })
    },
    /**
     * 设置报名状态
     * @param id
     * @param flag
     */
    setEnterState (id, flag) {
      this.handleSetEnterState({ id, flag }).then(res => {
        if (res) {
          this.getApply()
        }
      })
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        if (res) {
          this.competitionType = this.getter.getCompetitionType
        } else {
          this.$Message.error('获取竞赛类型失败')
        }
      })
    },
    deleteCompetition (id) {
      this.$Message.info('删除' + id)
      this.handleDeleteCompetition({ id: id }).then(res => {
        if (res) {
          this.getApply()
          this.$Message.success('删除成功')
        }
      })
    },
    editCompetition () {

    },
    addCompetition () {
      this.$router.push({ name: 'group_competition' })
    },
    toEnterList (id) {
      this.$router.push({
        name: 'competition_enter_list',
        params: {
          id: id
        } })
    }
  },
  watch: {
    groupId () {
      this.getApply()
    }
  }
}
</script>

<style scoped>

</style>
