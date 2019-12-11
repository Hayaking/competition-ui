<template>
  <Card>
    <div slot="title">
      <Input search
             style="width: 300px"
             @on-change="search"
             v-model="key"/>
    </div>
    <Table :columns="TABLE_HEAD"
           :data="page.records"
           stripe border >
      <template slot-scope="{ row, index }" slot="works">
        <div>{{row.works.worksName}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="competition">
        <div>{{row.competition.name}}</div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button v-if="row.applyState === '通过'" type="error" @click="review(row.id,false)">拒绝</Button>
        <Button v-else type="primary" @click="review(row.id,true)">通过</Button>
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
import JoinExpand from '@/view/components/table-expand/join-expand'

export default {
  name: 'lead_review',
  components: { JoinExpand },
  data () {
    return {
      key: '',
      TABLE_HEAD: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(JoinExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          key: 'id',
          title: 'id'
        },
        {
          title: '作品id',
          slot: 'works'
        },
        {
          title: '比赛id',
          slot: 'competition'
        },
        {
          title: '指导老师1',
          key: 'teacherId1'
        },
        {
          title: '指导老师2',
          key: 'teacherId2'
        },
        {
          title: '指导教师1申请状态',
          key: 'applyState'
        },
        {
          title: '指导教师2申请状态',
          key: 'applyState2'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
        records: []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getApplyPage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetLeadApplyPage',
      'handleSetLeadApplyState',
      'handleSearchLead'
    ]),
    pageChange (index) {
      this.page.current = index
      this.key !== ''
        ? this.search()
        : this.getApplyPage(index, this.page.size)
    },
    getApplyPage (pageNum = 1, pageSize = 12) {
      this.handleGetLeadApplyPage({ pageNum, pageSize }).then(res => {
        this.page = res
      })
    },
    review (id, flag) {
      this.handleSetLeadApplyState({ flag, joinId: id }).then(res => {
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
      this.handleSearchLead({
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }).then(res => {
        res.flag
          ? this.page = res.body
          : this.$Message.error('失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
