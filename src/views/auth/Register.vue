<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <!-- 消息组件 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Please fill up the form as below:</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">Username</label>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: 'The field must start with letters' }" type="text" class="form-control" placeholder="Please leave your username">
          </div>
          <div class="form-group">
            <label class="control-label">Password</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: 'The length must be 6 ~ 16 characteristics' }" type="password" class="form-control" placeholder="Please leave your password">
          </div>
          <div class="form-group">
            <label class="control-label">Confirmation</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" type="password" class="form-control" placeholder="Please confirm your password">
          </div>
          <div class="form-group">
            <label class="control-label">Captcha</label>
            <input v-model.trim="captcha" v-validator.required="{ title: 'Captcha' }" type="text" class="form-control" placeholder="Please submit with the captcha">
          </div>
          <div class="thumbnail" title="Click to reload new captcha" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '', // 验证码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const { tpl, captcha } = createCaptcha(6)

      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      setTimeout(() => {
        this.$nextTick(() => {
          const target = e.target.type === 'submit' ? e.target : e.target.parentElement

          if (target.canSubmit) {
            this.submit()
          }
        })
      }, 100)
    },
    submit() {
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('The captcha is incorrect')
        this.getCaptcha()
      } else {
        const user = {
          name: this.username,
          password: this.password,
          avatar: `https://ui-avatars.com/api/?name=${this.username}`
          // https://ui-avatars.com/api/?name=Elon+Musk
        }
        // 修改
        // const localUser = ls.getItem('user')
        // 为 => 从仓库获取用户信息
        const localUser = this.$store.state.user

        if (localUser) {
          if (localUser.name === user.name) {
            this.showMsg('The user has already existed')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    login(user) {
      // 修改
      // ls.setItem('user', user)
      // 为 => 分发 login 事件，以保存用户信息和登录
      this.$store.dispatch('login', user)
      this.showMsg('Successfully', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
