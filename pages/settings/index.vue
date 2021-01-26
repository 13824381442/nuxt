<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
                </fieldset>
                <div class="btn btn-lg btn-primary pull-xs-right" @click="updataUser">
                  Update Settings
                </div>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { updataUser } from '../../utils/api'
export default {
  middleware: 'authnticated',
  name: 'Settings',
  data () {
    return {
      email: '2831047821@qq.com',
      bio: '123456789',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      password: '',
      username: 'lsp001'
    }
  },
  methods: {
    async updataUser () {
      console.log(11111111111)
      try {
        await updataUser({user: this.setUser()})
      } catch (err) {
        console.log(err)
      }
    },
    setUser () {
      let user = {
        email: this.email,
        bio: this.bio,
        image: this.image,
      }
      if (this.password) user.password = this.password
      if (this.username) user.username = this.username
      return user
    }
  }
}
</script>

<style>

</style>