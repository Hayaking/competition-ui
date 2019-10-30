<template>
  <Card title="快捷操作" style="margin-bottom: 18px">
    <Row>
      <Col span="7" offset="3">
        <a @click="toCompetition">
          <Icon type="logo-steam" size="40" color="rgb(82, 196, 26)"/>
          <br/>创建工作组
        </a>
      </Col>
      <Col span="7">
        <a @click="toInvite">
          <Icon type="ios-settings" size="40" color="rgb(19, 194, 194)"/>
          <br/>邀请组员
        </a>
      </Col>
      <Col span="7">
        <a @click="toPost">
          <Icon type="ios-people" size="40" color="rgb(24, 144, 255)"/>
          <br/>发表公告
        </a>
      </Col>
    </Row>
    <Row>
      <Col offset="3" span="18">
        小组列表：
        <Select size="small"
                v-model="this.groupId"
                @on-change="selectChanged">
          <Option v-for="(item,index) in this.groupList"
                  :value="item.id"
                  :key="index">
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
    groupList: { Array },
    group: { Object }
  },
  methods: {
    toCompetition () {
      this.$emit('callCreateCompetition')
    },
    toInvite () {
      this.$emit('callInvite', this.group.id)
    },
    toPost () {
      this.$router.push({ name: 'group_post' })
    },
    selectChanged (id) {
      this.$emit('selectChanged', id)
    }
  },
  computed: {
    groupId: {
      get () {
        return this.group.id
      },
      set () {

      }
    }
  }
}
</script>

<style scoped>

</style>
