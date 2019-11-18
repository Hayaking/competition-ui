<template>
  <div>
    <div :key="index" v-for="(item,index) in formList">
      <Form :label-width="120"
            :model="item"
            :rules="rules"
            label-position="right"
            ref="form">
        <Row>
          <Col span="20">
            <Divider orientation="left"><h2>阶段{{index +1}}</h2></Divider>
          </Col>
          <Col span="4">
            <Divider orientation="left"><Button>删除</Button></Divider>
          </Col>
        </Row>
        <!--需要参赛作品 && 是单人赛-->
        <Row>
          <Col span="11">
            <FormItem label="需要参赛作品：">
              <i-switch :value="item.isNeedWorks" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="是单人赛：">
              <i-switch :value="item.isSingle" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <!--阶段名 && 阶段级别-->
        <Row>
          <Col span="11">
            <FormItem label="名称：" prop="enter">
              <Input v-model="item.name"/>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="级别：">
              <Input :disabled="true" v-model="COMPETITION_TYPE[item.typeId-1].typeName"/>
            </FormItem>
          </Col>
        </Row>
        <!--报名时间 && 比赛时间-->
        <Row>
          <Col span="11">
            <FormItem label="报名时间：" prop="enterDate">
              <DatePicker type="datetimerange" v-model="item.enterDate"></DatePicker>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="比赛时间：" prop="startDate">
              <DatePicker type="datetimerange" v-model="item.startDate"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <!-- 主办方 && 协办方 && 比赛地点-->
        <Row>
          <Col span="8">
            <FormItem label="主办方：" prop="enter">
              <Input v-model="item.org"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="协办方：">
              <Input :disabled="true" v-model="item.coOrg"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="比赛地点：">
              <Input :disabled="true" v-model="item.place"/>
            </FormItem>
          </Col>
        </Row>
        <!--预算-->
        <Row>
          <Col span="4">
            <FormItem label="报名费：" prop="enter">
              <InputNumber  v-model="item.enter"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="差旅费：" prop="travel">
              <InputNumber  v-model="item.travel"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="材料费：" prop="thing">
              <InputNumber  v-model="item.thing"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="其他费用：" prop="other">
              <InputNumber  v-model="item.other"/>
            </FormItem>
          </Col>
        </Row>
        <!--计算依据及理由-->
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'competition-form1',
  data () {
    return {
      rules: {
        startDate: [{ required: true, message: '不为空' }],
        enterDate: [{ required: true, message: '不为空' }],
        groupNum: [{ required: true, message: '不为空' }],
        stuNum: [{ required: true, message: '不为空' }],
        personInChargeId: [{ required: true, message: '不为空' }],
        joinTypeId: [{ required: true, message: '不为空' }],
        process: [{ required: true, message: '不为空' }],
        intro: [{ required: true, message: '不为空' }]
      },
      COMPETITION_TYPE: [],
      typeId: 0
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
    ...mapMutations([
      'setFormList'
    ]),
    submit () {
      this.$emit('on-success-valid', true)
    },
    handleAdd () {
      if (this.typeId === 0) {
        this.$Message.info('请选择级别')
        return
      }
      this.formList.push({
        // 比赛进程
        name: '',
        isSingle: false,
        isNeedWorks: false,
        org: '',
        coOrg: '',
        place: '',
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
    ...mapGetters([
      'getFormList'
    ]),
    formList: {
      get () {
        return this.getFormList
      },
      set (val) {
        this.setFormList(val)
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
