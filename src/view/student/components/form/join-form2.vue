<template>
  <div>
    <Form ref="form" :model="groupMember"  :label-width="80" style="width: 300px">
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'join-form2',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
      groupName: ''
    }
  },
  methods: {
    ...mapActions([
      'handleStudentIsExist'
    ]),
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let memberList = this.groupMember.items.map(item => {return item.value})
          this.handleStudentIsExist({ list: memberList }).then(res => {
            if (res.length === 0) {
              this.$Message.success('SUCCESS!')
              this.$emit('call-back', true, memberList)
            } else {
              res.map(item => { this.$Message.error(item + '不存在') })
              this.$emit('call-back', false, [])
            }
          })
        } else {
          this.$Message.error('失败')
          this.flag = false
        }
      })
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
