<template>
  <div id="app">
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
              <div style="display: flex; justify-content: center">
                <img
                  src="../../assets/unnamed.png"
                  class="imageLogin"
                >
                <h1 class="white--text text-center d-flex align-center">
                  Rocket Studio
                </h1>
              </div>
              <v-card class="elevation-12">
                <v-toolbar
                  color="rs_color"
                  dark
                  flat
                >
                  <v-toolbar-title>Đăng nhập</v-toolbar-title>
                </v-toolbar>
                <p
                  v-if="loginError"
                  class="text-center red--text"
                >
                  Tên đăng nhập hoặc mật khẩu sai vui lòng thử lại
                </p>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="username"
                      label="Tên đăng nhập"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      color="rs_color"
                      :rules="[v => !!v || 'Tên đăng nhập không được để trống']"
                    />

                    <v-text-field
                      id="password"
                      v-model="password"
                      label="Mật khẩu"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      color="rs_color"
                      :rules="[v => !!v || 'Mật khẩu không được để trống']"
                      @keypress.enter="login()"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="rs_color"
                    @click="login()"
                  >
                    Đăng nhập
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        loginError: false,
      }
    },
    created () {
      this.setupEventListener()
    },
    methods: {
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'user/SAVE_USER_INFO') {
            if (!mutation.payload.user.active) {
              this.$router.push({ path: '/change-pass' })
            } else {
              this.$router.push({ path: '/' })
            }
          }
        })
      },
      async login () {
        try {
          await this.$store.dispatch('user/login', { username: this.username, password: this.password })
        } catch (error) {
          this.loginError = true
        }
      },
    },
  }
</script>

<style>
  .imageLogin {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
</style>
