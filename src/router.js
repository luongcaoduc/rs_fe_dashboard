import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function auth (from, to, next) {
  if (localStorage.getItem('app_user') && localStorage.getItem('app_token')) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      redirect: '/dashboard/dashboard-day',
      beforeEnter: auth,
      children: [
        // Dashboard
        {
          name: 'Báo cáo ngày',
          path: 'dashboard/dashboard-day',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Báo cáo tuần',
          path: 'dashboard/dashboard-week',
          component: () => import('@/views/dashboard/DashboardWeek'),
        },
        {
          name: 'Báo cáo quý',
          path: 'dashboard/dashboard-quarter',
          component: () => import('@/views/dashboard/DashboardQuarter'),
        },
        {
          name: 'Báo cáo tháng',
          path: 'dashboard/dashboard-month',
          component: () => import('@/views/dashboard/DashboardMonth'),
        },
        // // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        // {
        //   name: 'Notifications',
        //   path: 'components/notifications',
        //   component: () => import('@/views/dashboard/component/Notifications'),
        // },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          path: '/user',
          name: 'Login',
          component: () => import('@/views/user'),
        },
        // {
        //   name: 'Typography',
        //   path: 'components/typography',
        //   component: () => import('@/views/dashboard/component/Typography'),
        // },
        // // Tables
        // {
        //   name: 'Regular Tables',
        //   path: 'tables/regular-tables',
        //   component: () => import('@/views/dashboard/tables/RegularTables'),
        // },
        // // Maps
        // {
        //   name: 'Google Maps',
        //   path: 'maps/google-maps',
        //   component: () => import('@/views/dashboard/maps/GoogleMaps'),
        // },
        // Upgrade
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index'),
    },
  ],
})
