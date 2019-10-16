<template>
  <Card>
    <div slot="title">
      <Input search
             enter-button
             style="width: 500px"
             @on-change="search"
             v-model="key"/>
    </div>
    <Table :columns="tb_head" :data="tb_res" stripe border ></Table>
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
import CompetitionExpand from '@/view/components/table-expand/competition-expand'
import CompetitionAction from '@/view/components/action-expand/admin-competition-expand'

export default {
  name: 'admin_competition',
  components: { CompetitionExpand, CompetitionAction },
  data () {
    return {
      key: '',
      getter: this.$store.getters,
      competition: {
        name: '',
        startTime: '',
        org: '',
        personInCharge: '',
        type: ''
      },
      currentGroupId: 0,
      competitionType: [],
      tb_head: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(CompetitionExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'id',
          key: 'id',
          width: 100
        },
        {
          title: '竞赛名',
          key: 'name',
          width: 200
        },
        {
          title: '竞赛级别',
          key: 'type'
        },
        {
          title: '主办方',
          key: 'org'
        },
        {
          title: '协办方',
          key: 'coOrg'
        },
        {
          title: '报名状态',
          key: 'enterState',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.enterState === '已开始' ? 'success' : params.row.enterState === '结束' ? 'default' : 'primary'
              }
            }, params.row.enterState)
          }
        },
        {
          title: '开始状态',
          key: 'cpStartState',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.enterState === '已开始' ? 'success' : params.row.enterState === '结束' ? 'default' : 'primary'
              }
            }, params.row.enterState)
          }
        },
        {
          title: '审核状态',
          width: 80,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.state === '申请中' ? 'info' : params.row.state === '通过' ? 'success' : 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.review(params.row.id, params.row.state !== '通过')
                }
              }
            }, params.row.state)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h(CompetitionAction, {
              props: {
                row: params.row
              }
            })
          }
        }
      ],
      tb_res: [],
      page: {
        current: 1,
        page_size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
      this.getApplyPage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetAllCompetition',
      'handleSetState',
      'handleSearchCompetition'
    ]),
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.competitionType = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    },
    pageChange (index) {
      this.page.current = index
      this.getApplyPage(index, this.page.size)
    },
    getApplyPage (pageNum = 1, pageSize = 12) {
      this.handleGetAllCompetition({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    review (id, flag) {
      this.handleSetState({ id, flag }).then(res => {
        if (res) {
          this.getApplyPage()
        }
      })
    },
    search () {
      if (this.key === '') {
        this.getApplyPage()
        return
      }
      let params = {
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }
      this.handleSearchCompetition(params).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    }
  }
}
</script>

<style scoped>

</style>
