<template>
  <Card title="小组成员">
    <div>
      <List>
        <ListItem v-for="(item,index) in teacherList" :key="index">
          <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                        :title="item.teacherName"
                        :description="item.account" />
          <template slot="action">
            <tag color="success">在线</tag>
          </template>
        </ListItem>
      </List>
    </div>
    <div v-if="this.teacherList.length ===1" style="text-align:center">
      <Divider>
        <div style="color:#9ea7b4;font-size: 12px">就你一个人</div>
      </Divider>
    </div>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'group-member-card',
  data () {
    return {
      teacherList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetTeacherByGroupId'
    ]),
    getTeacherList (id) {
      this.handleGetTeacherByGroupId({ groupId: id }).then(res => {
        res.flag
          ? this.teacherList = res.body
          : console.info('失败')
      })
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroup'
    ])
  },
  watch: {
    getTeacherGroup: {
      handler (newVal) {
        this.getTeacherList(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
