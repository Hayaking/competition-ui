<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in"  :bordered="false">
        <Tabs v-model="type"  >
          <TabPane label="学生" name="student">
            <div class="form-con">
              <login-form @on-success-valid="toLogin"></login-form>
            </div>
          </TabPane>
          <TabPane label="教师" name="teacher" >
            <div class="form-con">
              <login-form @on-success-valid="toLogin"></login-form>
            </div>
          </TabPane>
          <TabPane label="注册" name="name3">
            <div class="form-con">
              <SignForm @on-success-valid="toSign"/>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form/login-form'
import SignForm from '@/components/login-form/sign-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm, SignForm
  },
  data () {
    return {
      type: 'student'
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'handleSign',
      'getUserInfo'
    ]),
    toLogin ({ account, password }) {
      let type = this.type
      this.handleLogin({ type, account, password }).then(res => {
        this.getUserInfo({ type }).then(res => {
          this.$router.push({ name: 'home' })
        })
      })
    },
    toSign ({ account, password }) {
      console.info('#注册#')
      console.info(account + ',' + password)
      this.handleSign({ account, password })
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
