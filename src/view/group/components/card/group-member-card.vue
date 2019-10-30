<template>
  <Card title="小组成员">
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
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'group-member-card',
  props: {
    group: {
      Object
    }
  },
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
        this.teacherList = res
      })
    }
  },
  watch: {
    group: {
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
