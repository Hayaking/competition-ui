<template>
  <Card  style="margin-bottom: 18px">
    <div slot="title">
      <Icon type="ios-cafe"/>
      参赛
    </div>
    <div slot="extra">
      <a @click="more">更多</a>
    </div>
    {{joinList}}
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
