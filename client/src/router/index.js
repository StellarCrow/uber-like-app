import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import { role } from "../utils/constants";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "/registration/:role",
        name: "Registration",
        component: () => import("../views/Registration.vue"),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/create",
        name: "Create",
        component: () => import("../views/Create.vue"),
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.name === "Registration") {
        const paramRole = to.params.role;
        if (paramRole === role.DRIVER || paramRole === role.SHIPPER) {
            next();
        } else {
            next("/");
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            //Redirect to the Homepage
            next("/");
        } else next();
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isAuthenticated) {
            //Redirect to the profile page
            next(`/profile`);
        } else next();
    } else next();
});

export default router;
