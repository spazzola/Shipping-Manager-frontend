import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from '../views/TheLogin.vue'
import OrderList from '../views/orders/OrderList.vue'
import OrderAdd from '../views/orders/OrderAdd.vue'
import OrderEdit from '../views/orders/OrderEdit.vue'
import OrderDetail from '../views/orders/OrderDetail.vue'
import CompaniesList from '../views/merhants/CompaniesList.vue'
import CompanyDetail from '../views/merhants/CompanyDetail.vue'
import CompanyEdit from '../views/merhants/CompanyEdit.vue'
import CompanyAdd from '../views/merhants/CompanyAdd.vue'
import DriversList from '../views/drivers/DriversList.vue'
import DriverAdd from '../views/drivers/DriverAdd.vue'
import DriverEdit from '../views/drivers/DriverEdit.vue'
import DriverDetail from '../views/drivers/DriverDetail.vue'
import InvoiceList from '../views/invoices/InvoiceList.vue'
import InvoiceDetail from '../views/invoices/InvoiceDetail.vue'
import InvoiceEdit from '../views/invoices/InvoiceEdit.vue'
import InvoiceAdd from '../views/invoices/InvoiceAdd.vue'

const routes = [
  {
    path: '/',
    name: 'TheLogin',
    component: TheLogin
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
  },
  {
    path: '/drivers',
    component: DriversList
  },
  {
    path: '/driver/:id',
    component: DriverDetail,
    props: true,
    children: [
      {
        path: 'edit',
        component: DriverEdit
      }
    ]
  },
  {
    path: '/addDriver',
    component: DriverAdd
  },
  {
    path: '/orders',
    component: OrderList
  },
  {
    path: '/order/:id',
    component: OrderDetail,
    props: true,
    children: [
      {
        path: 'edit',
        component: OrderEdit
      }
    ]
  },
  {
    path: '/addOrder',
    component: OrderAdd
  },
  {
    path: '/invoices',
    component: InvoiceList
  },
  {
    path: '/invoice/:id',
    component: InvoiceDetail,
    props: true,
    children: [
      {
        path: 'edit',
        component: InvoiceEdit
      }
    ]
  },
  {
    path: '/addInvoice',
    component: InvoiceAdd
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
