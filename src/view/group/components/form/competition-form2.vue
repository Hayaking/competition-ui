<template>
  <div>
    <div :key="index" v-for="(item,index) in formList">
      <Form :hide-required-mark="true"
            :label-width="120"
            :model="item"
            :rules="rules"
            label-position="right"
            :ref='"form"+index'>
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
              <i-switch v-model="item.isNeedWorks" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="是单人赛：">
              <i-switch v-model="item.isSingle" size="large">
                <span slot="true">是</span>
                <span slot="false">否</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <!--阶段名 && 阶段级别-->
        <Row>
          <Col span="11">
            <FormItem label="名称：" prop="name">
              <Input v-model="item.name"/>
            </FormItem>
          </Col>
          <Col offset="2" span="11">
            <FormItem label="级别：">
              <Input :disabled="true" v-model="COMPETITION_TYPE[item.typeId-1].typeName" v-if="COMPETITION_TYPE[item.typeId-1]"/>
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
            <FormItem label="主办方：" prop="org">
              <Input v-model="item.org"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="协办方：" prop="coOrg">
              <Input  v-model="item.coOrg"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="比赛地点：" prop="place">
              <Input v-model="item.place"/>
            </FormItem>
          </Col>
        </Row>
        <!--预算-->
        <Row>
          <Col span="4">
            <FormItem label="报名费：" prop="enter">
              <InputNumber  :max="9999" :min="1" v-model="item.enter"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="差旅费：" prop="travel">
              <InputNumber  :max="9999" :min="1" v-model="item.travel"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="材料费：" prop="thing">
              <InputNumber  :max="9999" :min="1" v-model="item.thing"/>
            </FormItem>
          </Col>
          <Col offset="2" span="4">
            <FormItem label="其他费用：" prop="other">
              <InputNumber  :max="9999" :min="1"  v-model="item.other"/>
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
    {{COMPETITION_TYPE}}
    <Select v-model="typeId">
      <Option :key="index"
              :value=item.id
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
        name: [{ required: true, message: '不为空' }],
        enterDate: [{ required: true, message: '不为空' }],
        startDate: [{ required: true, message: '不为空' }],
        org: [{ required: true, message: '不为空' }],
        coOrg: [{ required: true, message: '不为空' }],
        place: [{ required: true, message: '不为空' }],
        enter: [{ required: true, message: '不为空' }],
        travel: [{ required: true, message: '不为空' }],
        thing: [{ required: true, message: '不为空' }],
        other: [{ required: true, message: '不为空' }],
        reason: [{ required: true, message: '不为空' }]
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
      let count = 0
      let size = this.formList.length
      // for (let i = 0; i < size; i++) {
      //   let name = 'form' + i
      //   this.$refs[name].validate(res => {
      //     if (res) {
      //       count++
      //     }
      //   })
      // }
      // this.$emit('callBack', count === size)
      this.$emit('callBack', true)
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
        enter: 0,
        travel: 0,
        thing: 0,
        other: 0,
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
