import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from './utils/cookies'
Vue.use(Router)

let router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/Home',
            name: 'Home',
            component: () =>
                import ('./pages/Home.vue'),
            children: [{
                    path: 'Welcome',
                    name: 'Welcome',
                    component: () =>
                        import ('./pages/Welcome.vue')
                }, {
                    path: 'AddItem',
                    name: 'AddItem',
                    component: () =>
                        import ('./pages/AddItem.vue')
                },
                {
                    path: 'ItemType',
                    name: 'ItemType',
                    component: () =>
                        import ('./pages/ItemType.vue')
                },
                {
                    path: 'CheckItem',
                    name: 'CheckItem',
                    component: () =>
                        import ('./pages/CheckItem.vue')
                },
                {
                    path: 'CheckItemDetail',
                    name: 'CheckItemDetail',
                    component: () =>
                        import ('./pages/CheckItemDetail.vue')
                },
                {
                    path: 'CheckItemEdit',
                    name: 'CheckItemEdit',
                    component: () =>
                        import ('./pages/CheckItemEdit.vue')
                },
                {
                    path: 'AddTest',
                    name: 'AddTest',
                    component: () =>
                        import ('./pages/AddTest.vue')
                }, {
                    path: 'createTest',
                    name: 'createTest',
                    component: () =>
                        import ('./pages/createTest.vue')
                },
                {
                    path: 'AddUser',
                    name: 'AddUser',
                    component: () =>
                        import ('./pages/AddUser.vue')
                },
                {
                    path: 'ClassRoomManger',
                    name: 'ClassRoomManger',
                    component: () =>
                        import ('./pages/ClassRoomManger.vue')
                },
                {
                    path: 'StudentsManger',
                    name: 'StudentsManger',
                    component: () =>
                        import ('./pages/StudentsManger.vue')
                },
                {
                    path: 'TestList',
                    name: 'TestList',
                    component: () =>
                        import ('./pages/TestList.vue')
                },
                {
                    path: 'ClassManger',
                    name: 'ClassManger',
                    component: () =>
                        import ('./pages/ClassManger.vue')
                },
                {
                    path: 'TestListDetail',
                    name: 'TestListDetail',
                    component: () =>
                        import ('./pages/TestListDetail.vue')
                },
                {
                    path: 'ToCheckClass',
                    name: 'ToCheckClass',
                    component: () =>
                        import ('./pages/ToCheckClass.vue')
                },
                {
                    path: 'UserShow',
                    name: 'UserShow',
                    component: () =>
                        import ('./pages/UserShow.vue')
                },
                {
                    path: 'Classmate',
                    name: 'Classmate',
                    component: () =>
                        import ('./pages/Classmate.vue'),
                }
            ]
        },
        {
            path: '/Login',
            name: 'Login',
            component: () =>
                import ('./pages/Login.vue')
        },
        {
            path: '/',
            name: 'ok',
            redirect: '/Login',
            meta:{
                title:'home'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/Login') {
        let isLogin = !!getCookie('token')
        if (!isLogin) {
            next('/Login')
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router;