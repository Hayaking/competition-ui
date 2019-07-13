<template>
  <Form :model="form" :rules="rules" @keydown.enter.native="handleSubmit" ref="loginForm">
    <FormItem prop="userName">
      <Input placeholder="请输入用户名" v-model="form.account">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input placeholder="请输入密码" type="password" v-model="form.password">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password2">
      <Input placeholder="重复密码" type="password" v-model="form.password2">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" long type="primary">注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'sign-form',
  data () {
    const validateP = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6,10}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (new RegExp(reg).test(value) === false) {
        callback(new Error('无效密码，请包含字母和数字'))
      } else {
        callback()
      }
    }
    const validateP2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.form.password2) {
        callback(new Error('不一致'))
      } else {
        callback()
      }
    }
    return {
      // 账号 密码 重复密码
      form: {
        account: '',
        password: '',
        password2: ''
      },
      // 表单验证规则
      rules: {
        password2: [{
          validator: validateP2,
          trigger: 'blur'
        }],
        password: [{
          validator: validateP,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            account: this.form.account,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
