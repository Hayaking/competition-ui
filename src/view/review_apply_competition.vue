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

export default {
  name: 'review_apply_competition',
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
      groupList: [],
      tb_head: [
        {
          title: 'id',
          key: 'id',
          width: 100
        }, {
          title: '竞赛名',
          key: 'name'
        }, {
          title: '开始时间',
          key: 'startTime'
        }, {
          title: '主办方',
          key: 'org'
        }, {
          title: '竞赛级别',
          key: 'type',
          width: 100
        }, {
          title: '审核状态',
          key: 'state',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.state === '申请中' ? 'info' : params.row.state === '通过' ? 'success' : 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, params.row.state)
            ])
          }
        }, {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.review(params.row.id, true)
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.review(params.row.id, false)
                  }
                }
              }, '拒绝'),
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
      this.getType('competition')
      this.getGroup()
      this.search()
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

    getType (type) {
      this.handleGetType({ type }).then(res => {
        this.competitionType = res
      })
    },
    getGroup () {
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
      })
    },
    pageChange (index) {
      this.page.current = index
      let start = (index - 1) * this.page.page_size
      let end = index * this.page.page_size
      this.tb_res = this.page.records.slice(start, end)
      this.tb_res.map((item) => {
        item.type = this.competitionType[item.type].typeName
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
    review (id, flag) {
      this.handleSetState({ id, flag }).then(res => {
        if (res) {
          this.search()
        }
      })
    },
    download (id) {
      console.info(this.url + '/word/' + id + '.doc')
      window.open(this.url + '/word/' + id + '.doc')
    }
  }
}
</script>

<style scoped>

</style>
