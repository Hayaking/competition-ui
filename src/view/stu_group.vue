<template>
  <Card>
    <Table :data="tb_res" :columns="tb_head">
      <template slot-scope="{ row, index }" slot="group.name">
        {{row.group.name}}
      </template>
      <template slot-scope="{ row, index }" slot="group.creator">
        {{row.group.creator}}
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

export default {
  name: 'stu_group',
  data () {
    return {
      page: {
        current: 1,
        size: 12,
        total: 0,
        records: []
      },
      tb_head: [
        {
          title: '组名',
          slot: 'group.name'
        }, {
          title: 'creator',
          slot: 'group.creator'
        }
      ],
      tb_res: []
    }
  },
  mounted () {
    this.getGroupPage()
  },
  methods: {
    ...mapActions([
      'handleGetStudentGroup'
    ]),
    getGroupPage (pageNum = 1, pageSize = 12) {
      this.handleGetStudentGroup({ pageNum, pageSize }).then(res => {
        this.page = res
        this.tb_res = res.records
      })
    },
    pageChange (index) {
      this.page.current = index
      this.getGroupPage(index, this.page.size)
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
