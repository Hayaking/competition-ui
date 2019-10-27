<template>
  <div>
    <Row>
      <Col span="24">
        <Card title="公告" :padding="0">
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <br>
          <br>
          <br>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="11">
        <Card title="国赛" >
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <CompetitionList :competition-list="res_gs"/>
        </Card>
      </Col>
      <Col span="11" offset="2">
        <Card title="省赛">
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <CompetitionList :competition-list="res_ss"/>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card title="最近获奖状况" :padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import CompetitionList from '@/view/components/list/competition-list'
export default{
  name: 'home',
  components: { CompetitionList },
  data () {
    return {
      res_gs: [],
      res_ss: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 国赛
      this.$store.dispatch('handleGet5CompetitionByTypeId', { typeId: 4 }).then(res => {
        this.res_gs = res.map(item => {
          return {
            title: item.name,
            description: '简介：' + item.intro + ', 主办方：' + item.org
          }
        })
      })
      // 省赛
      this.$store.dispatch('handleGet5CompetitionByTypeId', { typeId: 3 }).then(res => {
        this.res_ss = res.map(item => {
          return {
            title: item.name,
            description: '简介：' + item.intro + ', 主办方：' + item.org
          }
        })
      })
    })
  },
  methods: {
    more () {
      this.$router.push({ name: 'common_competition' })
    }
  }
}
</script>

<style scoped>

</style>
