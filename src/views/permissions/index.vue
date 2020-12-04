<template>
  <div style="padding: 0px 40px;">
    <v-row
      class="d-flex"
      justify="end"
    >
      <v-btn
        color="rs_color"
        small
        @click="$router.push({ path: '/user'})"
      >
        <v-icon>mdi-chevron-left</v-icon>
        Quay lại
      </v-btn>
    </v-row>
    <v-row style="width: 100%">
      <v-card
        class="mx-auto"
        width="100%"
        height="100%"
        style="padding: 0px;"
      >
        <v-card-title>Games</v-card-title>
        <v-card-text>
          <div
            v-for="(item, i) in games"
            :key="i"
          >
            <div
              style="display: flex; justify-content: space-between; padding: 0 10px"
            >
              <div
                style="display: flex; align-items: center;"
              >
                {{ item }}
              </div>
              <div>
                <v-switch
                  v-model="value"
                  :value="item"
                  :disabled="userInfo.role !== 'admin'"
                  @click="togglePermission(i)"
                />
              </div>
            </div>

            <v-divider />
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
  import store from '../../store/store'

  export default {
    data: () => {
      return {
        games: [],
        value: [],
        user: {},
      }
    },
    computed: {
      userInfo: function () {
        return this.$store.getters['user/user']
      },
    },
    beforeRouteEnter (to, from, next) {
      if (store.state.user.user.role === 'admin') {
        next()
      } else {
        next('/')
      }
    },
    async created () {
      try {
        this.setupEventLister()
        await this.$store.dispatch('report/getListGame')
        await this.$store.dispatch('user/getUser', { userId: this.$route.params.userId })
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      setupEventLister () {
        this.$store.subscribe((muataion) => {
          if (muataion.type === 'report/RETURN_LIST_GAME') {
            this.games = muataion.payload
          }
          if (muataion.type === 'user/RETURN_USER') {
            this.user = muataion.payload
            this.value = muataion.payload.permissions
          }

          if (muataion.type === 'user/ADD_PERMISSION') {
            this.user = muataion.payload
            this.value = muataion.payload.permissions
          }

          if (muataion.type === 'user/DELETE_PERMISSION') {
            this.user = muataion.payload
            this.value = muataion.payload.permissions
          }
        })
      },
      async togglePermission (i) {
        try {
          if (this.value.includes(this.games[i])) {
            await this.$store.dispatch('user/addPermission', { permission: this.games[i], userId: this.$route.params.userId })
          } else {
            await this.$store.dispatch('user/deletePermission', { permission: this.games[i], userId: this.$route.params.userId })
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>
