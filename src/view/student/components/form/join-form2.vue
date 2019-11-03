<template>
  <div>
    <Form ref="form" :label-width="80" :model="groupMember" >
      <FormItem label="组名" :prop="groupName" >
          <Input type="text" v-model="groupName" placeholder="输入组名"/>
      </FormItem>
      <FormItem v-for="(item, index) in groupMember.items"
        :key="index"
        :label="'组员 ' + item.index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: '不能为空', trigger: 'blur'}">
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value" placeholder="输入账号"/>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
          <Button  @click="handleAdd" icon="md-add">添加组员</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'join-form2',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'handleStudentIsExist'
    ]),
    ...mapMutations([
      'setEnterGroupName',
      'setEnterGroupMember',
      'setEnterHolderList'
    ]),
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.list = this.groupMember.items.map(item => { return item.value })
          this.handleStudentIsExist({ list: this.list }).then(res => {
            if (res.length === 0) {
              this.$emit('call-back', true)
            } else {
              res.map(item => { this.$Message.error(item + '不存在') })
              this.$emit('call-back', false)
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
        index: this.groupMember.memberNum
      })
    },
    handleRemove (index) {
      this.groupMember.memberNum--
      this.groupMember.items.splice(index, index)
    }
  },
  computed: {
    ...mapGetters([
      'getEnterGroupName',
      'getEnterGroupMember',
      'getEnterHolder'
    ]),
    groupName: {
      get () {
        return this.getEnterGroupName
      },
      set (val) {
        this.setEnterGroupName(val)
      }
    },
    groupMember: {
      get () {
        return this.getEnterGroupMember
      },
      set (val) {
        this.setEnterGroupName(val)
      }
    },
    list: {
      get () {
        return this.getEnterHolder.list
      },
      set (val) {
        this.setEnterHolderList(val)
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
