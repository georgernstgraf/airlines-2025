import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import FlightSearch from './pages/FlightSearch.vue'
import BookFlight from './pages/BookFlight.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'FlightSearch',
    component: FlightSearch
  },
  {
    path: '/book',
    name: 'BookFlight',
    component: BookFlight
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
