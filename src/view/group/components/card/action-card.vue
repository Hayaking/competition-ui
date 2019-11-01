<template>
  <Card title="快捷操作" style="margin-bottom: 18px">
    <Row>
      <Col span="7" offset="3">
        <a @click="toCreateCompetition">
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
    this.$nextTick(() => {
      this.getGroupList()
    })
  },
  data () {
    return {
      groupList: [],
      groupId: 0
    }
  },
  methods: {
    ...mapActions([
      'handleGetTeacherGroupByPage'
    ]),
    ...mapMutations([
      'setTeacherGroup'
    ]),
    toCreateCompetition () {
      this.$emit('callCreateCompetition')
    },
    toInvite () {
      this.$emit('callInvite', this.group.id)
    },
    toPost () {
      this.$router.push({ name: 'group_post' })
    },
    getGroupList (pageNum = 1, pageSize = 12) {
      this.handleGetTeacherGroupByPage({ pageNum, pageSize }).then(res => {
        this.groupList = res.records
        this.group = res.records[0]
        this.groupId = res.records[0].id
      })
    },
    selectChanged (id) {
      this.group = this.groupList.find(item => {
        return item.id === id
      })
    }
  },
  computed: {
    ...mapGetters([
      'getTeacherGroup'
    ]),
    group: {
      get () {
        return this.getTeacherGroup
      },
      set (val) {
        this.setTeacherGroup(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
