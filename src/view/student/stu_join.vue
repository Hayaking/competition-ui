<template>
  <div>
    <Card title="参赛">
      <div slot="extra">
        <Button @click="next(false)" type="default" v-if="index!==0">上一步</Button>
        <Button @click="submit" type="default" v-if="index===4">提交</Button>
        <Button @click="next(true)" type="success" v-if="index===3">确认</Button>
        <Button @click="next(true)" type="primary" v-if="index<3">下一步</Button>
      </div>
      <Row>
        <Col span="24" style="text-align: center">
          <CompetitionInfo v-if="index ===0" @call-back="callBack1" :flag="flag1"/>
          <GroupForm v-if="index ===1" @call-back="callBack2" :flag="flag2"/>
          <WorksForm v-if="index ===2" @on-success-valid="callForm3" :flag="flag3"/>
          <LeadForm  v-if="index ===3" @on-success-valid="callForm4" :flag="flag4"/>
          <div v-if="index ===4">
            <Row>
              <Col span="10" style="text-align: right">
                <h3>小组：</h3>
              </Col>
              <Col span="12" style="text-align: left">
                <div v-if="group.name">{{group.name}}</div>
                <div v-else>无</div>
              </Col>
            </Row>
            <Row>
              <Col span="10" style="text-align: right">
                <h3>参赛人员：</h3>
              </Col>
              <Col span="12" style="text-align: left">
                <div v-if="list.length>0">{{list}}</div>
                <div v-else>无</div>
              </Col>
            </Row>
            <Row>
              <Col span="10" style="text-align: right">
                <h3>作品名：</h3>
              </Col>
              <Col span="12" style="text-align: left">
                <div v-if="works.woksName">{{works.worksName}}</div>
                <div v-else>无</div>
              </Col>
            </Row>
            <Row>
              <Col span="10" style="text-align: right">
                <h3>作品描述：</h3>
              </Col>
              <Col span="12" style="text-align: left">
                <div v-if="works.des">{{works.des}}</div>
                <div v-else>无</div>
              </Col>
            </Row>
            <Row>
              <Col span="10" style="text-align: right">
                <h3>指导老师：</h3>
              </Col>
              <Col span="12" style="text-align: left">
                 <div>指导老师1：<span v-if="join.teacherId1 ===0">无</span></div>
                 <div>指导老师2：<span v-if="join.teacherId2 ===0">无</span></div>
              </Col>
            </Row>
          </div>
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
      flag4: false,
      isSingle: false,
      isNeedWorks: false
    }
  },
  methods: {
    ...mapMutations([
      'closeTag',
      'setEnterHolderJoin',
      'setEnterHolderGroup',
      'setEnterHolderWorks',
      'setEnterHolderList',
      'setRefreshFlag'
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
          this.refreshFlag = !this.refreshFlag
          this.$router.push({ name: 'stu_join_list' })
        } else {
          this.$Message.error('失败')
        }
      })
    },
    callBack1 (isSingle, isNeedWorks) {
      this.isSingle = isSingle
      this.isNeedWorks = isNeedWorks
      this.join.competitionId = this.competition.id
      this.join.joinTypeId = this.competition.joinTypeId
      if (isSingle) {
        if (isNeedWorks) this.index += 2
        else this.index += 3
      } else {
        this.index++
      }
    },
    callBack2 (flag) {
      if (flag) {
        this.group.name = this.groupName
        if (this.isNeedWorks) {
          this.index++
        } else {
          this.index += 2
        }
      } else {
        this.flag2 = false
      }
    },
    callForm3 (flag) {
      if (flag) {
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
        if (this.index === 2 && this.isSingle) {
          this.index = 0
        } else if (this.index === 2 && !this.isSingle) {
          this.index = 1
        } else if (this.index === 3 && this.isNeedWorks) {
          this.index = 2
        } else if (this.index === 3 && !this.isNeedWorks && this.isSingle) {
          this.index = 0
        } else if (this.index === 3 && !this.isNeedWorks && !this.isSingle) {
          this.index = 1
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
      'getEnterGroupName',
      'getRefreshFlag'
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
    },
    refreshFlag: {
      get () {
        return this.getRefreshFlag
      },
      set (val) {
        this.setRefreshFlag(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
