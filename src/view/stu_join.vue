<template>
  <div>
<!--    第一步-->
    <Card title="确认参赛" v-if="index ===0">
      <ButtonGroup slot="extra">
        <Button @click="step1" type="primary">下一步</Button>
      </ButtonGroup>
      <div>比赛名称：{{competition.name}}</div>
      <div>开始时间：{{competition.startTime}}</div>
      <div>结束时间：{{competition.endTime}}</div>
      <div>报名开始时间：{{competition.enterStartTime}}</div>
      <div>报名结束时间：{{competition.enterEndTime}}</div>
      <div>主办方：{{competition.org}}</div>
      <div>比赛地点：{{competition.place}}</div>
      <div>负责人：{{competition.personInCharge}}</div>
      <div>比赛最高级别：{{competition.highestLevel}}</div>
    </Card>
<!--    第二步-->
    <Card title="创建小组" v-else-if="index ===1">
      <ButtonGroup slot="extra">
        <Button @click="index--">上一步</Button>
        <Button @click="step2" type="primary">下一步</Button>
      </ButtonGroup>
      <div>
        <Form ref="formDynamic" :model="groupMember"  :label-width="80" style="width: 300px">
          <FormItem label="组名">
            <Row>
              <Col span="18">
                <Input type="text" v-model="groupName" placeholder="输入组名"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem
            v-for="(item, index) in groupMember.items"
            v-if="item.status"
            :key="index"
            :label="'组员 ' + item.index"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '不能为空', trigger: 'blur'}">
            <Row>
              <Col span="18">
                <Input type="text" v-model="item.value" placeholder="输入账号"></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </Card>
<!--    第三步-->
    <Card title="创建作品" v-else-if="index ===2">
      <ButtonGroup slot="extra">
        <Button @click="index--">上一步</Button>
        <Button @click="step3" type="primary">下一步</Button>
      </ButtonGroup>
      <Form ref="formDynamic"  :model="works" :label-width="80" style="width: 300px">
        <FormItem label="作品名">
          <Row>
            <Col span="18">
              <Input type="text" v-model="works.worksName" placeholder="输入作品名"></Input>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Card>
<!--    第四步-->
    <Card title="申请指导老师" v-else-if="index ===3">
      <ButtonGroup slot="extra">
        <Button @click="index--">上一步</Button>
        <Button @click="step4" type="success">确认</Button>
      </ButtonGroup>
      <Input search enter-button="搜索" />
      <Table :columns="tb_head" :data="tb_res" />
    </Card>
<!--    第四步-->
    <Card title="提交" v-else-if="index ===4">
      <ButtonGroup slot="extra">
        <Button @click="index--">上一步</Button>
        <Button @click="submit" type="success">提交</Button>
      </ButtonGroup>
      小组名: <div> {{groupName}}</div>
      小组成员: <div>{{groupMember}}</div>
      作品：<div>{{works}}</div>
      指导老师： <div>{{join.teacherId1}}</div>
    </Card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'stu_join',
  data () {
    return {
      getter: this.$store.getters,
      index: 0,
      flag: true,
      tb_res: [],
      tb_head: [
        {
          title: '帐号',
          key: 'account'
        }, {
          title: '姓名',
          key: 'teacherName'
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return params.row.state ? h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled: false
              },
              on: {
                click: () => {
                  this.inviteLead(params.row._index)
                }
              }
            }, '申请')
              : h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.cancelInviteLead(params.row._index)
                  }
                }
              }, '取消')
          }
        }
      ],
      groupName: '',
      groupMember: {
        memberNum: 1,
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      works: {
        worksName: ''
      },
      join: {
        competitionId: 0,
        teacherId1: 0,
        teacherId2: 0
      },
      leadTeacherAccount: 0
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    ...mapActions([
      'handleStudentIsExist',
      'handleGetLeadTeacherList',
      'handleCreateStudentGroup',
      'handleInviteStudentMember',
      'handleCreateWorks',
      'handleCreateJoin'
    ]),
    step1 () {
      this.index += this.competition.typeJoinId
    },
    step2 () {
      /*
      检查组员是否存在,组员信息存储在this.formDynamic.items中
      */
      this.$refs['formDynamic'].validate((valid) => {
        if (valid) {
          let memberList = this.groupMember.items.map(item => {
            return item.value
          })
          this.handleStudentIsExist({ list: memberList }).then(res => {
            if (res.length === 0) {
              this.index++
              this.$Message.success('SUCCESS!')
            } else {
              res.map(item => {
                this.$Message.error(item)
              })
            }
          })
        } else {
          this.flag = false
        }
        // sleep(1000).then(res => {
        //   this.$Message.error('!!!!!')
        // })
      })
    },
    step3 () {
      this.handleGetLeadTeacherList().then(res => {
        this.tb_res = res.map(item => {
          item.state = true
          return item
        })
        this.index++
      })
    },
    step4 () {
      this.index++
    },
    submit () {
      let group = { name: this.groupName }
      let list = this.groupMember.items.map(item => { return item.value })
      let works = this.works
      this.join.competitionId = this.competition.id
      let join = this.join
      this.handleCreateJoin({ group, list, works, join }).then(res => {
        if (res) {
          this.$Message.success('成功')
          this.closeTag({ name: 'stu_join' })
          this.$router.push({ name: 'stu_join_list' })
        } else {
          this.$Message.error('失败')
        }
      })
    },
    inviteLead (_index) {
      this.tb_res[_index].state = false
      this.join.teacherId1 = this.tb_res[_index].account
    },
    cancelInviteLead (_index) {
      this.tb_res[_index].state = true
      this.join.teacherId1 = 0
    },
    handleAdd () {
      this.groupMember.memberNum++
      this.groupMember.items.push({
        value: '',
        index: this.groupMember.memberNum,
        status: 1
      })
    },
    handleRemove (index) {
      this.groupMember.memberNum--
      this.groupMember.items.splice(index, index)
    }
  },
  computed: {
    competition () {
      return this.getter.getTempCompetition
    }
  }
}
</script>

<style scoped>

</style>
