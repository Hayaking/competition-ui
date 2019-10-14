<template>
  <Form :label-width="70"
        ref="form"
        :rules="rules"
        :model="competition"
        :hide-required-mark="true"
        label-position="left">
    <FormItem label="当前工作组" prop="groupId">
      <Select v-model="competition.teacherGroupId">
        <Option  v-for="item in groupList"  :value="item.id" :key="item.id">
          {{item.name}}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="比赛名称" prop = "name">
      <Input v-model="competition.name"/>
    </FormItem>
    <FormItem label="比赛地点" prop="place">
      <Input v-model="competition.place"/>
    </FormItem>
    <FormItem label="主办方" prop="org">
      <Input v-model="competition.org"/>
    </FormItem>
    <FormItem label="协办方" prop="coOrg">
      <Input v-model="competition.coOrg"/>
    </FormItem>
    <FormItem label="最低级别" prop="minLevelId">
      <Select v-model="competition.minLevelId">
        <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
          {{item.typeName}}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="最高级别" prop="maxLevelId">
      <Select v-model="competition.maxLevelId">
        <Option v-for="item in competitionType"  :value="item.id" :key="item.id">
          {{item.typeName}}
        </Option>
      </Select>
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
        groupId: '',
        name: '',
        place: '',
        org: '',
        coOrg: '',
        minLevelId: 0,
        maxLevelId: 0
      },
      rules: {
        groupId: [{ required: true, message: '不为空' }],
        name: [{ required: true, message: '不为空' }],
        place: [{ required: true, message: '不为空' }],
        org: [{ required: true, message: '不为空' }],
        coOrg: [{ required: true, message: '不为空' }],
        minLevelId: [{ required: true, message: '不为空' }],
        maxLevelId: [{ required: true, message: '不为空' }]
      },
      competitionType: [],
      groupList: []
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
      this.handleGetTeacherGroup().then(res => {
        this.groupList = res
        this.competition.groupId = res[0].id
      })
    })
  },
  methods: {
    ...mapActions([
      'handleGetType',
      'handleGetTeacherGroup'
    ]),
    submit () {
      // this.$refs.form.validate(res => {
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
