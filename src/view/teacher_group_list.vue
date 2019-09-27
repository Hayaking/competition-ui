<template>
  <Card>
    <Table :columns="tb_head" :data="tb_res" stripe>
      <template slot-scope="{ row, index }" slot="creator">
        <div>{{row.creator.teacherName}}</div>
      </template>
    </Table>
    <Page :current="page.current"
          :page-size="page.page_size"
          :total="page.total"
          @on-change="pageChange"
          show-total
    />
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'teacher_group_list',
  data () {
    return {
      key: '',
      tb_head: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '创建者',
          slot: 'creator'
        },
        {
          title: '申请理由',
          key: 'reason'
        },
        {
          title: '申请时间',
          key: 'createTime'
        },
        {
          title: '状态',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.state === '通过' ? 'success' : params.row.state === '申请中' ? 'default' : 'error'
              }
            }, params.row.state)
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
      'handleGetTeacherGroupByPage',
      'handleSetTeacherGroupState',
      'handleSearchTeacherGroup'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApply(index, this.page.size)
    },
    /**
       * 分页获取学生或教师
       */
    getApply (pageNum = 1, pageSize = 12) {
      this.handleGetTeacherGroupByPage({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    }
  }

}
</script>

<style scoped>

</style>
