<template>
  <Card>
    <div slot="title">
      <Input search style="width: 300px"/>
    </div>
    <Table :columns="TABLE_HEAD" :data="page.records">
      <template slot="members" slot-scope="{row,index}">
        <div v-for="(item,index) in row.join.works.studentGroup.members" :key="index">
          {{item.student.stuName}}
        </div>
      </template>
      <template slot="competitionName" slot-scope="{ row, index }">
        <div>{{row.join.competition.name}}</div>
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
  name: 'work_load',
  data () {
    return {
      TABLE_HEAD: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '竞赛名',
          slot: 'competitionName'
        },
        {
          title: '参赛人员',
          slot: 'members'
        },
        {
          title: '工作量',
          key: 'val'
        }
      ],
      page: {}
    }
  },
  mounted () {
    this.getWorkLoad()
  },
  methods: {
    ...mapActions([
      'handleGetSelfWorkLoad'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getWorkLoad(index, this.page.size)
    },
    getWorkLoad (pageNum = 1, pageSize = 12) {
      this.handleGetSelfWorkLoad({ pageNum, pageSize }).then(res => {
        this.page = res.body
      })
    }
  }
}
</script>

<style scoped>

</style>
