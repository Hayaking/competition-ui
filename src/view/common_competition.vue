<template>
  <div>
    <Table :columns="tb_head" :data="tb_res" stripe border ></Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.page_size"
          @on-change = "pageChange"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import api_request from '@/libs/api.request'
import { dateFomat } from '@/libs/tools'

export default {
  name: 'common_competition',
  data () {
    return {
      competition: {
        name: '',
        startTime: '',
        org: '',
        personInCharge: '',
        type: ''
      },
      currentGroupId: 0,
      url: api_request.baseUrl,
      competitionType: [],
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
        }, {
          title: '主办方',
          key: 'org',
          width: 100
        }, {
          title: '竞赛级别',
          key: 'type',
          width: 120,
          filters: [
            {
              label: '院赛',
              value: 1
            }, {
              label: '校赛',
              value: 2
            }, {
              label: '省赛',
              value: 3
            }, {
              label: '国赛',
              value: 4
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.type === '院赛'
            } else if (value === 2) {
              return row.type === '校赛'
            } else if (value === 3) {
              return row.type === '省赛'
            } else if (value === 4) {
              return row.type === '国赛'
            }
          }
        }, {
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
        }, {
          title: '开始状态',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.startState === '已开始' ? 'success' : params.row.startState === '结束' ? 'default' : 'primary'
              }
            }, params.row.startState)
          }
        }, {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: params.row.enterState === '结束'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.enter(params.row.id)
                }
              }
            }, '参赛')
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
      this.getType('competition')
      this.search()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetAll',
      'handleGetEnterCompetition'
    ]),
    getType (type) {
      this.handleGetType({ type }).then(res => {
        this.competitionType = res
      })
    },
    pageChange (index) {
      this.page.current = index
      let start = (index - 1) * this.page.page_size
      let end = index * this.page.page_size
      this.tb_res = this.page.records.slice(start, end)
      this.tb_res.map((item) => {
        item.type = this.competitionType[item.type - 1].typeName
      })
    },
    search () {
      let pageNum = this.page.current
      let pageSize = this.page.page_size
      this.handleGetAll({ pageNum, pageSize }).then(res => {
        this.page.records = res.records
        this.page.total = res.records.length
        this.pageChange(1)
      })
    },
    enter (id) {
      this.handleGetEnterCompetition({ id }).then(res => {
        if (res) {
          this.$router.push({ name: 'stu_join' })
        } else {
          this.$Message.error('失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
