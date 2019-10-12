<template>
  <div class="login">
    <Card class="login-con">
      <Tabs v-model="type"  :animated="isAnimated">
        <TabPane label="学生" :name="TAB_NAME.student">
          <div class="form-con">
            <login-form @on-success-valid="toLogin"></login-form>
          </div>
        </TabPane>
        <TabPane label="教师" :name="TAB_NAME.teacher" >
          <div class="form-con">
            <login-form @on-success-valid="toLogin"></login-form>
          </div>
        </TabPane>
        <TabPane label="注册" :name="TAB_NAME.sign">
          <div class="form-con">
            <SignForm @on-success-valid="toSign"/>
          </div>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import LoginForm from '@/view/components/form/login-form'
import SignForm from '@/view/components/form/sign-form'
import { mapActions } from 'vuex'
export default {
  components: { LoginForm, SignForm },
  data () {
    return {
      type: 'student',
      TAB_NAME: {
        student: 'student',
        teacher: 'teacher',
        sign: 'sign'
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'handleSign',
      'handleGetUserInfo'
    ]),
    /**
     * 登录
     * @param account
     * @param password
     * @param isRemember
     */
    toLogin ({ account, password, isRemember }) {
      let token = {
        'type': this.type,
        'username': account,
        password,
        isRemember
      }
      this.handleLogin({ token }).then(res => {
        res ? this.handleGetUserInfo().then(res2 => {
          res2 ? this.$router.push({ name: 'home' })
            : this.$Message.error('获取失败')
        }) : this.$Message.error('登陆失败')
      })
    },
    /**
     * 注册
     * @param account
     * @param password
     */
    toSign ({ account, password }) {
      let student = { account, password }
      this.handleSign({ student }).then(res => {
        res.flag
          ? this.$Message.success(res.body)
          : this.$Message.error(res.body)
      })
    }
  },
  computed: {
    isAnimated () {
      return this.type === this.TAB_NAME.sign
    }
  }
}
</script>

<style lang="less">
  .login{
    width: 100%;
    height: 100%;
    background: antiquewhite;
    /*background-image: url('../assets/images/login-bg.jpg');*/
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }

</style>
