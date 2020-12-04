import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

async function auth (from, to, next) {
  store.commit('user/GET_LOCAL_USER_INFO')
  if (store.state.user.user && store.state.user.token) {
    next()
  } else {
    next('/login')
  }
}

async function routeLogin (from, to, next) {
  store.commit('user/GET_LOCAL_USER_INFO')
  if (store.state.user.user && store.state.user.token) {
    next('/')
  } else {
    next()
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
          name: 'Nhân viên',
          component: () => import('@/views/user'),
        },
        {
          path: '/chart',
          name: 'Biểu đồ',
          component: () => import('@/views/chart'),
        },
        {
          path: '/permission/:userId',
          name: 'Quyền',
          component: () => import('@/views/permissions'),
        },
        {
          path: '/import-data',
          name: 'Import Data',
          component: () => import('@/views/importData'),
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
      beforeEnter: routeLogin,
      component: () => import('@/views/login/index'),
    },
    {
      path: '/change-pass',
      name: 'Change Password',
      beforeEnter: auth,
      component: () => import('@/views/changePass/changePass'),
    },
  ],
})
