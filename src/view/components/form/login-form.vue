<template>
  <Form ref="loginForm"
        :model="form"
        :rules="rules"
        @keydown.enter.native="submit">
    <FormItem prop="account">
      <Input v-model="form.account" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person" />
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock" />
        </span>
      </Input>
    </FormItem>
    <FormItem prop="isRemember">
      <Checkbox v-model="form.isRemember">记住密码</Checkbox>
    </FormItem>
    <Button @click="submit" type="primary" long>登录</Button>
  </Form>
</template>
<script>
export default {
  name: 'login-form',
  data () {
    return {
      form: {
        account: '',
        password: '',
        isRemember: false
      },
      rules: {
        account: [{ required: true, message: '不为空' }],
        password: [{ required: true, message: '不为空' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(res => {
        if (res) {
          this.$emit('on-success-valid', this.form)
        }
      })
    }
  }
}
</script>
