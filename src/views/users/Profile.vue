<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-cog"></i> Update Personal Info.</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">Username</label>
            <div class="col-sm-6">
              <input v-model.trim="username" v-validator:input.required="{ title: 'Username', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: 'The field must start with letters' }" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Gender</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">N/A</option>
                <option value="male">M</option>
                <option value="female">F</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Hobbies</label>
            <div class="col-sm-6">
<!--               <label class="checkbox-inline">
                <input v-model="hobbies" value="Reading" type="checkbox"> Reading
              </label> -->
              <label class="checkbox-inline">
                <input v-model="hobbies" value="Sports" type="checkbox"> Sports
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="Fitness" type="checkbox"> Fitness
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="Travel" type="checkbox"> Travel
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="Games" type="checkbox"> Games
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Introduction</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">Apply</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      username: '', // 用户名
      sex: '', // 性别
      hobbies: [], // 兴趣
      introduction: '' // 个人简介
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      const { name, sex, hobbies, introduction } = user

      this.username = name
      this.sex = sex || this.sex
      this.hobbies = hobbies || this.hobbies
      this.introduction = introduction
    }
  },
  methods: {
    updateProfile(e) {
      setTimeout(() => {
        if (e.target.canSubmit) {
          this.$store.dispatch('updateUser', {
            name: this.username,
            sex: this.sex,
            hobbies: this.hobbies,
            introduction: this.introduction
          })
          // 删除 alert，使用实例的 $message 的 show 方法
          this.$message.show('Updated Successfully')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
