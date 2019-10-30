<template>
  <Card title="快捷操作" style="margin-bottom: 18px">
    <Row>
      <Col span="7" offset="3">
        <a @click="toCompetition">
          <Icon type="logo-steam" size="40" color="rgb(82, 196, 26)"/>
          <br/>参赛
        </a>
      </Col>
      <Col span="7">
        <a @click="toConfig">
          <Icon type="ios-settings" size="40" color="rgb(19, 194, 194)"/>
          <br/>设置
        </a>
      </Col>
      <Col span="7">
        <a @click="">
          <Icon type="ios-people" size="40" color="rgb(24, 144, 255)"/>
          <br/>指导老师
        </a>
      </Col>
    </Row>
    <Row>
      <Col offset="3" span="18">
        小组列表：
        <Select size="small">
          <Option v-for="(item,index) in this.groupList" :key="index">
            {{item.name}}
          </Option>
        </Select>
      </Col>
    </Row>
  </Card>
</template>

<script>
export default {
  name: 'action-card',
  props: {
    groupList: { Array }
  },
  methods: {
    toCompetition () {
      this.$router.push({ name: 'common_competition' })
    },
    toConfig () {
      this.$router.push({ name: 'common_edit_self' })
    }
  }
}
</script>

<style scoped>

</style>
