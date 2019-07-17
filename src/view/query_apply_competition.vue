<template>
  <div>
    <Row>
        <Select v-model="currentGroupId">
          <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
            {{item.groupName}}
          </Option>
        </Select>
    </Row>

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

export default {
  name: 'apply_competition',
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
      competitionType: [],
      groupList: [],
      tb_head: [
        {
          title: 'id',
          key: 'id'
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
          key: 'type'
        }, {
          title: '审核状态',
          key: 'state',
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
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.state !== '申请中'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Message.info('撤回')
                  }
                }
              }, '取消')
            ])
          }
        }
      ],
      tb_res: [],
      page: {
        current: 1,
        page_size: 2,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('handleGetType', { type: 'competition' }).then(res => {
        this.competitionType = res
      })
      this.$store.dispatch('handleGetTeacherGroup').then(res => {
        this.groupList = res
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetByGroupId'
    ]),

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
      let groupId = this.currentGroupId
      let pageNum = this.page.current
      let pageSize = this.page.page_size
      this.handleGetByGroupId({ pageNum, pageSize, groupId }).then(res => {
        this.page.records = res.records
        this.page.total = res.length
        this.pageChange(1)
      })
    }
  },
  watch: {
    currentGroupId () {
      this.search()
    }
  }

}
</script>

<style scoped>

</style>
