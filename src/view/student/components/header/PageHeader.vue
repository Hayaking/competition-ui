<template>
  <Card style="margin: -18px -18px 18px -18px">
    <Row>
      <Col span="23" offset="1">
        <h1>HaYa</h1>
      </Col>
    </Row>
    <Row>
      <Col span="1" offset="1">
        <Avatar icon="ios-person" size="large"></Avatar>
      </Col>
      <Col span="18">
        <h2>早安，XXX，开始您一天的工作吧！</h2>
        <div>今日阴转小雨，22℃ - 32℃，出门记得带伞哦。</div>
      </Col>
      <Col span="4">
        <Row>
          <Col span="8">
            <h3>小组数：</h3>
            <h3>{{groupSize}}</h3>
          </Col>
          <Col span="8">
            <h3>参赛数：</h3>
            <h3>{{joinSize}}</h3>
          </Col>
          <Col span="8">
            <h3>成员数：</h3>
            <h3>{{joinSize}}</h3>
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters([
      'getStudentGroupList',
      'getSimpleJoinList'
    ]),
    groupSize () {
      return this.getStudentGroupList.length
    },
    joinSize () {
      return this.getSimpleJoinList.length
    }
  }
}
</script>

<style scoped>

</style>
