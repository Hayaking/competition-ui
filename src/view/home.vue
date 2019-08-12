<template>
  <div>
    <Row>
      <Col span="11">
        <Card title="国赛" padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <CompetitionCard/>
        </Card>
      </Col>
      <Col span="2">&nbsp; </Col>
      <Col span="11">
        <Card title="省赛" padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
          <CompetitionCard/>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card title="最近获奖状况" padding="0">
          <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>更多
          </a>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import CompetitionCard from '@/view/components/competition-card'
export default{
  name: 'home',
  components: { CompetitionCard },
  data () {
    return {

    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
