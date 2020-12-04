<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <v-btn
      class="ml-2"
      min-width="0"
      text
      style="cursor: default;"
    >
      <v-icon>mdi-account</v-icon>
      <span>{{ username }}</span>
    </v-btn>
    <v-menu
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title
            style="cursor: pointer"
            @click="openDialog()"
          >
            Đổi mật khẩu
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            style="cursor: pointer"
            @click="logout()"
          >
            Đăng xuất
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="dialog"
      max-width="500"
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
          {{ errorMessage }}
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
              v-model="newPassword"
              label="Mật khẩu mới"
              name="login"
              prepend-icon="mdi-lock"
              type="password"
              color="rs_color"
              :rules="[v => !!v || 'Mật khẩu mới không được để trống']"
            />

            <v-text-field
              id="password"
              v-model="confirmNewPassword"
              label="Xác nhận mật khẩu"
              name="mật khẩu"
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
            color="red"
            style="float: right"
            @click="closeDialog()"
          >
            Hủy
          </v-btn>
          <v-btn
            color="rs_color"
            :disabled="!checkField"
            @click="changePass()"
          >
            Tiếp tục
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  import swal from '../../../../plugins/sweetalert'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      dialog: false,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      errorStatus: false,
      errorMessage: '',
    }),

    computed: {
      ...mapState(['drawer']),
      username () {
        return JSON.parse(localStorage.getItem('app_user')).username
      },
      checkField () {
        return this.password && this.newPassword && this.confirmNewPassword
      },
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      async logout () {
        try {
          this.$store.dispatch('user/logout')
          this.$router.push({ path: '/login' })
        } catch (error) {
          console.log(error)
        }
      },
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        this.password = ''
        this.newPassword = ''
        this.confirmNewPassword = ''
      },
      async changePass () {
        if (this.newPassword !== this.confirmNewPassword) {
          this.errorStatus = true
          this.errorMessage = 'Mật khẩu mới và xác nhận không giống chính xác'
          return
        }
        try {
          await this.$store.dispatch('user/changePass2', { password: this.password, newPassword: this.newPassword })
          this.closeDialog()
          swal.success('Đổi mật khẩu thành công')
        } catch (error) {
          if (error.response.data.code === 'WRONG_PASS') {
            this.errorStatus = true
            this.errorMessage = 'Mật khẩu không chính xác'
          } else {
            alert(error)
          }
        }
      },
    },
  }
</script>
