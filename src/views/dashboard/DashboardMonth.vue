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
          height="42px"
          placeholder="Chọn Game"
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
                {{ props.item._id.month }}/{{ props.item._id.year }}
              </td>
              <td
                v-for="(item, i) in headerFilter.slice(2, headerFilter.length)"
                :key="i"
                class="text-center"
                :v-if="[...costItem, ...revValue].includes(item.text)"
              >
                {{ props.item[item.value] }}
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

  export default {
    data () {
      return {
        sortBy: 'fat',
        sortDesc: false,
        headers: header.monthDashboardHeader,
        listGame: ['Tất cả'],
        reports: [],
        isTableLoading: false,
        game: 'Tất cả',
        costItem: header.costItems,
        revItem: header.revItems,
        costValue: [],
        revValue: [],
      }
    },
    computed: {
      headerFilter () {
        if (this.costValue.length !== 0 || this.revValue.length !== 0) {
          return this.headers.filter((item) => [...this.costValue, ...this.revValue].includes(item.text) || item.text === 'Game' || item.text === 'Tháng')
        } else {
          return this.headers
        }
      },
    },
    async created () {
      try {
        this.isTableLoading = true
        this.setupEventListener()
        await Promise.all([await this.$store.dispatch('report/getReportsMonth'), await this.$store.dispatch('report/getListGame')])
        this.isTableLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      toggleOrder () {
        this.sortDesc = !this.sortDesc
      },
      nextSort () {
        let index = this.headers.findIndex(h => h.value === this.sortBy)
        index = (index + 1) % this.headers.length
        this.sortBy = this.headers[index].value
      },
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'report/RETURN_REPORT_MONTH') {
            this.reports = mutation.payload
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
            await this.$store.dispatch('report/getReportsMonth')
          } else {
            await this.$store.dispatch('report/getReportsMonthByGame', { game: this.game })
          }
          this.isTableLoading = false
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
}
</style>
