import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: () => import("./components/Main"),
        },
        {
            path: "/:id",
            component: () => import("./components/Main")
        }
    ]
});