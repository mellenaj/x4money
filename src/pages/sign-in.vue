<template>
 <q-layout view="lHh LpR lFf">
    <q-page-container>
      <div class="row">
        <q-page class="col-5" padding>
          <h5>Sign-in Form</h5>
          <q-field icon="email" class="q-pa-sm">
            <q-input
              v-model="form.email"
              @blur="$v.form.email.$touch"
              @keyup.enter="submit"
              :error="$v.form.email.$error"
              placeholder="Email"/>
          </q-field>
          <q-field icon="lock" class="q-pa-sm" :count="16">
            <q-input
              v-model="form.pass"
              type="password"
              @blur="$v.form.email.$touch"
              @keyup.enter="submit"
              :error="$v.form.email.$error"
              placeholder="Password"
              max-length="16"/>
          </q-field>
          <q-field class="q-pa-sm">
            <q-btn color="primary" @click="signIn">Sign In</q-btn>
            <q-btn color="primary" flat @click="goHome">Go Home</q-btn>
          </q-field>
        </q-page>
      </div>
    </q-page-container>
 </q-layout>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'PageSingIn',
  data () {
    return {
      form: {
        email: '',
        pass: ''

      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      pass: { required }

    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    setUserName (user) {
      user.updateProfile({
        displayName: this.form.user_name
      }).catch(function (error) {
        this.$q.notify(error.message)
      })
    }
  }
}
</script>
