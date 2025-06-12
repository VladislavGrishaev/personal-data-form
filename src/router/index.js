import { createRouter, createWebHistory } from 'vue-router'
import FormPage from '../views/FormPage.vue'
import PreviewPage from '../views/PreviewPage.vue'

const routes = [
  { path: '/', name: 'FormPage', component: FormPage },
  { path: '/preview', name: 'PreviewPage', component: PreviewPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
