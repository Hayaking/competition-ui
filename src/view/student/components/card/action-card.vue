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
        <Select size="small"
                v-model="groupId"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'action-card',
  mounted () {
    this.getGroupList()
  },
  data () {
    return {
      groupId: 0
    }
  },
  methods: {
    ...mapMutations([
      'setStudentGroup',
      'setStudentGroupList'
    ]),
    ...mapActions([
      'handleGetStudentGroupList'
    ]),
    getGroupList () {
      this.handleGetStudentGroupList().then(res => {
        if (res) {
          this.groupId = this.groupList[0].id
        } else {
          this.$Message.error('失败')
        }
      })
    },
    toCompetition () {
      this.$router.push({ name: 'common_competition' })
    },
    toConfig () {
      this.$router.push({ name: 'common_edit_self' })
    },
    selectChanged (id) {
      this.group = this.groupList.find(item => {
        return item.id === id
      })
    }
  },
  computed: {
    ...mapGetters([
      'getStudentGroup',
      'getStudentGroupList'
    ]),
    group: {
      get () {
        return this.getStudentGroup
      },
      set (val) {
        this.setStudentGroup(val)
      }
    },
    groupList: {
      get () {
        return this.getStudentGroupList
      },
      set (val) {
        this.setStudentGroupList(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
