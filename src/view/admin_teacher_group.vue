<template>
  <Card>
    <Input search enter-button style="width: 500px"/>
    <Table  :columns="tb_head" :data="tb_res" stripe></Table>
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
          title: '创建者',
          key: 'groupCreater'
        },
        {
          title: '申请时间',
          key: 'groupCreateTime'
        },
        {
          title: '状态',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: params.row.groupState === '通过' ? 'success' : params.row.groupState === '申请中' ? 'primary' : 'error'
              },
              on: {
                click: () => {
                  this.review(params.row.id, params.row.groupState !== '通过')
                }
              }
            }, params.row.groupState)
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
      this.getApply()
    })
  },
  methods: {
    ...mapActions([
      'handleGetAllTeacherGroup',
      'handleSetTeacherGroupState'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    /**
     * 分页获取学生或教师
     */
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetAllTeacherGroup({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    review (id, flag) {
      this.handleSetTeacherGroupState({ id, flag }).then(res => {
        if (res) {
          this.getApply()
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
