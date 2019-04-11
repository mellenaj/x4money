<template>
  <div class="row">
    <q-page class="col-7" padding>
      <q-card-media v-if="user.photoUrl">
        <img class="profile_img" width="200" :src="user.photoUrl">
      </q-card-media>
      <q-card-media v-else>
        <img class="profile_img" width="200" src="statics/linux-avatar.png">
      </q-card-media>
      <div class="profile_values">
        <q-input class="q-pa-sm" :value="user.name" float-label="Name"/>
        <q-input class="q-pa-sm" :value="user.email" float-label="Email"/>
        <q-input class="q-pa-sm" :value="user.phoneNumber" float-label="Phone Number"/>
        <q-input class="q-pa-sm" :value="user.photoUrl" float-label="Enter path URL to your photo"/>
      </div>
      <q-field class="q-py-sm">
        <q-btn color="amber" @click="updateUser" label="Update Info" />
      </q-field>
    </q-page>
  </div>
</template>

<script>
import { updateUserProfile } from '../plugins/db.js'
let profile
export default {
  name: 'PageProfile',
  computed: {
    user () {
      return this.$store.state.data.user
    }
  },
  methods: {
    getUser () {
      if (profile != null) {
        this.user.name = profile.displayName || 'Empty'
        this.user.email = profile.email || 'Empty'
        this.user.photoUrl = profile.photoURL
        this.user.phoneNumber = profile.phoneNumber
      }
    },
    updateUser () {
      updateUserProfile(profile).catch(err => {
        this.$q.notify.create({
          message: err,
          type: 'negative'
        })
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scoped>
img.profile_img{
  width: 150px;
  margin: 0 auto;
}
</style>
