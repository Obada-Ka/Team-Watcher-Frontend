/* eslint-disable */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthService from "@/services/auth.service";
// @ts-ignore
const AuthPage = () => import("../pages/auth-page/AuthPage.vue");
// @ts-ignore
const MainPage = () => import("../pages/main-page/MainPage.vue");
// @ts-ignore
const TimersPage = () => import("../pages/actions/TimersPage.vue");
// @ts-ignore
const UserActions = () => import("../pages/main-page/UserActions.vue");
// @ts-ignore
const WatchersPage = () => import("../pages/actions/WatchersPage.vue");
// @ts-ignore
const ManagementPage = () => import("../pages/actions/ManageUsersPage.vue");
// @ts-ignore
const NotFound = () => import("../pages/manage-routing/NotFound.vue");
// @ts-ignore
const NotAdmin = () => import("../pages/manage-routing/NotAdmin.vue");
const auth = new AuthService();
const that: any = this;
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AuthPage",
    component: AuthPage,
  },
  {
    path: "/main-page",
    name: "MainPage",
    meta: { needsAuth: true },
    component: MainPage,
    children: [
      {
        path: "/main-page",
        name: "UserActions",
        meta: { needsAuth: true },
        component: UserActions,
      },
      {
        path: "/main-page/timers",
        name: "Timers",
        meta: { needsAuth: true },
        component: TimersPage,
      },
      {
        path: "/main-page/watch-all",
        name: "Watchers",
        meta: { needsAuth: true, isAdmin: true },
        component: WatchersPage,
      },
      {
        path: "/main-page/manage-all",
        name: "Management",
        meta: { needsAuth: true, isAdmin: true },
        component: ManagementPage,
      },
    ],
  },
  { path: "/:notFound(.*)", component: NotFound },
  { name: "Not-Admin", path: "/not-admin", component: NotAdmin },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  if (to.fullPath === "/" && auth.checkIsLoggedIn()) {
    return {
      name: "UserActions",
    };
  }
  if (to.meta.needsAuth && !auth.checkIsLoggedIn()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: "AuthPage",
    };
  }
  if (to.meta.isAdmin && !auth.checkIsAdmin()) {
    return {
      name: "Not-Admin",
    };
  }
});
export default router;
