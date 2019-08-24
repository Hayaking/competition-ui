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
        <Form ref="formDynamic" :model="formDynamic"  :label-width="80" style="width: 300px">
          <FormItem
            v-for="(item, index) in formDynamic.items"
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
export default {
  name: 'create_student_group',
  data () {
    return {
      getter: this.$store.getters,
      index: 0,
      memberNum: 1,
      formDynamic: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      }
    }
  },
  methods: {
    step1 () {
      this.index += this.competition.typeJoinId
    },
    step2 () {
      /*
      检查组员是否存在,组员信息存储在this.formDynamic.items中
      */
      this.$refs['formDynamic'].validate((valid) => {
        if (valid) {
          this.formDynamic.items.forEach(item => {

          })
          this.index++
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    submit () {
      this.$Message.info('!')
    },
    handleAdd () {
      this.memberNum++
      this.formDynamic.items.push({
        value: '',
        index: this.memberNum,
        status: 1
      })
    },
    handleRemove (index) {
      this.memberNum--
      this.formDynamic.items[index].status = 0
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
