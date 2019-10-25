<template>
  <div>
    <div :key="index" v-for="(item,index) in formList">
      <Form :label-width="70"
            :model="item"
            :rules="rules"
            label-position="left"
            ref="form">
        <h2>{{COMPETITION_TYPE[item.typeId-1].typeName}}</h2>
        <Row>
          <Col span="11">
            <FormItem label="报名时间" prop="enterDate">
              <DatePicker type="daterange" v-model="item.enterDate"></DatePicker>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="比赛时间" prop="startDate">
              <DatePicker type="daterange" v-model="item.startDate"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="报名费" prop="enter">
              <Input v-model="item.enter"/>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="差旅费" prop="travel">
              <Input v-model="item.travel"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="材料费：" prop="thing">
              <Input v-model="item.thing"/>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="其他费用：" prop="other">
              <Input v-model="item.other"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="计算依据及理由：" prop="reason">
              <Input type="textarea" v-model="item.reason"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <Select v-model="typeId">
      <Option :key="index"
              :value="item.id"
              v-for="(item,index) in COMPETITION_TYPE">
        {{item.typeName}}
      </Option>
    </Select>
    <Button @click="handleAdd" icon="md-add" long type="dashed">Add item</Button>
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
      budgets: [],
      formList: [],
      typeId: 0
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
      this.handleGetType({ type: 'competition' }).then(res => {
        res.flag
          ? this.COMPETITION_TYPE = res.body
          : this.$Message.error('获取竞赛类型失败')
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetType'
    ]),
    submit () {
      let res = { flag: true, formList: this.formList }
      this.$emit('on-success-valid', res)
    },
    handleAdd () {
      this.formList.push({
        // 比赛进程
        enterDate: [],
        startDate: [],
        typeId: this.typeId,
        // 预算
        enter: '',
        travel: '',
        thing: '',
        other: '',
        reason: ''
      })
    }
  },
  computed: {
    typeList () {
      // 返回有效类型区间
      let arr = this.COMPETITION_TYPE.filter(item => {
        if (item.id >= this.minLevelId && item.id <= this.maxLevelId) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.budgets.push({
            enter: '',
            travel: '',
            thing: '',
            other: '',
            reason: '',
            typeId: item.id
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
