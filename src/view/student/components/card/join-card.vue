<template>
  <Card  style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      参赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
    <div v-if="joinList.length===0">
      <Divider>
        <div style="color:#9ea7b4;font-size: 12px">什么都没有</div>
      </Divider>
    </div>
    <div v-else>
      <List>
        <ListItem v-for="(item,index) in joinList"
                  :key="index"
                  v-if="item.competition !== undefined">
          <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                        :title="item.competition.name"
                        :description='"简介："+item.competition.intro'/>
          <template slot="action">
            <!--          <tag color="success">报名通过</tag>-->
          </template>
        </ListItem>
      </List>
    </div>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'join-card',
  methods: {
    ...mapActions([
      'handleGetSimpleJoinList'
    ]),
    more () {
      this.$router.push({ name: 'stu_join_list' })
    },
    getJoinList (id) {
      this.handleGetSimpleJoinList({ groupId: id }).then(res => {
        if (res) {
          console.info('成功')
        } else {
          this.$Message.error('失败')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getStudentGroup',
      'getSimpleJoinList'
    ]),
    group: {
      get () {
        return this.getStudentGroup
      },
      set (val) {
        this.setStudentGroup(val)
      }
    },
    joinList () {
      return this.getSimpleJoinList
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
