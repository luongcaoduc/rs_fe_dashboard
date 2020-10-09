<template>
  <div style="padding: 0px 40px;">
    <v-row>
      <v-col
        cols="3"
      >
        <v-autocomplete
          v-model="game"
          :items="listGame"
          label="Game"
          placeholder="Chọn Game"
          @change="search()"
        />
      </v-col>
      <v-col
        cols="3"
      >
        <!-- <v-menu
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
            style="paddding: 0px; margin: 0px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                readonly
                label="Date"
                persistent-hint
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="dates"
              color="rs_color"
              range
            />
          </v-menu> -->
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          max-height="320px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="format1"
              label="Ngày bắt đầu"
              readonly
              v-bind="attrs"
              clearable
              v-on="on"
              @click:clear="date1 = null"
            />
          </template>
          <v-date-picker
            v-model="date1"
            no-title
            scrollable
            @input="menu1 = false"
          >
            <v-spacer />
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="3"
      >
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
          max-height="320px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="format2"
              label="Ngày kết thúc"
              readonly
              v-bind="attrs"
              clearable
              v-on="on"
              @click:clear="date2 = null"
            />
          </template>
          <v-date-picker
            v-model="date2"
            no-title
            scrollable
            @input="menu2 = false"
          >
            <v-spacer />
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="1"
        style="display: flex; align-items: center;"
      >
        <v-btn
          color="rs_color"
          small
          :disabled="valuedate"
          @click="handleSearch()"
        >
          <v-icon>mdi-magnify</v-icon>
          <span>Tìm kiếm</span>
        </v-btn>
      </v-col>
      <v-col />
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-select
          v-model="costValue"
          :items="costItem"
          attach
          chips
          label="Cost"
          multiple
          clearable
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="revValue"
          :items="revItem"
          attach
          chips
          label="Revenue"
          multiple
          clearable
        />
      </v-col>
    </v-row>
    <v-row style="margin-top: 10px">
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
        <div class="d-flex justify-end">
          <div
            class="d-flex flex-row align-center"
            style="padding: 10px"
          >
            <v-card
              :style="{
                background: '#B3E5FC',
                border: '2px solid',
                borderColor:'white',
                margin: 0,
              }"
              width="30"
              height="30"
              class="mr-2"
              @click.native="toggle"
            />
            <v-subheader
              class="pl-0"
              style="font-size: 16px"
            >
              Cost
            </v-subheader>
          </div>
          <div
            class="d-flex flex-row align-center"
            style="padding: 10px"
          >
            <v-card
              :style="{
                background: '#ffe082',
                border: '2px solid',
                borderColor:'white',
                margin: 0,
              }"
              width="30"
              height="30"
              class="mr-2"
              @click.native="toggle"
            />
            <v-subheader
              class="pl-0"
              style="font-size: 16px"
            >
              Revenue
            </v-subheader>
          </div>
        </div>
        <v-data-table
          :headers="headerFilter"
          :items="reports"
          :loading="isTableLoading"
          :sort-by="['Date']"
          loading-text="Đang tải đữ liệu"
          :footer-props="{itemsPerPageText: 'Số lượng bản ghi mỗi trang'}"
          no-data-text="Không có dữ liệu"
          :options.sync="pagination"
          :server-items-length="totalItems"
        >
          <template v-slot:item="props">
            <tr>
              <td class="purple--text">
                {{ props.item.Game }}
              </td>
              <td class="text-center">
                {{ formatDate(props.item.Date) }}
              </td>
              <td
                v-for="(item, i) in headerFilter.slice(2, headerFilter.length)"
                :key="i"
                class="text-center"
                :v-if="[...costItem, ...revValue].includes(item.text)"
              >
                {{ props.item[item.value] }}
              </td>
              <!-- <td
                class="text-center"
              >
                {{ props.item.cost1 }}
              </td>
              <td class="text-center">
                {{ props.item.cost2 }}
              </td>
              <td class="text-center">
                {{ props.item.cost3 }}
              </td>
              <td class="text-center">
                {{ props.item.cost4 }}
              </td>
              <td class="text-center">
                {{ props.item.cost5 }}
              </td>
              <td class="text-center">
                {{ props.item.cost6 }}
              </td>
              <td class="text-center">
                {{ props.item.cost7 }}
              </td>
              <td class="text-center">
                {{ props.item.cost8 }}
              </td>
              <td class="text-center">
                {{ props.item.cost9 }}
              </td>
              <td class="text-center">
                {{ props.item.cost10 }}
              </td>
              <td class="text-center">
                {{ props.item.cost11 }}
              </td>
              <td class="text-center">
                {{ props.item.cost12 }}
              </td>
              <td class="text-center">
                {{ props.item.cost13 }}
              </td>
              <td class="text-center">
                {{ props.item.cost14 }}
              </td>
              <td class="text-center">
                {{ props.item.cost15 }}
              </td>
              <td class="text-center">
                {{ props.item.cost16 }}
              </td>
              <td class="text-center">
                {{ props.item.cost17 }}
              </td>
              <td class="text-center">
                {{ props.item.cost18 }}
              </td>
              <td class="text-center">
                {{ props.item.cost19 }}
              </td>
              <td class="text-center">
                {{ props.item.cost20 }}
              </td>
              <td class="text-center">
                {{ props.item.cost21 }}
              </td>
              <td class="text-center">
                {{ props.item.cost22 }}
              </td>
              <td class="text-center">
                {{ props.item.cost23 }}
              </td>
              <td class="text-center">
                {{ props.item.cost24 }}
              </td>
              <td class="text-center">
                {{ props.item.rev1 }}
              </td>
              <td class="text-center">
                {{ props.item.rev2 }}
              </td>
              <td class="text-center">
                {{ props.item.rev3 }}
              </td>
              <td class="text-center">
                {{ props.item.rev4 }}
              </td>
              <td class="text-center">
                {{ props.item.rev5 }}
              </td>
              <td class="text-center">
                {{ props.item.rev6 }}
              </td>
              <td class="text-center">
                {{ props.item.rev7 }}
              </td>
              <td class="text-center">
                {{ props.item.rev8 }}
              </td>
              <td class="text-center">
                {{ props.item.rev9 }}
              </td>
              <td class="text-center">
                {{ props.item.rev10 }}
              </td>
              <td class="text-center">
                {{ props.item.rev11 }}
              </td>
              <td class="text-center">
                {{ props.item.rev12 }}
              </td>
              <td class="text-center">
                {{ props.item.rev13 }}
              </td>
              <td class="text-center">
                {{ props.item.rev14 }}
              </td>
              <td class="text-center">
                {{ props.item.rev15 }}
              </td>
              <td class="text-center">
                {{ props.item.rev16 }}
              </td>
              <td class="text-center">
                {{ props.item.rev17 }}
              </td>
              <td class="text-center">
                {{ props.item.rev18 }}
              </td>
              <td class="text-center">
                {{ props.item.rev19 }}
              </td>
              <td class="text-center">
                {{ props.item.rev20 }}
              </td>
              <td class="text-center">
                {{ props.item.rev21 }}
              </td>
              <td class="text-center">
                {{ props.item.rev22 }}
              </td>
              <td class="text-center">
                {{ props.item.rev23 }}
              </td>
              <td class="text-center">
                {{ props.item.rev24 }}
              </td>
              <td class="text-center">
                {{ props.item.rev25 }}
              </td>
              -->
            </tr>
          </template>
        </v-data-table>
      </base-material-card>
    </v-row>
  </div>
