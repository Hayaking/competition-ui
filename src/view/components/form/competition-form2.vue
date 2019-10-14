<template>
  <Form :label-width="70"
        ref="form"
        :rules="rules"
        :model="competition"
        label-position="left">
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
    <FormItem label="参赛形式" prop="joinTypeId">
      <Select v-model="competition.joinTypeId">
        <Option v-for="(item,index) in JOIN_TYPE"  :value="index+1" :key="item.id">
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
  </Form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      getter: this.$store.getters,
      competition: {
        startDate: [],
        enterDate: [],
        groupNum: 0,
        stuNum: 0,
        personInCharge: '',
        joinTypeId: 0,
        process: '',
        intro: '',
        startTime: '',
        endTime: '',
        enterStartTime: '',
        enterEndTime: ''
      },
      rules: {
        startDate: [{ required: true, message: '不为空' }],
        enterDate: [{ required: true, message: '不为空' }],
        groupNum: [{ required: true, message: '不为空' }],
        stuNum: [{ required: true, message: '不为空' }],
        personInCharge: [{ required: true, message: '不为空' }],
        joinTypeId: [{ required: true, message: '不为空' }],
        process: [{ required: true, message: '不为空' }],
        intro: [{ required: true, message: '不为空' }]
      },
      competitionType: [],
      JOIN_TYPE: ['单人赛', '多人赛']
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetTeacherGroup'
    ]),
    submit () {
      // this.$refs.form.validate(res => {
      //   this.competition.startTime = this.competition.startDate[0]
      //   this.competition.endTime = this.competition.startDate[1]
      //   this.competition.enterStartTime = this.competition.enterDate[0]
      //   this.competition.enterEndTime = this.competition.enterDate[1]
      //   this.$emit('on-success-valid', res, this.competition)
      // })
      this.$emit('on-success-valid', true, this.competition)
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.competitionType = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    }
  },
  watch: {
    flag (newVal, oldVal) {
      if (newVal) {
        this.submit()
      }
    }
  }
}
</script>

<style scoped>

</style>
