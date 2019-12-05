<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      比赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
    <div style="text-align:center" v-if="this.competitionList.length ===0">
      <Divider>
        <div style="color:#9ea7b4;font-size: 12px">什么比赛也没有</div>
      </Divider>

    </div>
    <div v-else>
      <List>
        <ListItem :key="index" v-for="(item,index) in this.competitionList">
          <ListItemMeta :description='"简介："+item.intro'
                        :title="item.name"
                        avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"/>
          <template slot="action">
            <tag color="success" v-if="item.state === 1">审核通过</tag>
            <tag color="primary" v-else-if="item.state === 0">未审核</tag>
            <tag color="error" v-else-if="item.state === -1">未通过审核</tag>
          </template>
        </ListItem>
      </List>
    </div>
  </Card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'competition-card',
  data () {
    return {
      competitionList: []
    }
  },
  methods: {
    ...mapMutations([
      'closeTag',
      'setTeacherGroupForCompetitionList'
    ]),
    ...mapActions([
      'handleGetSimpleCompetitionListByGroupId'
    ]),
    more () {
      this.groupForEnterList = this.group
      this.$router.push({ name: 'group_competition_list' })
    },
    getCompetitionList (id) {
      this.handleGetSimpleCompetitionListByGroupId({ groupId: id }).then(res => {
        res.flag
          ? this.competitionList = res.body
          : console.info('失败')
      })
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroup',
      'getTeacherGroupForCompetitionList'
    ]),
    group () {
      return this.getTeacherGroup
    },
    groupForEnterList: {
      get () {
        return this.getTeacherGroupForCompetitionList
      },
      set (val) {
        this.setTeacherGroupForCompetitionList(val)
      }
    }
  },
  watch: {
    group: {
      handler (val) {
        this.getCompetitionList(val.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
