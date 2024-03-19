/* eslint-disable */
import {
    createRouter,
    createWebHistory,
} from "vue-router";

import LoginPage from "@/pages/auth/login/Index.vue";
import BookingPage from "@/pages/booking/Index.vue";
import MainLayout from "@/layout/main/Index.vue";
import AuthMainPage from "@/layout/auth/Index.vue";
import UsersPage from '@/pages/users/Index.vue';
import ConferencePage from "@/pages/booking/ItemPage.vue";
import AddUser from "@/pages/users/AddUser.vue";
import ServiceEdit from "@/pages/booking/ServiceEdit.vue";
import ServiceAdd from "@/pages/booking/ServiceAdd.vue";
import Profile from '@/pages/profile/Profile.vue'

const routes = [
    {
        path: "",
        redirect: "/booking",
        component: MainLayout,
        children: [
            {
                path: "booking",
                children: [
                    {path: '', name: "booking", component: BookingPage, meta: {requiresAuth: true}},
                    {
                        path: "item-page/:id/:driver",
                        children: [
                            {path: '', name: 'item-page', component: ConferencePage, meta: {requiresAuth: true}},
                            {path: "add", name: 'add', component: ServiceAdd, meta: {requiresAuth: true}},
                            {path: "edit/:id", name: 'edit', component: ServiceEdit, meta: {requiresAuth: true}}
                        ]
                    },
                ]
            },
            {
                path: "users",
                children: [
                    {path: '', name: "users", component: UsersPage, meta: {requiresAuth: true}},
                    {path: 'add-user', name: 'add-user', component: AddUser, meta: {requiresAuth: true}}
                ]
            },
            {
                path: "profile",
                children: [
                    {path: '', name: "profile", component: Profile, meta: {requiresAuth: true}},
                ]
            }
        ],
    },
    {
        path: "",
        redirect: "/loginpage",
        component: AuthMainPage,
        children: [
            {
                path: "loginpage",
                children: [
                    {
                        path: "",
                        name: "loginpage",
                        component: LoginPage,
                        meta: {requiresAuth: false},
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!$app.auth.loggedIn()) {
            $app.auth.needAuth(true);
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
