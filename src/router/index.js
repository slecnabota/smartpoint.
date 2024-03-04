/* eslint-disable */
import {
    createRouter,
    createWebHistory,
} from "vue-router";
import LoginPage from "@/pages/auth/login/Index.vue";
import BookingPage from "@/pages/booking/Index.vue";
import RegisterPage from "@/pages/auth/register/Index.vue";
import MainLayout from "@/layouts/main/Index.vue";
import AuthMainPage from "@/layouts/auth/Index.vue";
import ApplicationPage from '@/pages/application/Index.vue';
import UsersPage from '@/pages/users/Index.vue';
import ResidentPage from '@/pages/resident1/Index.vue';
import CoworkingPage from "@/pages/booking/CoworkingPage.vue";
import OfficePage from "@/pages/booking/OfficePage.vue";
import ConferencePage from "@/pages/booking/ConferencePage.vue";
import LockerHall from "@/pages/booking/LockerHall.vue";
import ServiceForm from "@/pages/booking/service-add/ServiceForm.vue";
import AddUser from "@/pages/users/AddUser.vue";

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
                    {path: "coworking", name: 'coworking', component: CoworkingPage, meta: {requiresAuth: true}},
                    {
                        path: "item-page/:id/:driver",
                        children: [
                            {path: '', name: 'item-page', component: ConferencePage, meta: {requiresAuth: true}},
                            {path: "add", name: 'add', component: ServiceForm, meta: {requiresAuth: true}},
                            {path: "edit/:id", name: 'edit', component: ServiceForm, meta: {requiresAuth: true}}
                        ]
                    },
                    {path: "office", name: 'office', component: OfficePage, meta: {requiresAuth: true}},
                    {path: "lockerhall", name: 'lockerhall', component: LockerHall, meta: {requiresAuth: true}},
                ]
            },
            {
                path: "application",
                name: "application",
                component: ApplicationPage,
                meta: {requiresAuth: true},
            },
            {
                path: "users",
                children: [
                    {path: '', name: "users", component: UsersPage, meta: {requiresAuth: true}},
                    {path: 'add-user', name: 'add-user', component: AddUser, meta: {requiresAuth: true}}
                ]
            },
            {
                path: "resident1",
                name: "resident1",
                component: ResidentPage,
                meta: {requiresAuth: true},
            },
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
            {
                path: "registerpage",
                children: [
                    {
                        path: "",
                        name: "registerpage",
                        component: RegisterPage,
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
