<template>
  <div>
    <Card title="填写申请资料">
      <div slot="extra">
        <Button @click="stepIndex--" type="primary" v-if="stepIndex!==0">上一步</Button>
        <Button @click="step1" type="primary">下一步</Button>
      </div>
      <!--步骤条-->
      <Row>
        <Col span="24" style="text-align: center">
          <Steps :current="stepIndex">
            <Step :title="stepTitle[0]" content="填写竞赛信息1"></Step>
            <Step :title="stepTitle[1]" content="填写竞赛信息1"></Step>
            <Step :title="stepTitle[2]" content="填写预算信息"></Step>
            <Step :title="stepTitle[3]" content="预览信息"></Step>
          </Steps>
        </Col>
      </Row>
      <Row v-if="stepIndex ===0" align="middle">
        <Col span="24" >
          <Form :label-width="70"
                ref="createForm"
                :rules="rules"
                :model="competition"
                :hide-required-mark="true"
                label-position="left">
            <Row>
              <Col offset="7" span="10">
                <FormItem label="当前工作组" prop="groupId">
                  <Select v-model="competition.teacherGroupId">
                    <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
                      {{item.name}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="比赛名称" prop = "name">
                  <Input v-model="competition.name"/>
                </FormItem>
                <FormItem label="比赛地点" prop="place">
                  <Input v-model="competition.place"/>
                </FormItem>
                <FormItem label="主办方" prop="org">
                  <Input v-model="competition.org"/>
                </FormItem>
                <FormItem label="协办方" prop="coOrg">
                  <Input v-model="competition.coOrg"/>
                </FormItem>
                <FormItem label="竞赛级别" prop="typeId">
                  <Select v-model="competition.typeId">
                    <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
                      {{item.typeName}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="最高级别" prop="highestLevel">
                  <Select v-model="competition.highestLevel">
                    <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
                      {{item.typeName}}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row v-else-if="stepIndex===1">
        <Col span="24">
          <Form :label-width="70"
                ref="createForm"
                :rules="rules"
                :model="competition"
                label-position="left">
            <Row>
              <Col span="10" offset="7">
                <FormItem label="比赛时间" prop="startDate">
                  <DatePicker type="daterange" v-model="competition.startDate"></DatePicker>
                </FormItem>
                <FormItem label="报名时间" prop="enterDate">
                  <DatePicker type="daterange" v-model="competition.enterDate"></DatePicker>
                </FormItem>
                <FormItem label="预期参赛队数" prop="groupNum">
                  <Input v-model="competition.groupNum"/>
                </FormItem>
                <FormItem label="预期参赛人数" prop="stuNum">
                  <Input v-model="competition.stuNum"/>
                </FormItem>
                <FormItem label="负责人" prop="personInCharge">
                  <Input v-model="competition.personInCharge"/>
                </FormItem>
                <FormItem label="参赛形式" prop="typeJoinId">
                  <Select v-model="competition.typeJoinId">
                    <Option v-for="(item,index) in joinType"  :value="index+1" :key="item.id">
                      {{item}}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="比赛过程" prop="process">
                  <Input :rows="4" placeholder="比赛过程" type="textarea" v-model="competition.process"/>
                </FormItem>
                <FormItem label="比赛介绍" prop="intro">
                  <Input :rows="4" placeholder="比赛介绍" type="textarea" v-model="competition.intro"/>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row v-else-if="stepIndex===2"></Row>
      <Row v-else-if="stepIndex===3"></Row>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'group_competition',
  data () {
    return {
      getter: this.$store.getters,
      competition: {
        name: '',
        startTime: '',
        endTime: '',
        enterStartTime: '',
        enterEndTime: '',
        groupNum: 0,
        stuNum: 0,
        exRes: '',
        place: '',
        org: '',
        coOrg: '',
        personInCharge: '',
        highestLevel: '',
        process: '',
        intro: '',
        typeId: '',
        groupId: '',
        startDate: [],
        enterDate: []
      },
      competitionType: [],
      joinType: ['单人赛', '多人赛'],
      groupList: [],
      rules: {
        groupId: [{ required: true, message: '不为空' }],
        name: [{ required: true, message: '不为空' }],
        groupNum: [{ required: true, message: '不为空' }],
        stuNum: [{ required: true, message: '不为空' }],
        place: [{ required: true, message: '不为空' }],
        startDate: [{ required: true, message: '不为空' }],
        enterDate: [{ required: true, message: '不为空' }],
        org: [{ required: true, message: '不为空' }],
        coOrg: [{ required: true, message: '不为空' }],
        typeId: [{ required: true, message: '不为空' }],
        personInCharge: [{ required: true, message: '不为空' }],
        highestLevel: [{ required: true, message: '不为空' }],
        typeJoinId: [{ required: true, message: '不为空' }],
        process: [{ required: true, message: '不为空' }],
        intro: [{ required: true, message: '不为空' }]
      },
      stepIndex: 0,
      stepTitle: ['进行中', '待进行', '待进行', '待进行']
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
        this.competition.groupId = res[0].id
      })
    })
  },
  methods: {
    ...mapActions([
      'saveCompetition',
      'handleGetType',
      'handleGetTeacherGroup'
    ]),
    /**
     * 提交比赛立项
     */
    save () {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.competition.startTime = this.competition.startDate[0]
          this.competition.endTime = this.competition.startDate[1]
          this.competition.enterStartTime = this.competition.enterDate[0]
          this.competition.enterEndTime = this.competition.enterDate[1]
          this.saveCompetition({ competition: this.competition }).then(res => {
            if (res) {
              this.$Message.success('保存成功')
            } else {
              this.$Message.error('保存失败')
            }
          })
        } else {
          this.$Message.error('表单')
        }
      })
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        if (res) {
          this.competitionType = this.getter.getCompetitionType
        } else {
          this.$Message.error('获取竞赛类型失败')
        }
      })
    },
    step1 () {
      this.stepIndex++
    }
  }
}
</script>

<style scoped>

</style>
