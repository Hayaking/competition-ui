<template>
  <Card>
    <Table :columns="TABLE_HEAD" :data="page.records">
      <template slot="competitionName" slot-scope="{ row, index }">
        <div>{{row.join.competition.name}}</div>
      </template>
      <template slot="action" slot-scope="{ row, index }">
        <div>{{row.join.competition.name}}</div>
      </template>
      <template slot="type" slot-scope="{ row, index }">
        <div>{{row.type.typeName}}</div>
      </template>
    </Table>
    <Page :current="page.current"
          :page-size="page.size"
          :total="page.total"
          @on-change="pageChange"
          show-total
    />
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'price',
  data () {
    return {
      TABLE_HEAD: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '比赛名',
          slot: 'competitionName'
        },
        {
          title: '获奖类型',
          slot: 'type'
        },
        {
          title: '获奖时间',
          key: 'priceTime'
        },
        {
          title: '状态',
          key: 'priceState'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      page: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getPricePage()
    })
  },
  methods: {
    ...mapActions([
      'handleGetPriceByStudent'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getPricePage(index, this.page.size)
    },
    getPricePage (pageNum = 1, pageSize = 12) {
      this.handleGetPriceByStudent({ pageNum, pageSize }).then(res => {
        this.page = res.body
      })
    }
  }
}
</script>

<style scoped>

</style>
