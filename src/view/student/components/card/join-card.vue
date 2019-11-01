<template>
  <Card  style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      参赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
    <List>
      <ListItem v-for="(item,index) in joinList" :key="index">
        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                      :title="item.competition.name"
                      :description='"简介："+item.competition.intro'/>
        <template slot="action">
          <tag color="success">报名通过</tag>
        </template>
      </ListItem>
    </List>
<!--    {{joinList}}-->
  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'join-card',
  props: {
    group: { Object }
  },
  data () {
    return {
      joinList: []
    }
  },
  methods: {
    ...mapActions([
      'handleGetSimpleJoinList'
    ]),
    more () {
      this.$router.push({
        name: 'stu_join_list'
      })
    },
    getJoinList (id) {
      this.handleGetSimpleJoinList({ groupId: id }).then(res => {
        this.joinList = res.body
      })
    }
  },
  watch: {
    group: {
      handler (newVal) {
        this.getJoinList(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
