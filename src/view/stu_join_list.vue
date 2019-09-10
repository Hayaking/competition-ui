<template>
  <Card>
    <Input search enter-button style="width: 500px"/>
    <Table :columns="tb_head" :data="tb_res" border height="520" size="small" stripe></Table>
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
  name: 'stu_join_list',
  data () {
    return {
      tb_head: [
        {
          key: 'id',
          title: 'id'
        }, {
          key: 'worksId',
          title: '作品id'
        }, {
          key: 'competitionId',
          title: '比赛id'
        }, {
          key: 'teacherId1',
          title: '指导老师'
        }, {
          key: 'applyState',
          title: '指导教师申请状态'
        }, {
          key: 'enterState',
          title: '报名状态'
        }, {
          key: 'joinState',
          title: '参赛状态'
        }, {
          title: '操作',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.inviteLead(params.row._index)
                }
              }
            }, '编辑')
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
      this.getJoin()
    })
  },
  methods: {
    ...mapActions([
      'handleGetJoinList'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getJoin(index, this.page.size)
    },
    /**
     * 分页获取学生或教师
     */
    getJoin (pageNum = 1, pageSize = 12) {
      this.handleGetJoinList({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    }
  }
}
</script>

<style scoped>

</style>