</template>

<script>
  import header from '../../config/TableHeader'
  import moment from 'moment'

  export default {
    data () {
      return {
        sortBy: 'fat',
        sortDesc: false,
        headers: header.dayDashboardHeader,
        costItem: header.costItems,
        revItem: header.revItems,
        costValue: [],
        revValue: [],
        listGame: ['Tất cả'],
        reports: [],
        isTableLoading: false,
        game: 'Tất cả',
        menu1: '',
        date1: '',
        menu2: '',
        date2: '',
        pagination: {
          page: 1,
          itemsPerPage: 10,
        },
        totalItems: undefined,
      }
    },
    computed: {
      valuedate () {
        // if (!this.date1 && this.date2) {
        //   return true
        // } else if (this.date1 && !this.date2) {
        //   return true
        // } else {
        //   return false
        // }
        if (!this.date1 || !this.date2) {
          return true
        } else {
          return false
        }
      },
      format1 () {
        if (!this.date1) return ''
        return moment(this.date1).format('DD/MM/YYYY')
      },
      format2 () {
        if (!this.date2) return ''
        return moment(this.date2).format('DD/MM/YYYY')
      },
      headerFilter () {
        if (this.costValue.length !== 0 || this.revValue.length !== 0) {
          return this.headers.filter((item) => [...this.costValue, ...this.revValue].includes(item.text) || item.text === 'Game' || item.text === 'Ngày')
        } else {
          return this.headers
        }
      },
    },
    watch: {
      pagination: async function (val) {
        await this.search()
      },
      game: async function (val) {
        await this.search()
        this.pagination.page = 1
      },
    },
    async created () {
      try {
        this.isTableLoading = true
        this.setupEventListener()
        await Promise.all([this.$store.dispatch('report/getReports', { page: this.pagination.page, pageSize: this.pagination.itemsPerPage }), this.$store.dispatch('report/getListGame')])
        this.isTableLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'report/RETURN_REPORT') {
            this.reports = mutation.payload.reports
            this.totalItems = mutation.payload.totals
          }
          if (mutation.type === 'report/RETURN_LIST_GAME') {
            this.listGame = [...this.listGame, ...mutation.payload]
          }
        })
      },
      formatDate (date) {
        if (!date) return ''
        return moment(date).format('DD/MM/YYYY')
      },
      async search () {
        try {
          this.isTableLoading = true
          const time1 = new Date(this.date1)
          const time2 = new Date(this.date2)
          if (time1.getTime() > time2.getTime()) {
            const tmp = this.date1
            this.date1 = this.date2
            this.date2 = tmp
          }
          await this.$store.dispatch('report/getReports', {
            startDate: this.date1,
            endDate: this.date2,
            game: this.game,
            page: this.pagination.page,
            pageSize: this.pagination.itemsPerPage,
          })
          this.isTableLoading = false
        } catch (error) {
          console.log(error)
        }
      },
      async handleSearch () {
        try {
          await this.search()
          this.pagination.page = 1
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>

<style>
  th {
    font-size: 15px !important;
  }
  @media only screen and (max-width: 768px) {
  .v-btn span span {
    display: none;
  }
  .cost {
    color: aquamarine;
  }
}
</style>
