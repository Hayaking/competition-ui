<template>
  <Card>
    <Form :label-width="70" :model="competition" label-position="left">
      <Row>
        <Col offset="1" span="10">
          <FormItem label="当前工作组">
            <Select v-model="competition.groupId">
              <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
                {{item.groupName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="比赛名称">
            <Input v-model="competition.name"/>
          </FormItem>
          <FormItem label="开始时间">
            <DatePicker placeholder="Select date" type="date" v-model="competition.startTime"></DatePicker>
          </FormItem>
          <FormItem label="预期参赛人数">
            <Input v-model="competition.groupNum"/>
          </FormItem>
          <FormItem label="学生人数">
            <Input v-model="competition.stuNum"/>
          </FormItem>
          <FormItem label="比赛地点">
            <Input v-model="competition.place"/>
          </FormItem>
        </Col>
        <Col offset="1" span="11">
          <FormItem label="主办方">
            <Input v-model="competition.org"/>
          </FormItem>
          <FormItem label="协办方">
            <Input v-model="competition.coOrg"/>
          </FormItem>
          <FormItem label="负责人">
            <Input v-model="competition.personInCharge"/>
          </FormItem>
          <FormItem label="竞赛级别">
            <Select v-model="competition.type">
              <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
                {{item.typeName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="最高级别">
            <Select v-model="competition.highestLevel">
              <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
                {{item.typeName}}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col offset="1" span="10">
          <FormItem label="比赛过程">
            <Input :rows="4" placeholder="比赛过程" type="textarea" v-model="competition.process"/>
          </FormItem>
        </Col>
        <Col offset="1" span="11">
          <FormItem label="比赛介绍">
            <Input :rows="4" placeholder="比赛介绍" type="textarea" v-model="competition.intro"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col offset="20" span="2">
          <FormItem>
            <Button type="primary" @click="save">提交</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

  </Card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'apply_competition',
  data () {
    return {
      competition: {
        name: '',
        startTime: '',
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
        type: '',
        groupId: ''
      },
      competitionType: [],
      groupList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getType('competition')
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
      let cp = this.competition
      this.saveCompetition({ cp }).then(() => {
        console.info('保存成功')
        this.$Message.success('保存成功')
      })
    },
    getType (type) {
      this.handleGetType({ type }).then(res => {
        console.info(res)
        this.competitionType = res
      })
    },
    getGroup () {

    }
  }
}
</script>

<style scoped>

</style>
