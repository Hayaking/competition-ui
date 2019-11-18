<template>
  <div>
    <Card title="填写申请资料">
      <!--工具栏-->
      <div slot="extra">
        <Button @click="next(false)" type="default" v-if="stepIndex!==0">上一步</Button>
        <Button @click="submit" type="success" v-if="stepIndex===2">提交</Button>
        <Button @click="next(true)" type="primary" v-if="stepIndex!==2">下一步</Button>
      </div>
      <Row >
        <Col span="16" offset="4" >
          <!--步骤条-->
          <FormStep :step-index="stepIndex" :step-title="STEP_TITLE"/>
          <Form1 v-if="stepIndex ===0" @on-success-valid="callBack1" :flag="flag1"/>
          <Form2 v-if="stepIndex ===1" @on-success-valid="callBack2" :flag="flag2"/>
          <Form3 v-if="stepIndex ===2" :flag="flag3" @callback="finish" />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FormStep from '@/view/components/form-step'
import Form1 from '@/view/group/components/form/competition-form1'
import Form2 from '@/view/group/components/form/competition-form2'
import Form3 from '@/view/group/components/form/competition-form3'
export default {
  name: 'group_competition',
  components: { FormStep, Form1, Form2, Form3 },
  data () {
    return {
      stepIndex: 0,
      STEP_TITLE: ['竞赛信息1', '预算', '预览信息'],
      // flag不要使用数组的形式，否则单个元素传值到子组件时，一旦发生变化watch即便开启deep也检测不到
      flag1: false,
      flag2: false,
      flag3: false,
      groupId: 0
    }
  },
  mounted () {
    this.groupId = this.$route.params.id
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    ...mapMutations([
      'setCreateCompetition'
    ]),
    /**
     * 提交比赛立项
     */
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
    callBack1 (flag) {
      if (flag) {
        this.stepIndex++
      } else {
        this.$Message.error('失败')
      }
    },
    callBack2 (flag) {
      if (flag) {
        this.competition.teacherGroupId = this.groupId
        this.stepIndex++
      } else {
        this.$Message.error('失败')
      }
    },
    submit () {
      this.flag3 = true
    },
    finish () {
      this.closeTag({
        name: 'group_competition',
        params: {
          id: this.groupId
        }
      })
      this.$router.push({ name: 'group_competition_list' })
    }
  },
  computed: {
    ...mapGetters([
      'getCreateCompetition'
    ]),
    competition: {
      get () {
        return this.getCreateCompetition
      },
      set (val) {
        this.setCreateCompetition(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
