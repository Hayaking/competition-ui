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
        <Col span="24" style="text-align: center">
          <GroupForm @on-success-valid="callForm2"
                     :flag="flag2"/>
        </Col>
      </Row>
      <Row v-else-if="index ===2">
        <Col span="24" style="text-align: center">
          <WorksForm @on-success-valid="callForm3"
                     :flag="flag3"/>
        </Col>
      </Row>
      <Row v-else-if="index ===3">
        <Col span="24" style="text-align: center">
          <LeadForm @on-success-valid="callForm4"
                    :flag="flag4"/>
        </Col>
      </Row>
      <Row v-else-if="index ===4">
        <Col span="24" style="text-align: center">
          小组名: <div> {{groupName}}</div>
          小组成员: <div>{{groupMember}}</div>
          作品：<div>{{works}}</div>
          指导老师： <div>{{join.teacherId1}}</div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import CompetitionInfo from '@/view/components/form/join-form1'
import GroupForm from '@/view/components/form/join-form2'
import WorksForm from '@/view/components/form/join-form3'
import LeadForm from '@/view/components/form/join-form4'
import Lead_review from '@/view/lead/lead_review'
export default {
  name: 'stu_join',
  components: { Lead_review, CompetitionInfo, GroupForm, WorksForm, LeadForm },
  data () {
    return {
      index: 0,
      competition: {},
      works: {
        worksName: ''
      },
      join: {
        competitionId: 0,
        teacherId1: 0,
        teacherId2: 0
      },
      groupName: '',
      list: [],
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    ...mapActions([
      'handleCreateJoin'
    ]),
    submit () {
      this.join.competitionId = this.competition.id
      this.join.joinTypeId = this.competition.joinTypeId
      let params = {
        group: { name: this.groupName },
        list: this.list,
        works: this.works,
        join: this.join
      }
      this.handleCreateJoin(params).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.closeTag({ name: 'stu_join' })
          this.$router.push({ name: 'stu_join_list' })
        } else {
          this.$Message.error('失败')
        }
      })
    },
    callForm1 (flag, competition) {
      this.competition = competition
      this.index += competition.joinTypeId
    },
    callForm2 (flag, list) {
      if (flag) {
        this.list = list
        this.index++
      } else {
        this.$Message.error('失败')
      }
    },
    callForm3 (flag, works) {
      this.works = works
      flag ? this.index++ : this.$Message.error('失败')
    },
    callForm4 (flag, join) {
      this.join = join
      flag ? this.index++ : this.$Message.error('失败')
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
  }
}
</script>

<style scoped>

</style>
