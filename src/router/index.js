import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '../views/TheLogin.vue'
import OrderContent from '../views/orders/OrderContent.vue'
import CompaniesList from '../views/merhants/CompaniesList.vue'
import CompanyDetail from '../views/merhants/CompanyDetail.vue'
import CompanyEdit from '../views/merhants/CompanyEdit.vue'
import CompanyAdd from '../views/merhants/CompanyAdd.vue'

const routes = [
  {
    path: '/',
    name: 'TheLogin',
    component: TheLogin
  },
  {
    path: '/orders',
    name: 'OrderContent',
    component: OrderContent
  },
  {
    path: '/companies',
    component: CompaniesList
  },
  {
    path: '/company/:id',
    component: CompanyDetail,
    props: true,
    children: [
      {
        path: 'edit',
        component: CompanyEdit
      }
    ]
  },
  {
    path: '/addCompany',
    component: CompanyAdd
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
