<template>
  <v-main>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <!-- <dashboard-core-footer /> -->
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      // DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
