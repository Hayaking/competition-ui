<template>
  <div>
    <div v-for="(item,index) in typeList" :key="index">
      <Form :label-width="70"
            ref="form"
            :rules="rules"
            :model="budgets[index]"
            label-position="left">
        <h2>{{item.typeName}}</h2>
        <FormItem label="报名费" prop="enter">
          <Input v-model="budgets[index].enter"/>
        </FormItem>
        <FormItem label="差旅费" prop="travel">
          <Input v-model="budgets[index].travel"/>
        </FormItem>
        <FormItem label="材料费" prop="thing">
          <Input v-model="budgets[index].thing"/>
        </FormItem>
        <FormItem label="其他费用" prop="other">
          <Input v-model="budgets[index].other"/>
        </FormItem>
        <FormItem label="计算依据及理由" prop="reason">
          <Input v-model="budgets[index].reason"/>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      getter: this.$store.getters,
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
      COMPETITION_TYPE: [],
      JOIN_TYPE: ['单人赛', '多人赛'],
      budgets: []
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    minLevelId: {
      type: Number,
      default: 0
    },
    maxLevelId: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getCompetitionType()
    })
  },
  methods: {
    ...mapActions([
      'handleGetType'
    ]),
    submit () {
      // budgets数组直接穿过去会undefined
      let res = { flag: true, budgets: this.budgets }
      this.$emit('on-success-valid', res)
    },
    /**
     * 获取竞赛级别
     */
    getCompetitionType () {
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    }
  },
  computed: {
    typeList () {
      let arr = this.COMPETITION_TYPE.filter(item => {
        if (item.id >= this.minLevelId && item.id <= this.maxLevelId) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.budgets.push({
            enter: '',
            travel: '',
            thing: '',
            other: '',
            reason: ''
          })
          return true
        }
        return false
      })
      console.info(this.budgets)
      return arr
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
