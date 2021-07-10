<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-lock"></i> Alter Password</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">Password</label>
            <div class="col-sm-6">
              <input v-model.trim="password" id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: 'The length must be 6 ~ 16 characteristics' }" type="password" class="form-control" placeholder="Password ...">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Comfirmation</label>
            <div class="col-sm-6">
              <input v-model.trim="cpassword" v-validator.required="{ title: 'Comfirmation', target: '#password' }" type="password" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updatePassword">Apply</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data() {
    return {
      password: '', // 密码
      cpassword: '' // 确认密码
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      this.password = user.password
    }
  },
  methods: {
    updatePassword(e) {
      setTimeout(() => {
        if (e.target.canSubmit) {
          this.$store.dispatch('updateUser', { password: this.cpassword })
          this.$message.show('Altered Successfully')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
