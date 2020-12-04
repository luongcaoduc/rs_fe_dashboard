<template>
  <div style="padding: 0px 40px; margin-top: 30px">
    <v-row class="d-flex justify-start">
      <div>
        <v-text-field
          v-model="username"
          style="margin-right: 10px"
          @keyup.enter="createUser()"
        />
      </div>
      <div class="d-flex align-center">
        <v-btn
          color="rs_color"
          small
          :disabled="username ? false : true"
          @click="createUser()"
        >
          Thêm
        </v-btn>
      </div>
    </v-row>
    <v-row style="margin-top: 50px">
      <base-material-card
        color="#ff9800"
        icon="mdi-clipboard-text"
        title="Báo cáo"
        class="px-5 py-3"
        style="width: 100%"
      >
        <template v-slot:heading>
          <!-- <div class="subtitle-1 font-weight-light">
            New employees on 15th September, 2016
          </div> -->
        </template>
        <v-data-table
          :headers="headers"
          :items="users.filter(r => r.role !== 'admin')"
          :loading="isTableLoading"
          :sort-by="['Date']"
          loading-text="Đang tải đữ liệu"
          :footer-props="{itemsPerPageText: 'Số lượng bản ghi mỗi trang'}"
          no-data-text="Không có dữ liệu"
        >
          <template v-slot:item="props">
            <tr>
              <td class="text-start">
                {{ props.item.username }}
              </td>
              <td class="text-center">
                {{ props.item.active_code }}
              </td>
              <td class="text-center">
                <v-chip
                  v-if="props.item.active"
                  class="ma-2"
                  label
                  outlined
                  color="success"
                >
                  Đã kích hoạt
                </v-chip>
                <v-chip
                  v-else
                  class="ma-2"
                  label
                  outlined
                  color="#E53935"
                >
                  Chưa kích hoạt
                </v-chip>
              </td>
              <td class="text-center">
                <div class="d-flex justify-center">
                  <div class="ma-1">
                    <v-btn
                      color="#1565C0"
                      small
                      @click="refreshUser(props.item._id)"
                    >
                      Refresh
                    </v-btn>
                  </div>
                  <div class="ma-1">
                    <v-btn
                      color="rs_color"
                      small
                      @click="$router.push({ path: '/permission/' + props.item._id})"
                    >
                      Permissions
                    </v-btn>
                  </div>
                  <div class="ma-1">
                    <v-btn
                      color="#D32F2F"
                      small
                      @click="deleteUser(props.item._id)"
                    >
                      Xóa
                    </v-btn>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </base-material-card>
    </v-row>
  </div>
</template>

<script>
  import header from '../../config/TableHeader'
  import swal from '../../plugins/sweetalert'
  import store from '../../store/store'

  export default {
    data: () => {
      return {
        users: [],
        username: '',
        isTableLoading: false,
        headers: header.userHeader,
      }
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
        this.setupEventListener()
        this.isTableLoading = true
        await this.$store.dispatch('user/getAllUser')
        this.isTableLoading = false
      } catch (error) {
        console.lgo(error)
      }
    },
    methods: {
      setupEventListener () {
        this.$store.subscribe(async (mutaion) => {
          if (mutaion.type === 'user/RETURN_USERS') {
            this.users = mutaion.payload
          }

          if (mutaion.type === 'user/RETURN_USER') {
            this.username = ''
          }

          if (mutaion.type === 'user/DELETE_USER') {
            swal.success('Xóa nhân viên thành công')
            await this.$store.dispatch('user/getAllUser')
          }
        })
      },
      async refreshUser (userId) {
        try {
          const value = await swal.confirm('Thông báo', 'Bạn có chắc chán muốn tiếp tục?')
          if (value) {
            await this.$store.dispatch('user/refreshUser', { userId: userId })
            await this.$store.dispatch('user/getAllUser')
          } else {
            return
          }
        } catch (error) {
          console.log(error)
        }
      },
      async createUser () {
        try {
          await this.$store.dispatch('user/createUser', { username: this.username })
          await this.$store.dispatch('user/getAllUser')
          swal.success('Thêm nhân viên thành công')
        } catch (error) {
          console.log(error)
          swal.danger('Tên đăng nhập đã tồn tại')
        }
      },
      async deleteUser (userId) {
        try {
          const value = await swal.confirm('Thông báo', 'Bạn có chắc chán muốn xóa dữ liệu này?')
          if (value) await this.$store.dispatch('user/deleteUser', { userId: userId })
        } catch (error) {
          alert(error)
        }
      },
    },
  }
</script>
