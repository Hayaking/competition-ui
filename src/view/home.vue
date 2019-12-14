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
    <br>
    <Row>
      <Col span="17">
        <Card title="比赛" >
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <CompetitionList :competition-list="res_gs"/>
        </Card>
      </Col>
      <Col span="6" offset="1">
        <Card title="获奖排行">
          <a href="#" slot="extra" @click="more">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <List>
            <div v-for="(item,index) in priceRank" :key="index">
              <ListItem>
                <ListItemMeta :title="item.stuName"
                              description="描述" />
                <template slot="action">
                  <li>
                    <a href="#">{{item.priceNum}}</a>
                  </li>
                </template>
              </ListItem>
            </div>
          </List>
        </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Card title="最近获奖状况" :padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <Table :columns="PRICE_HEAD" :data="priceList">
            <template slot="members" slot-scope="{row,index}">
              <div v-for="(item,index) in row.join.works.studentGroup.members" :key="index">
                {{item.student.stuName}}
              </div>
            </template>
            <template slot="competitionName" slot-scope="{ row, index }">
              <div>{{row.join.competition.name}}</div>
            </template>
            <template slot="type" slot-scope="{ row, index }">
              <div>{{row.type.typeName}}</div>
            </template>
          </Table>
<!--          {{priceList}}-->
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import CompetitionList from '@/view/components/list/competition-list'
import { mapActions } from 'vuex'

export default{
  name: 'home',
  components: { CompetitionList },
  data () {
    return {
      res_gs: [],
      priceRank: [],
      priceList: [],
      PRICE_HEAD: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '参赛人员',
          slot: 'members'
        },
        {
          title: '比赛名',
          slot: 'competitionName'
        },
        {
          title: '获奖类型',
          slot: 'type'
        },
        {
          title: '获奖时间',
          key: 'priceTime'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 比赛
      this.getCompetition()
      // 排名
      this.getPriceRank()
      this.getRecentLyPrice()
    })
  },
  methods: {
    ...mapActions([
      'handleGetHomeCompetition',
      'handleGetTop5PriceStudent',
      'handleRecentlyPrice'
    ]),
    more () {
      this.$router.push({ name: 'common_competition_list' })
    },
    getCompetition () {
      this.handleGetHomeCompetition({ typeId: 4 }).then(res => {
        this.res_gs = res.body.map(item => {
          return {
            title: item.name,
            description: '简介：' + item.intro + ', 主办方：' + item.org
          }
        })
      })
    },
    getPriceRank () {
      this.handleGetTop5PriceStudent().then(res => {
        this.priceRank = res.body
      })
    },
    getRecentLyPrice () {
      this.handleRecentlyPrice().then(res => {
        this.priceList = res.body
      })
    }
  }
}
</script>

<style scoped>

</style>
