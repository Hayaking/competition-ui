<template>
  <Card>
    <Input search
           enter-button
           style="width: 500px"
           @on-change="search"
           v-model="key"/>
    <Table :columns="tb_head" :data="tb_res" stripe border >
      <template slot-scope="{ row, index }" slot="action">
        <Button v-if="row.applyState === '通过'" @click="review(row.id,false)">取消</Button>
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

export default {
  name: 'lead_review',
  data () {
    return {
      key: '',
      tb_head: [
        {
          key: 'id',
          title: 'id'
        }, {
          title: '作品id',
          key: 'works'
        }, {
          title: '比赛id',
          key: 'competition'
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
          slot: 'action'
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
      this.getApplyPage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetLeadApplyPage',
      'handleSetLeadApplyState'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getApplyPage(index, this.page.size)
    },
    getApplyPage (pageNum = 1, pageSize = 12) {
      this.handleGetLeadApplyPage({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
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
      let params = {
        key: this.key,
        pageNum: this.page.current,
        pageSize: this.page.size
      }
      this.handleSearchCompetition(params).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    }
  }
}
</script>

<style scoped>

</style>
