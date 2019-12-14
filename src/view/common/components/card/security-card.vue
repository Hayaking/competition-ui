<template>
  <Card title="安全设置">
    <Form :model="user"
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
      'handleUpdateStudentSecurityInfo'
    ]),
    save () {
      this.handleUpdateStudentSecurityInfo({ student: this.user }).then(res => {
        if (res) {
          this.$Message.success('成功')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
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
