<template>
  <div style="padding: 0px 40px; margin-top: 30px">
    <v-row>Import USD file:</v-row>
    <v-row>
      <v-col cols="3">
        <v-file-input
          v-model="files1"
          color="deep-purple accent-4"
          counter
          label="File input"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="green"
          large
          :disabled="files1.length > 0 ? false : true"
          @click="importData(1)"
        >
          import
        </v-btn>
      </v-col>
    </v-row>
    <v-row>Import VND file:</v-row>
    <v-row>
      <v-col cols="3">
        <v-file-input
          v-model="files2"
          color="deep-purple accent-4"
          counter
          label="File input"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="green"
          large
          :disabled="files2.length > 0 ? false : true"
          @click="importData(2)"
        >
          import
        </v-btn>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </div>
</template>

<script>
  export default {
    data: () => ({
      files1: [],
      files2: [],
      overlay: false,
    }),
    watch: {
      files: function (val) {
        console.log(val)
      },
    },
    methods: {
      async importData (index) {
        try {
          if (index === 1) {
            this.overlay = true
            await this.$store.dispatch('user/importData', { files: this.files1 })
            this.files1 = []
            this.overlay = false
          } else {
            try {
              this.overlay = true
              await this.$store.dispatch('user/importData2', { files: this.files2 })
              this.files2 = []
              this.overlay = false
            } catch (error) {
              if (error.response.status === 409) {
                alert('Sai dạng file')
                this.overlay = false
              }
            }
          }
        } catch (error) {
          alert('Có lỗi xảy ra xin vui lòng thử lại')
        }
      },
    },
  }
</script>
