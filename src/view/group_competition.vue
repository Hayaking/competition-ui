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
          <FormItem label="比赛时间" >
            <DatePicker type="daterange" v-model="startAndEndDate"></DatePicker>
          </FormItem>
          <FormItem label="报名时间" >
            <DatePicker type="daterange" v-model="enterDate"></DatePicker>
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
          <FormItem label="参赛形式">
            <Select v-model="competition.highestLevel">
              <Option v-for="(item,index) in joinType"  :value="index+1" :key="item.id">
                {{item}}
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
        type: '',
        groupId: ''
      },
      competitionType: [],
      startAndEndDate: [],
      enterDate: [],
      joinType: ['单人赛', '多人赛'],
      groupList: []
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
      this.competition.startTime = this.startAndEndDate[0]
      this.competition.endTime = this.startAndEndDate[1]
      this.competition.enterStartTime = this.enterDate[0]
      this.competition.enterEndTime = this.enterDate[1]
      this.saveCompetition({ competition: this.competition }).then(res => {
        if (res) {
          this.$Message.success('保存成功')
        } else {
          this.$Message.error('保存失败')
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
    }
  }
}
</script>

<style scoped>

</style>
