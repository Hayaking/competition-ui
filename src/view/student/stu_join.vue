<template>
  <div>
    <Card title="参赛">
      <div slot="extra">
        <Button @click="next(false)" type="default" v-if="index!==0">上一步</Button>
        <Button @click="submit" type="default" v-if="index===4">提交</Button>
        <Button @click="next(true)" type="success" v-if="index===3">确认</Button>
        <Button @click="next(true)" type="primary" v-if="index<3">下一步</Button>
      </div>
      <Row v-if="index ===0">
        <Col span="24" style="text-align: center">
          <CompetitionInfo @on-success-valid="callForm1"
                           :flag="flag1"/>
        </Col>
      </Row>
      <Row v-else-if="index ===1">
        <Col span="8" offset="8">
          <GroupForm @call-back="callForm2"
                     :flag="flag2"/>
        </Col>
      </Row>
      <Row v-else-if="index ===2">
        <Col span="8" offset="8">
          <WorksForm @on-success-valid="callForm3"
                     :flag="flag3"/>
        </Col>
      </Row>
      <Row v-else-if="index ===3">
        <Col span=16 offset="4">
          <LeadForm @on-success-valid="callForm4"
                    :flag="flag4"/>
        </Col>
      </Row>
      <Row v-else-if="index ===4">
        <Col span="24" style="text-align: center">
          小组: <div> {{group}}</div>
          小组成员: <div>{{list}}</div>
          作品：<div>{{works}}</div>
          指导老师： <div>{{join}}</div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CompetitionInfo from '@/view/student/components/form/join-form1'
import GroupForm from '@/view/student/components/form/join-form2'
import WorksForm from '@/view/student/components/form/join-form3'
import LeadForm from '@/view/student/components/form/join-form4'
import Lead_review from '@/view/lead/lead_review'
export default {
  name: 'stu_join',
  components: { Lead_review, CompetitionInfo, GroupForm, WorksForm, LeadForm },
  data () {
    return {
      index: 0,
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false
    }
  },
  methods: {
    ...mapMutations([
      'closeTag',
      'setEnterHolderJoin',
      'setEnterHolderGroup',
      'setEnterHolderWorks',
      'setEnterHolderList'
    ]),
    ...mapActions([
      'handleEnter'
    ]),
    submit () {
      let params = {
        group: this.group,
        list: this.list,
        works: this.works,
        join: this.join
      }
      this.handleEnter(params).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.closeTag({ name: 'stu_join' })
          this.$router.push({ name: 'stu_join_list' })
        } else {
          this.$Message.error('失败')
        }
      })
    },
    callForm1 (flag) {
      let offset = this.competition.joinTypeId
      if (!this.competition.isHaveWorks) {
        offset++
      }
      this.join.competitionId = this.competition.id
      this.join.joinTypeId = this.competition.joinTypeId
      this.index += offset
    },
    callForm2 (flag) {
      if (flag) {
        this.index++
      } else {
        this.flag2 = false
      }
    },
    callForm3 (flag) {
      if (flag) {
        this.group.name = this.groupName
        this.index++
      } else {
        this.flag3 = false
        this.$Message.error('失败')
      }
    },
    callForm4 (flag) {
      if (flag) {
        this.index++
      } else {
        this.flag4 = false
        this.$Message.error('失败')
      }
    },
    next (flag = true) {
      if (!flag) {
        if (this.competition.joinTypeId === 2 && this.index === 2) {
          this.index = 0
        } else {
          this.index--
        }
      }
      if (this.index === 0) {
        this.flag1 = flag
      } else if (this.index === 1) {
        this.flag2 = flag
      } else if (this.index === 2) {
        this.flag3 = flag
      } else if (this.index === 3) {
        this.flag4 = flag
      }
    }
  },
  computed: {
    ...mapGetters([
      'getEnterCompetition',
      'getEnterHolder',
      'getEnterGroupName'
    ]),
    competition () {
      return this.getEnterCompetition
    },
    groupName () {
      return this.getEnterGroupName
    },
    join: {
      get () {
        return this.getEnterHolder.join
      },
      set (val) {
        this.setEnterHolderJoin(val)
      }
    },
    group: {
      get () {
        return this.getEnterHolder.group
      },
      set (val) {
        this.setEnterHolderGroup(val)
      }
    },
    list: {
      get () {
        return this.getEnterHolder.list
      },
      set (val) {
        this.setEnterHolderList(val)
      }
    },
    works: {
      get () {
        return this.getEnterHolder.works
      },
      set (val) {
        this.setEnterHolderWorks(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
