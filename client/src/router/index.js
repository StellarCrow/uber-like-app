import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

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
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            //Redirect to the Homepage
            next("/");
        } else next();
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isAuthenticated) {
            //Redirect to the profile page
            next(`/users/${store.getters.user._id}`);
        } else next();
    } else next();
});

export default router;
