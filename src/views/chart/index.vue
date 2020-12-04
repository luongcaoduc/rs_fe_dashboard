
<template>
  <div style="padding: 0px 40px;">
    <v-row style="padding: 20px">
      <v-col
        cols="12"
        md="3"
      >
        <v-autocomplete
          v-model="game"
          max-width="290px"
          :items="listGame"
          label="Game"
          placeholder="Chọn Game"
          @change="getReportByName"
        />
      </v-col>
    </v-row>
    <v-row style="margin-top: 80px">
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="light-blue lighten-4"
          icon="mdi-clipboard-text"
          title="Cost"
          class="px-5 py-3"
          style="width: 100%"
        >
          <vue-apex-charts
            width="100%"
            type="line"
            :options="chartOptions"
            :series="series"
          />
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          color="amber lighten-3"
          icon="mdi-clipboard-text"
          title="Revenue"
          class="px-5 py-3"
          style="width: 100%"
        >
          <vue-apex-charts
            width="100%"
            type="line"
            :options="chartOptions2"
            :series="series2"
          />
        </base-material-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import VueApexCharts from 'vue-apexcharts'
  import moment from 'moment'
  import data from '../../config/data'
  export default {
    components: {
      VueApexCharts,
    },
    data: function () {
      return {
        costItems: data.costItems,
        revItems: data.revItems,
        times: [],
        data: [],
        chartOptions: {},
        chartOptions2: {},
        listGame: [],
        game: '',
        options: {
          responsive: [
            {
              breakpoint: 800,
              options: {
                plotOptions: {
                  line: {
                    horizontal: false,
                  },
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
          chart: {
            id: 'vuechart-example',
            stacked: false,
          },
          stroke: {
            width: [3, 3, 3],
            curve: 'smooth',
          },
          markers: {
            size: 7,
          },
          yaxis: {
            title: {
              text: 'USD',
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {},
          },
          xaxis: {
            categories: [],
          },
        },
        series: [

        ],
        options2: {

          chart: {
            id: 'vuechart-example',
            stacked: false,
          },
          stroke: {
            width: [3, 3, 3],
            curve: 'smooth',
          },
          markers: {
            size: 7,
          },
          yaxis: {
            title: {
              text: 'USD',
            },
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {},
          },
          xaxis: {
            categories: [],
          },
        },
        series2: [

        ],
      }
    },
    async created () {
      this.setupEventListener()
      await this.$store.dispatch('report/getListGame')
      await this.$store.dispatch('report/getAllReport', { game: this.game })
      this.chartOptions = this.options
      this.chartOptions2 = this.options2
    },
    async mounted () {

    },
    methods: {
      setupEventListener () {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'report/RETURN_ALL_REPORT') {
            this.options.xaxis.categories = [...new Set(mutation.payload.map(item => moment(item._id.Date).format('DD-MM-YYYY')))]
            this.options2.xaxis.categories = [...new Set(mutation.payload.map(item => moment(item._id.Date).format('DD-MM-YYYY')))]
            this.series = this.costItems.map((item, index) => {
              return {
                name: item,
                data: mutation.payload.map(r => Math.round(r[`cost${index + 1}`] * 100) / 100),
              }
            })
            this.series = this.series.filter(r => r.data.reduce((sum, a) => sum + a, 0) !== 0)
            this.series2 = this.revItems.map((item, index) => {
              return {
                name: item,
                data: mutation.payload.map(r => Math.round(r[`rev${index + 1}`] * 100) / 100),
              }
            })
            this.series2 = this.series2.filter(r => r.data.reduce((sum, a) => sum + a, 0) !== 0)
          }
          if (mutation.type === 'report/RETURN_LIST_GAME') {
            this.listGame = mutation.payload
            this.game = this.listGame[0]
          }
        })
      },
      async getReportByName () {
        try {
          await this.$store.dispatch('report/getAllReport', { game: this.game })
        } catch (error) {
          console.log(error)
        }
      },
    },
  }
</script>
