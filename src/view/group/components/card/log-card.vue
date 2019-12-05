<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      动态
    </div>
    <List>
      <ListItem :key="index" v-for="(item,index) in this.page.records">
        <ListItemMeta :description="item.createTime" :title="item.action"/>
        <div slot="extra">
          <Time :time="item.createTime" />
        </div>
      </ListItem>
    </List>
    <Page show-total
          :total="page.total"
          :current="page.current"
          :page-size="page.size"
          @on-change = "pageChange"
    />
  </Card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'competition-card',
  data () {
    return {
      logList: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
        records: []
      }
    }
  },
  methods: {
    ...mapMutations([
      'closeTag',
      'setTeacherGroupForCompetitionList'
    ]),
    ...mapActions([
      'handleGetTeacherGroupLog'
    ]),
    pageChange (index) {
      this.page.current = index
      this.getLogList(this.group.id, index, this.page.size)
    },
    getLogList (groupId, pageNum = 1, pageSize = 5) {
      this.handleGetTeacherGroupLog({ groupId, pageNum, pageSize }).then(res => {
        res.flag
          ? this.page = res.body
          : console.info('失败')
      })
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroup'
    ]),
    group () {
      return this.getTeacherGroup
    }
  },
  watch: {
    group: {
      handler (val) {
        this.getLogList(val.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
