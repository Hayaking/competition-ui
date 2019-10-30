<template>
  <Card style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      比赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
    <List>
      <ListItem v-for="(item,index) in competitionList" :key="index">
        <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                      :title="item.name"
                      :description='"主办方："+item.org + "，协办方："+item.coOrg '/>
        <template slot="action">
          <tag color="success">通过审核</tag>
        </template>
      </ListItem>
    </List>
  </Card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { sleep } from '@/libs/util'

export default {
  name: 'competition-card',
  props: {
    group: { Object }
  },
  data () {
    return {
      preGroupId: 0,
      competitionList: []
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    ...mapActions([
      'handleGetSimpleCompetitionListByGroupId'
    ]),
    more () {
      this.closeTag({
        name: 'group_competition_list',
        params: {
          id: this.preGroupId,
          flag: true
        }
      })
      // }
      sleep(10).then(() => {
        this.$router.push({
          name: 'group_competition_list',
          params: {
            id: this.group.id,
            flag: true
          }
        })
        this.preGroupId = this.group.id
      })
    },
    getCompetitionList (id) {
      this.handleGetSimpleCompetitionListByGroupId({ groupId: id }).then(res => {
        this.competitionList = res.body
      })
    }
  },
  watch: {
    group: {
      handler (newVal) {
        this.getCompetitionList(newVal.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
