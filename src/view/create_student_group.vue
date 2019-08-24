<template>
  <div>
<!--    第一步-->
    <Card title="确认参赛" v-if="index ===0">
      <ButtonGroup slot="extra">
        <Button @click="step1" type="primary">下一步</Button>
      </ButtonGroup>
      <div>比赛名称：{{competition}}</div>
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
        <Button @click="index++" type="primary">下一步</Button>
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
        <Button @click="submit" type="success">提交</Button>
      </ButtonGroup>

    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create_student_group',
  data () {
    return {
      getter: this.$store.getters,
      index: 0,
      flag: true,
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
      }
    }
  },
  methods: {
    ...mapActions([
      'handleStudentIsExist'
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
          this.groupMember.items.forEach(item => {
            this.handleStudentIsExist({ account: item.value }).then(res => {
              if (!res) {
                this.flag = false
                this.$Message.error('没有找到:' + item.value)
              }
            })
          })
        } else {
          this.flag = false
        }
        function sleep (ms) {
          return new Promise(resolve =>
            setTimeout(resolve, ms)
          )
        }
        sleep(50).then(res => {
          if (this.flag) {
            this.index++
            this.$Message.success('SUCCESS!')
          }
        })
      })
    },
    submit () {
      this.$Message.info('!')
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
      this.groupMember.items[index].status = 0
    }
  },
  computed: {
    competition () {
      return this.getter.getEnterCompetition
    }
  }
}
</script>

<style scoped>

</style>
