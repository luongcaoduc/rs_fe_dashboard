<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main style="background-color: #FFAB40">
          <v-container
            class="fill-height"
            fluid
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                sm="8"
                md="4"
              >
                <v-card class="elevation-12">
                  <v-toolbar
                    color="rs_color"
                    dark
                    flat
                  >
                    <v-toolbar-title>Đổi mật khẩu</v-toolbar-title>
                  </v-toolbar>
                  <p
                    v-if="errorStatus"
                    class="text-center red--text"
                  >
                    Mât khẩu và xác nhận không chính xác
                  </p>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="password"
                        label="Mật khẩu"
                        name="login"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="rs_color"
                        :rules="[v => !!v || 'Mật khẩu không được để trống']"
                      />

                      <v-text-field
                        id="password"
                        v-model="confirmPassword"
                        label="Xác nhận Mật khẩu"
                        name="Xác nhận mật khẩu"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="rs_color"
                        :rules="[v => !!v || 'Xác nhận mật khẩu không được để trống']"
                        @keypress.enter="changePass()"
                      />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="rs_color"
                      :disabled="!checkField"
                      @click="changePass()"
                    >
                      Tiếp tục
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
  import store from '../../store/store'
  export default {
    data () {
      return {
        confirmPassword: '',
        password: '',
        errorStatus: false,
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!store.state.user.user.active) {
        next()
      } else {
        next('/')
      }
    },
    computed: {
      checkField () {
        return this.password && this.confirmPassword
      },
      userId () {
        return this.$store.getters['user/user']._id
      },
    },
    methods: {
      async changePass () {
        try {
          if (this.password !== this.confirmPassword) {
            this.errorStatus = true
            return
          }
          await this.$store.dispatch('user/changePass', { userId: this.userId, password: this.password })
          this.$router.push('/')
        } catch (error) {
          alert(error)
        }
      },
      setupEventLisnter () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'user/CHANGE_PASSWORD') {
            this.$router.push({ path: '/' })
          }
        })
      },
    },
  }
</script>
