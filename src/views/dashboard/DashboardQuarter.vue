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
          height="42px"
          @change="search()"
        />
      </v-col>
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
    <v-row style="margin-top: 50px">
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
          :footer-props="{itemsPerPageText: 'Số lượng bản ghi mỗi trang'}"
          no-data-text="Không có dữ liệu"
        >
          <template v-slot:item="props">
            <tr>
              <td class="purple--text">
                {{ props.item._id.Game }}
              </td>
              <td class="text-center">
                {{ props.item._id.quarter }}/{{ props.item._id.year }}
              </td>
              <td
                v-for="(item, i) in headerFilter.slice(2, headerFilter.length)"
                :key="i"
                class="text-center"
                :v-if="[...costItem, ...revValue].includes(item.text)"
              >
                {{ parseIntValue(props.item[item.value]) }}
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
  import moment from 'moment'
  import data from '../../config/data'

  export default {
    data () {
      return {
        sortBy: 'fat',
        sortDesc: false,
        headers: header.quarterDashboardHeader,
        listGame: ['Tất cả'],
        reports: [],
        isTableLoading: false,
        game: 'Tất cả',
        costItem: data.costItems,
        revItem: data.revItems,
        costValue: [],
        revValue: [],
      }
    },
    computed: {
      headerFilter () {
        if (this.costValue.length !== 0 || this.revValue.length !== 0) {
          return this.headers.filter((item) => [...this.costValue, ...this.revValue].includes(item.text) || item.text === 'Game' || item.text === 'Quý')
        } else {
          return this.headers
        }
      },
    },
    async created () {
      try {
        this.isTableLoading = true
        this.setupEventListener()
        await Promise.all([await this.$store.dispatch('report/getReportsQuarter'), await this.$store.dispatch('report/getListGame')])
        this.isTableLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'report/RETURN_REPORT_QUARTER') {
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
          if (this.game === 'Tất cả') {
            await this.$store.dispatch('report/getReportsQuarter')
          } else {
            await this.$store.dispatch('report/getReportsQuarterByGame', { game: this.game })
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
