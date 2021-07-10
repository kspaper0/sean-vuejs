<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Please login here:</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">Username</label>
            <input v-model.trim="username" v-validator.required="{ title: 'Username' }" type="text" class="form-control" placeholder="Username ...">
          </div>
          <div class="form-group">
            <label class="control-label">Password</label>
            <input v-model.trim="password" id="password" v-validator.required="{ title: 'Password' }" type="password" class="form-control" placeholder="Password ...">
          </div>
          <br>
          <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  methods: {
    login(e) {
      setTimeout(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      const user = {
        name: this.username,
        password: this.password
      }
      const localUser = this.$store.state.user

      if (localUser) {
        if (localUser.name !== user.name || localUser.password !== user.password) {
          this.showMsg('Invalid User')
        } else {
          this.$store.dispatch('login')
        }
      } else {
        this.showMsg('The user is not existed')
      }
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

</style>
