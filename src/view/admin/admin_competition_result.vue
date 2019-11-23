<template>
  <Card>
    <div slot="title">
      <Input search
             style="width: 300px"
             @on-change="search"
             v-model="key">
      </Input>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records" stripe border >
      <template slot-scope="{ row, index }" slot="competition">
          {{row.competition.name}}
      </template>
      <template slot-scope="{ row, index }" slot="progress">
          {{row.type.typeName}}
      </template>
      <template slot-scope="{ row, index }" slot="reviewState">
        {{reviewState(row.isReviewResult)}}
      </template>
      <template slot-scope="{ row, index }" slot="actions">
        <Button type="success" @click="review(row.id, 1)">通过</Button>
        <Button type="error" @click="review(row.id, -1)">拒绝</Button>
      </template>
    </Table>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.size"
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
      COMPETITION_TYPE: [],
      TABLE_HEAD: [
        {
          title: '竞赛名',
          slot: 'competition'
        },
        {
          title: '阶段',
          slot: 'progress'
        },
        {
          title: '审核状态',
          slot: 'reviewState'
        },
        {
          title: '操作',
          slot: 'actions'
        }
      ],
      key: '',
      page: {
        current: 1,
        size: 12,
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
      'handleGetNeedReviewProgressPage',
      'handleReviewResult'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApplyPage(index, this.page.size)
    },
    getApplyPage (pageNum = 1, pageSize = 12) {
      this.handleGetNeedReviewProgressPage({ pageNum, pageSize }).then(res => {
        this.page = res.body
      })
    },
    review (id, state) {
      this.handleReviewResult({ id, state }).then(res => {
        if (res.flag) {
          this.getApplyPage()
        }
      })
    },
    reviewState (state) {
      return state === 0
        ? '未审核'
        : state === 1 ? '审核通过' : '审核未通过'
    }
  }
}
</script>

<style scoped>

</style>
