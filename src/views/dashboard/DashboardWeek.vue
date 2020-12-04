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
          @change="searchByWeek()"
        />
      </v-col>
      <v-col
        v-if="year"
        cols="2"
      >
        <v-autocomplete
          v-model="week1"
          :items="weeks"
          label="Tuần bắt đầu"
        />
      </v-col>
      <v-col
        v-if="year"
        cols="2"
      >
        <v-autocomplete
          v-model="week2"
          :items="weeks"
          label="Tuần kết thúc"
        />
      </v-col>
      <v-col
        cols="3"
      >
        <v-autocomplete
          v-model="year"
          :items="listYear"
          label="Năm"
          placeholder="Chọn năm"
          item-value="_id"
          item-text="_id"
          clearable
        />
      </v-col>
      <v-col
        cols="1"
        style="display: flex; align-items: center;"
      >
        <v-btn
          color="rs_color"
          small
          :disabled="valuedate"
          @click="searchByWeek()"
        >
          <v-icon>mdi-magnify</v-icon>
          <span>Tìm kiếm</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="6"
        lg="3"
        md="3"
        xl="3"
      >
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
      <v-col
        cols="6"
        lg="3"
        md="3"
        xl="3"
      >
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
        <template v-slot:heading>
          <!-- <div class="subtitle-1 font-weight-light">
            New employees on 15th September, 2016
          </div> -->
        </template>
        <v-data-table
          :headers="headerFilter"
          :items="reports"
          :loading="isTableLoading"
          :sort-by="['Date']"
          loading-text="Đang tải đữ liệu"
          :footer-props="{itemsPerPageText: 'Số lượng bản ghi mỗi trang'}"
          no-data-text="Không có dữ liệu"
        >
          <template v-slot:item="props">
            <tr>
              <td class="purple--text">
                {{ props.item._id.Game }}
              </td>
              <td class="text-center">
                {{ props.item._id.week }}/{{ props.item._id.year }}
              </td>
              <td
                v-for="(item, i) in headerFilter.slice(2, headerFilter.length)"
                :key="i"
                class="text-center"
                :v-if="[...costItem, ...revValue].includes(item.text)"
              >
                {{ parseIntValue(props.item[item.value]) }}
              </td>
              <!-- <td class="text-center">
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
              </td> -->
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
  import data from '../../config/data'

  export default {
    data () {
      return {
        sortBy: 'fat',
        sortDesc: false,
        headers: header.weekDashboardHeader,
        listGame: ['Tất cả'],
        game: 'Tất cả',
        reports: [],
        isTableLoading: false,
        year: '',
        listYear: [],
        weeks: data.week,
        week1: '',
        week2: '',
        costItem: data.costItems,
        revItem: data.revItems,
        costValue: [],
        revValue: [],
      }
    },
    computed: {
      valuedate () {
        if ((!this.week1 && this.week1 !== 0) || (!this.week2 && this.week2 !== 0)) {
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
          return this.headers.filter((item) => [...this.costValue, ...this.revValue].includes(item.text) || item.text === 'Game' || item.text === 'Tuần')
        } else {
          return this.headers
        }
      },
    },
    watch: {
      year: async function (val) {
        if (!val) {
          this.week1 = ''
          this.week2 = ''
          await this.searchByWeek()
        }
      },
    },
    async created () {
      try {
        this.isTableLoading = true
        this.setupEventListener()
        await Promise.all([this.$store.dispatch('report/getReportsWeek'),
                           this.$store.dispatch('report/getListGame'),
                           this.$store.dispatch('report/getAllYear'),
        ])
        this.isTableLoading = false
      } catch (error) {
        this.isTableLoading = false
        console.log(error)
      }
    },
    methods: {
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'report/RETURN_REPORT_WEEK') {
            this.reports = mutation.payload
            this.reports.forEach(r => {
              const totalCost = r.cost1 + r.cost2 + r.cost3 + r.cost4 + r.cost5 + r.cost6 + r.cost7 + r.cost8 + r.cost9 + r.cost10 +
                r.cost11 + r.cost12 + r.cost13 + r.cost14 + r.cost15 + r.cost16 + r.cost17 + r.cost18 + r.cost19 + r.cost20 +
                r.cost21 + r.cost22 + r.cost23 + r.cost24 + r.cost25
              const totalRev = r.rev1 + r.rev2 + r.rev3 + r.rev4 + r.rev5 + r.rev6 + r.rev7 + r.rev8 + r.rev9 + r.rev10 +
                r.rev11 + r.rev12 + r.rev13 + r.rev14 + r.rev15 + r.rev16 + r.rev17 + r.rev18 + r.rev19 + r.rev20 +
                r.rev21 + r.rev22 + r.rev23 + r.rev24 + r.rev25
              const profit = totalRev - totalCost
              const roas = totalCost ? profit / totalCost : 0
              const revVideo = r.rev1 + r.rev2 + r.rev3 + r.rev4 + r.rev5 + r.rev6 + r.rev7
              const revInter = r.rev8 + r.rev9 + r.rev10 +
                r.rev11 + r.rev12 + r.rev13 + r.rev14 + r.rev15 + r.rev16 + r.rev17 + r.rev18 + r.rev19 + r.rev20 +
                r.rev21 + r.rev22 + r.rev23 + r.rev24
              const iapTotalRev = (revVideo + revInter + r.rev25) !== 0 ? (r.rev25 * 100) / (revVideo + revInter + r.rev25) : 0
              r = Object.assign(r, {
                totalCost: totalCost,
                totalRev: totalRev,
                profit: profit,
                roas: roas,
                revVideo: revVideo,
                revInter: revInter,
                inApp: r.rev25,
                iapTotalRev: iapTotalRev,
              })
            })
          }
          if (mutation.type === 'report/RETURN_LIST_GAME') {
            this.listGame = [...this.listGame, ...mutation.payload]
          }
          if (mutation.type === 'report/RETURN_YEAR') {
            this.listYear = mutation.payload
          }
        })
      },
      formatDate (date) {
        if (!date) return ''
        return moment(date).format('DD/MM/YYYY')
      },
      async filterByGame () {
        try {
          this.isTableLoading = true
          if (this.game === 'Tất cả') {
            await this.$store.dispatch('report/getReportsWeek')
          } else {
            await this.$store.dispatch('report/getReportsWeekByGame', { game: this.game })
          }
          this.isTableLoading = false
        } catch (error) {
          console.log(error)
        }
      },
      async searchByWeek () {
        try {
          if (Number(this.week1) > Number(this.week2)) {
            const tmp = this.week1
            this.week1 = this.week2
            this.week2 = tmp
          }

          this.isTableLoading = true
          if (this.game === 'Tất cả' && !(this.year && (this.week1 || this.week1 === 0) && (this.week2 || this.week2 === 0))) {
            await this.$store.dispatch('report/getReportsWeek')
          } else if (this.game && !(this.year && (this.week1 || this.week1 === 0) && (this.week2 || this.week2 === 0))) {
            await this.$store.dispatch('report/getReportsWeekByGame', { game: this.game })
          } else if (this.game === 'Tất cả' && this.year && (this.week1 || this.week1 === 0) && (this.week2 || this.week2 === 0)) {
            await this.$store.dispatch('report/findReportByWeek', { startWeek: this.week1, endWeek: this.week2, year: this.year })
          } else {
            await this.$store.dispatch('report/findReportByWeek', {
              startWeek: this.week1,
              endWeek: this.week2,
              year: this.year,
              game: this.game,
            })
          }
          this.isTableLoading = false
        } catch (error) {
          console.log(error)
        }
      },
      parseIntValue (value) {
        return Math.round(value * 100) / 100
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
}
</style>
