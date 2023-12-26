import {
  createWebHashHistory,
  createWebHistory,
  createMemoryHistory,
  createRouter,
} from "vue-router";
import Vue from "vue";
import Main from "../views/Main/MainLayout.vue";

const routes = [
  {
    path: "/main",
    component: Main,
    children: [
      {
        path: "news",
        name: "news",
        meta: {
          title: "Новости",
        },
        component: () => import("../views/Main/News/News.vue"),
      },
      {
        path: "main-news",
        name: "main-news",
        meta: {
          title: "Главные новости",
        },
        component: () => import("../views/Main/MainNews/MainNews.vue"),
      },
      {
        path: "daily-news",
        name: "daily-news",
        meta: {
          title: "Ежедневные новости",
        },
        component: () => import("../views/Main/DailyNews/DailyNews.vue"),
      },
      {
        path: "news-detail/:id",
        name: "news-detail",
        meta: {
          title: "Новости",
        },
        props: true,
        component: () => import("../views/Main/NewsDetail/NewsDetail.vue"),
      },
      {
        path: "connection",
        name: "connection",
        meta: {
          title: "Прямая связь",
        },
        component: () => import("../views/Main/Connection/Connection.vue"),
      },
      {
        path: "sales/:vin?/:city?/:type?/:friendName?/:friendPhone?",
        name: "sales",
        meta: {
          title: "Скидки для сотрудников",
        },
        component: () => import("../views/Main/Sales/Sales.vue"),
      },
      {
        path: "profile",
        name: "profile",
        meta: {
          title: "Профиль сотрудника",
        },
        component: () => import("../views/Main/Profile/Profile.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../views/Auth/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../views/Auth/Login/Login.vue"),
      },
    ],
  },
  {
    path: "/codex-layout",
    component: () => import("../views/Codex/CodexLayout.vue"),
    children: [
      {
        path: "codex",
        name: "codex",
        component: () => import("../views/Codex/CodexMain.vue"),
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/Main/Map/Map.vue"),
  },
  { path: "/:catchAll(.*)", redirect: { name: "news" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const DEFAULT_TITLE = "Про Партком";
router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("userName")) {
    localStorage.setItem("adress", String(to.path));
    next({ name: "login" });
  } else if (to.name == "login" && localStorage.getItem("userName")) {
    next({ name: "news" });
  } else {
    next();
  }

  document.title =
    ((to.meta.title && to.meta.title + " / ") || "") + DEFAULT_TITLE;
});

export default router;
