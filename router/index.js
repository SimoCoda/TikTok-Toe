import {createRouter,createWebHistory} from 'vue-router'
import Welcome from '../pages/Welcome.vue'
import Game from '../pages/Game.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'welcome-page',
        component: Welcome
    },
    {
        path: '/game',
        name: 'game-page',
        component: Game
    }
    ]
})

export default router;