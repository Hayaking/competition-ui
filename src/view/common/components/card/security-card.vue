<template>
  <Card title="安全设置">
    <Form :model="user" v-if="isStudent===true"
          label-width="70"
          label-position="left">
      <FormItem label="密码：">
        <Input v-model="user.password" type="password"/>
      </FormItem>
      <FormItem label="银行卡号：">
        <Input v-model="user.stuBankCardNo"/>
      </FormItem>
      <FormItem label="电话：">
        <Input v-model="user.stuPhone"/>
      </FormItem>
    </Form>
    <Form :model="user" v-else
          label-width="70"
          label-position="left">
      <FormItem label="密码：">
        <Input v-model="user.password" type="password"/>
      </FormItem>
      <FormItem label="银行卡号：">
        <Input v-model="user.teacherBankCardNo"/>
      </FormItem>
      <FormItem label="电话：">
        <Input v-model="user.teacherPhone" type="tel"/>
      </FormItem>
    </Form>
    <Button @click="save">保存</Button>
  </Card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'security-card',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions([
      'handleUpdateStudentSecurityInfo',
      'handleUpdateTeacherSecurityInfo'
    ]),
    save () {
      console.info(this.isStudent === true)
      if (this.isStudent === true) {
        this.handleUpdateStudentSecurityInfo({ student: this.user }).then(res => {
          if (res) {
            this.$Message.success('成功')
          }
        })
      } else {
        this.handleUpdateTeacherSecurityInfo({ teacher: this.user }).then(res => {
          if (res) {
            this.$Message.success('成功')
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getIsStudent'
    ]),
    isStudent () {
      return this.getIsStudent
    }
  },
  watch: {
    getUserInfo: {
      handler (val) {
        this.user = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
