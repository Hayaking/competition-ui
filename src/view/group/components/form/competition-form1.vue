<template>
  <Form :hide-required-mark="true"
        :label-width="120"
        :model="competition"
        :rules="rules"
        label-position="right"
        ref="form">
    <Row>
      <Col span="11">
        <FormItem label="比赛名称：" prop="name">
          <Input v-model="competition.name"/>
        </FormItem>
      </Col>
      <Col offset="2" span="11">
        <FormItem label="负责人：" prop="personInChargeId">
          <Input v-model="competition.personInChargeId"/>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="6">
        <FormItem label="预期参赛队数：" prop="exGroupNum">
          <InputNumber :max="9999" :min="1" v-model="competition.exGroupNum"/>
        </FormItem>
      </Col>
      <Col span="5">
        <FormItem label="预期参赛人数：" prop="exStuNum">
          <InputNumber :max="9999" :min="1" v-model="competition.exStuNum"/>
        </FormItem>
      </Col>
      <Col span="13">
        <FormItem label="预设奖项：" prop="prePrice">
          <Input v-model="competition.prePrice"/>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="比赛介绍" prop="intro">
      <Input :rows="4" placeholder="比赛介绍" type="textarea" v-model="competition.intro"/>
    </FormItem>
    <FormItem label="比赛条件" prop="exCondition">
      <Input :rows="4" placeholder="比赛条件" type="textarea" v-model="competition.exCondition"/>
    </FormItem>
    <FormItem label="比赛过程" prop="process">
      <Input :rows="4" placeholder="比赛过程" type="textarea" v-model="competition.process"/>
    </FormItem>
    <FormItem label="预期结果" prop="exRes">
      <Input :rows="4" placeholder="预期结果" type="textarea" v-model="competition.exRes"/>
    </FormItem>
  </Form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      rules: {
        name: [{ required: true, message: '不为空' }],
        personInChargeId: [{ required: true, message: '不为空' }],
        exGroupNum: [{ required: true, message: '不为空' }],
        exStuNum: [{ required: true, message: '不为空' }],
        prePrice: [{ required: true, message: '不为空' }],
        intro: [{ required: true, message: '不为空' }],
        exCondition: [{ required: true, message: '不为空' }],
        process: [{ required: true, message: '不为空' }],
        exRes: [{ required: true, message: '不为空' }]
      }
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetTeacherGroupList'
    ]),
    ...mapMutations([
      'setCreateCompetition'
    ]),
    submit () {
      this.$refs.form.validate(res => {
        this.$emit('callBack', res)
      })
      // this.$emit('on-success-valid', true)
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
  },
  watch: {
    flag (newVal) {
      if (newVal) {
        this.submit()
      }
    }
  }
}
</script>

<style scoped>

</style>
