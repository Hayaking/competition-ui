<template>
  <Card>
    <Input search enter-button style="width: 500px"/>
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
import api_request from '@/libs/api.request'
import { dateFomat } from '@/libs/tools'

export default {
  name: 'review_apply_competition',
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
      currentGroupId: 0,
      url: api_request.baseUrl,
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
        }, {
          title: '主办方',
          key: 'org',
          width: 100
        }, {
          title: '竞赛级别',
          key: 'type',
          width: 100
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
          key: 'cpStartState',
          width: 100,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.enterState === '已开始' ? 'success' : params.row.enterState === '结束' ? 'default' : 'primary'
              }
            }, params.row.enterState)
          }
        }, {
          title: '审核状态',
          fixed: 'right',
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
        }, {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.download(params.row.id)
                  }
                }
              }, '下载申请表')
            ])
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
      this.getGroup()
      this.getApply()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetTeacherGroup',
      'handleGetByGroupId',
      'handleGetAll',
      'handleSetState'
    ]),
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        if (res) {
          this.competitionType = this.getter.getCompetitionType
        } else {
          this.$Message.error('获取竞赛类型失败')
        }
      })
    },
    getGroup () {
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
      })
    },
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetAll({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    review (id, flag) {
      this.handleSetState({ id, flag }).then(res => {
        if (res) {
          this.getApply()
        }
      })
    },
    download (id) {
      window.open(this.url + '/word/' + id + '.doc')
    }
  }
}
</script>

<style scoped>

</style>
