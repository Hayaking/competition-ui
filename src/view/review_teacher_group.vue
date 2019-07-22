<template>
  <div>
    <Table  :columns="tb_head" :data="tb_res"></Table>
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
  name: 'review_apply_competition',
  data () {
    return {
      tb_head: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'groupName'
        },
        {
          title: '状态',
          key: 'groupState'
        },
        {
          title: '创建者',
          key: 'groupCreater'
        },
        {
          title: '申请时间',
          key: 'groupCreateTime'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.review(params.row.id, true)
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.review(params.row.id, false)
                  }
                }
              }, '拒绝')
            ])
          }
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
      this.search()
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllTeacherGroup',
      'handleSetTeacherGroupState'
    ]),
    pageChange (index) {
      this.page.current = index
      let start = (index - 1) * this.page.page_size
      let end = index * this.page.page_size
      this.tb_res = this.page.records.slice(start, end)
    },
    /**
     * 分页获取学生或教师
     */
    search () {
      let pageNum = this.page.current
      let pageSize = this.page.page_size
      this.handleGetAllTeacherGroup({ pageNum, pageSize }).then(res => {
        console.info(res)
        this.page.records = res.records
        this.page.total = res.records.length
        this.pageChange(1)
      })
    },
    review (id, flag) {
      this.handleSetTeacherGroupState({ id, flag }).then(res => {
        if (res) {
          this.search()
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
