import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import Main from "@/Components/Main.vue";
import NotFound from "@/Components/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/:id',
      component: Main,
    },
    {
      path: '/',
      component: Main,
    },
  ]
})

export default router
