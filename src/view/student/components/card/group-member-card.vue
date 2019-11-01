<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-people" />小组成员
    </div>
    <List>
      <ListItem v-for="(item,index) in memberList" :key="index">
        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                      :title="item.stuName"
                      :description='item.account'/>
        <template slot="action">
          <tag color="success">在线</tag>
        </template>
      </ListItem>
    </List>
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'group-member-card',
  props: {
    group: { Object }
  },
  data () {
    return {
      memberList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetStudentGroupMemberList'
    ]),
    more () {
      this.$router.push({
        name: 'stu_join_list'
      })
    },
    getMemberList (id) {
      this.handleGetStudentGroupMemberList({ groupId: id }).then(res => {
        this.memberList = res.body
      })
    }
  },
  watch: {
    group: {
      handler (newVal) {
        this.getMemberList(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
