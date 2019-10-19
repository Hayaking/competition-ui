<template>
  <div>
    <Card title="填写申请资料">
      <!--工具栏-->
      <div slot="extra">
        <Button @click="next(false)" type="default" v-if="stepIndex!==0">上一步</Button>
        <Button @click="submit" type="success" v-if="stepIndex===3">提交</Button>
        <Button @click="next(true)" type="primary" v-if="stepIndex!==3">下一步</Button>
      </div>
      <!--步骤条-->
      <Row>
        <Col span="24" style="text-align: center">
          <FormStep :step-index="stepIndex"
                    :step-title="STEP_TITLE"
          />
        </Col>
      </Row>
      <Row v-if="stepIndex ===0">
        <Col span="10" offset="7" >
          <Form1 @on-success-valid="callForm1"  :flag="flag1"/>
        </Col>
      </Row>
      <Row v-else-if="stepIndex===1">
        <Col span="10" offset="7" >
          <Form2 @on-success-valid="callForm2"  :flag="flag2"/>
        </Col>
      </Row>
      <Row v-else-if="stepIndex===2">
        <Col span="10" offset="7" >
          <Form3 @on-success-valid="callForm3"
                 :min-level-id="competition.minLevelId"
                 :max-level-id="competition.maxLevelId"
                 :flag="flag3"/>
        </Col>
      </Row>
      <Row v-else-if="stepIndex===3">
        <Col span="10" offset="7" >
          <Form4 @on-success-valid="callForm3"
                 :competition="competition"
                 :budgets="budgets"
                 :flag="flag4"/>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormStep from '@/view/components/form-step'
import Form1 from '@/view/components/form/competition-form1'
import Form2 from '@/view/components/form/competition-form2'
import Form3 from '@/view/components/form/competition-form3'
import Form4 from '@/view/components/form/competition-form4'
export default {
  name: 'group_competition',
  components: { FormStep, Form1, Form2, Form3, Form4 },
  data () {
    return {
      stepIndex: 0,
      STEP_TITLE: ['竞赛信息1', '竞赛信息2', '预算', '预览信息'],
      // flag不要使用数组的形式，否则单个元素传值到子组件时，一旦发生变化watch即便开启deep也检测不到
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      competition: {},
      budgets: []
    }
  },
  methods: {
    ...mapActions([
      'saveCompetition'
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
    next (flag = true) {
      if (!flag) {
        this.stepIndex--
      }
      if (this.stepIndex === 0) {
        this.flag1 = flag
      } else if (this.stepIndex === 1) {
        this.flag2 = flag
      } else if (this.stepIndex === 2) {
        this.flag3 = flag
      }
    },
    callForm1 (flag, competition) {
      if (flag) {
        Object.assign(this.competition, competition)
        console.info(this.competition)
        this.stepIndex++
      } else {
        this.$Message.error('失败')
      }
    },
    callForm2 (flag, competition) {
      if (flag) {
        Object.assign(this.competition, competition)
        this.stepIndex++
      } else {
        this.$Message.error('失败')
      }
    },
    callForm3 (res = { flag, budgets }) {
      if (res.flag) {
        this.budgets = res.budgets
        this.stepIndex++
      } else {
        this.$Message.error('失败')
      }
    },
    submit () {
      this.flag4 = true
    }
  }
}
</script>

<style scoped>

</style>
