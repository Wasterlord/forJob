import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { mediaQueryPoint } from "../models/storeModels";

import { OwnerNewsModel } from "../models/ownerNewsModel";
import { MainNewsModel } from "../models/mainNewsModel";
import { discountFile } from "../models/discountFile";
import { userModel, IUserModel } from "../models/userModel";
import { AxiosResponse, AxiosError } from "axios";
import router from "../router";
import AuthHttpService from "../services/Auth.http.service";
import MainHttpService from "../services/Main.http.service";

export interface State {
  count: number;
  sizeError: boolean;
  user: userModel;
  loader: boolean;
  auth: {
    token: string;
    isAuthorizeid: boolean;
  };
  discountFiles: discountFile[];
  departments: any[];
  cities: any[];
  errorMessage: string;
  successMessage: string;
  ordersHistory: any[];
  news: any;
  salesNews: MainNewsModel[],
  newsMainPage: MainNewsModel[];
  newsDailyPage: MainNewsModel[];
  newsDetail: any;
  mediaQueryPoints: mediaQueryPoint[];
  windowWidth: number;
  breakPoint: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 1,
    departments: [],
    loader: false,
    cities: [],
    sizeError: false,
    auth: {
      token: "",
      isAuthorizeid: false,
    },
    discountFiles: [],
    ordersHistory: [],
    errorMessage: "",
    successMessage: "",
    newsDetail: {},
    newsMainPage: [],
    newsDailyPage: [],

    news: {
      owner: [],
      main: [],
      daily: [],
    },
    salesNews: [],
    user: new userModel(),
    windowWidth: 0,
    breakPoint: "desktop",
    mediaQueryPoints: [
      {
        name: "desktop",
        minWidth: 1368,
      },
      {
        name: "laptop",
        minWidth: 1025,
        maxWidth: 1368,
      },
      {
        name: "tablet",
        minWidth: 768,
        maxWidth: 1024,
      },
      {
        name: "phablet",
        minWidth: 500,
        maxWidth: 767,
      },
      {
        name: "mobile",
        maxWidth: 499,
      },
    ],
  },
  getters: {
    width(state): number {
      return state.windowWidth;
    },
    querys(state): mediaQueryPoint[] {
      return state.mediaQueryPoints;
    },
  },
  mutations: {
    setErrorSize(state, status) {
      state.sizeError = status;
    },
    changeWidth(state, width) {
      state.windowWidth = width;
    },
    changeLoader(state, status) {
      state.loader = status;
    },
    setError(state, error) {
      state.errorMessage = error;
      setTimeout(() => {
        state.errorMessage = "";
      }, 3000);
    },
    setOrdersHistory(state, history){
      state.ordersHistory = history.data.orders;
    },
    setSuccess(state, msg) {
      state.successMessage = msg;
      setTimeout(() => {
        state.successMessage = "";
      }, 3000);
    },
    setBreakpoint(state, name) {
      state.breakPoint = name;
    },
    setNews(state, news) {
      state.news.owner = news.data.owner.map((i) => new OwnerNewsModel(i));
      state.news.main = news.data.main.map((i) => new MainNewsModel(i));
      state.news.daily = news.data.daily.map((i) => new MainNewsModel(i));
    },

    setSalesNews(state, news) {
      state.salesNews = news.data.news.map((i) => new MainNewsModel(i));
    },
    setNewsMain(state, news) {
      state.newsMainPage = news.data.news.map((i) => new MainNewsModel(i));
    },
    setDiscountFiles(state, files) {
      console.log(files);
      state.discountFiles = files.data.map((i) => new discountFile(i));
    },
    setNewsDaily(state, news) {
      state.newsDailyPage = news.data.news.map((i) => new MainNewsModel(i));
    },
    setDetails(state, details) {
      state.newsDetail = details.data;
    },
    setComments(state, comment) {
      console.log(comment);
    },
    setNewsLike(state, id) {
      console.log(id);
    },
    setCommentLike(state, id) {
      let comment = state.newsDetail.comments.find((i) => i.id == id);
      comment.is_liked = !comment.is_liked;
      if (comment.is_liked == true) {
        comment.like_count++;
      } else {
        comment.like_count--;
      }
    },
    setChildCommentLike(state, data) {
      let comment = state.newsDetail.comments.find(
        (i) => i.id == data.commentId
      );
      let child = comment.sub.find((i) => i.id == data.childId);
      child.is_liked = !child.is_liked;
      if (child.is_liked == true) {
        child.like_count++;
      } else {
        child.like_count--;
      }
    },
    setProfileChanges(state, data) {
      state.departments = data.data.departments;
      // state.user.avatar = data.data.profile.avatar;
      // state.user.avatar = data.data.profile.name;
      state.user = new userModel(data.data.profile);
    },
    setUser(state, user) {
      localStorage.setItem(
        "userName",
        `${user.data.name} ${user.data.surname}`
      );

      localStorage.setItem("userRole", user.data.position);
      localStorage.setItem("userCity", user.data.city);
      localStorage.setItem("userId", user.data.user_id);
      // state.user = user.data;
      // router.push({ name: "news" });
      // if (localStorage.getItem("adress")) {
      //   console.log(localStorage.getItem("adress"))
      // }
      if (localStorage.getItem("adress")) {
        router.push({ path: String(localStorage.getItem("adress")) });
        localStorage.setItem("adress", "");
      } else {
        router.push({ name: "news" });
      }
    },
    removeUser(state) {
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userCity");
      localStorage.removeItem("userId");
      state.user = new userModel();
      router.push({ name: "login" });
    },
  },
  actions: {
    templateBreakpoints(store, width) {
      store.commit("changeWidth", width);
      store.state.mediaQueryPoints.forEach((v) => {
        if (
          (v.minWidth ? width >= v.minWidth : true) &&
          (v.maxWidth ? width <= v.maxWidth : true)
        ) {
          store.commit("setBreakpoint", v.name);

          return;
        }
      });
    },

    getNews(store) {
      return new Promise((resolve, reject) => {
        MainHttpService.getNews().then((res) => {
          store.commit("setNews", res.data);
          resolve(res);
        });
      });
    },

    getProfileFiles(store) {
      return new Promise((resolve, reject) => {
        MainHttpService.getProfileFiles().then((res) => {
          resolve(res);
        });
      });
    },

    getSalesNews(store) {
      return new Promise((resolve, reject) => {
        MainHttpService.getSalesNews().then((res) => {
          store.commit("setSalesNews", res.data);
          resolve(res);
        });
      });
    },

    

    getDiscountFiles(store) {
      return new Promise((resolve, reject) => {
        MainHttpService.getDiscountFiles().then((res) => {
          store.commit("setDiscountFiles", res.data);
          resolve(res);
        });
      });
    },

    downloadFile(store, id: number) {
      return new Promise((resolve, reject) => {
        MainHttpService.downloadFile(id).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
    getOrdersHistory(store, { page, limit }) {
      return new Promise((resolve, reject) => {
        MainHttpService.getOrdersHistory(page, limit).then((res) => {
          store.commit("setOrdersHistory", res.data);
          resolve(res);
        });
      });
    },
    

    getProfile(store) {
      return new Promise((resolve, reject) => {
        MainHttpService.getProfile().then((res) => {
          store.commit("setProfileChanges", res.data);
          resolve(res);
        });
      });
    },
    getNewsMain(store, data) {
      return new Promise((resolve, reject) => {
        MainHttpService.getNewsMain(data).then((res) => {
          store.commit("setNewsMain", res.data);
          resolve(res);
        });
      });
    },
    getNewsDaily(store, data) {
      return new Promise((resolve, reject) => {
        MainHttpService.getNewsDaily(data).then((res) => {
          store.commit("setNewsDaily", res.data);
          resolve(res);
        });
      });
    },

    updateProfile(store, data: userModel) {
      return new Promise((resolve, reject) => {
        MainHttpService.updateProfile(data).then((res) => {
          // store.commit("setProfileChanges", res.data);
          resolve(res);
        });
      });
    },
    uploadAvatar(store, data: any) {
      return new Promise((resolve, reject) => {
        MainHttpService.uploadAvatar(data).then((res) => {
          // store.commit("setProfileChanges", res.data);
          resolve(res);
        });
      });
    },

    likeNews(store, id: number) {
      return new Promise((resolve, reject) => {
        MainHttpService.likeNews(id).then((res) => {
          store.commit("setNewsLike", id);
          resolve(res);
        });
      });
    },
    likeChildComment(store, data) {
      return new Promise((resolve, reject) => {
        MainHttpService.likeComment(data.childId).then((res) => {
          store.commit("setChildCommentLike", data);
          resolve(res);
        });
      });
    },
    likeComment(store, id: number) {
      return new Promise((resolve, reject) => {
        MainHttpService.likeComment(id).then((res) => {
          store.commit("setCommentLike", id);
          resolve(res);
        });
      });
    },
    getDetail(store, id: number) {
      return new Promise((resolve, reject) => {
        MainHttpService.getDetails(id).then((res) => {
          store.commit("setDetails", res.data);
          resolve(res);
        });
      });
    },
    makeMyOrder(store, data: any) {
      return new Promise((resolve, reject) => {
        MainHttpService.myOrder(data).then((res) => {
          resolve(res);
        });
      });
    },
    makeFriendOrder(store, data: any) {
      return new Promise((resolve, reject) => {
        MainHttpService.friendOrder(data).then((res) => {
          resolve(res);
        });
      });
    },
    addComments(store, data: any) {
      return new Promise((resolve, reject) => {
        MainHttpService.addComment(data).then((res) => {
          store.commit("setComments", res.data);
          resolve(res);
        });
      });
    },
    editComments(store, data: any) {
      return new Promise((resolve, reject) => {
        MainHttpService.editComment(data).then((res) => {
          store.commit("setComments", res.data);
          resolve(res);
        });
      });
    },
    login(store, { phone, password }: any) {
      return new Promise((resolve, reject) => {
        AuthHttpService.login(phone, password).then((res) => {
          store.commit("setUser", res.data);
          resolve(res);
        });
      });
    },
    registration(store, { phone, password }: any) {
      return new Promise((resolve, reject) => {
        AuthHttpService.registration(phone, password).then((res) => {
          console.log(res);
          resolve(res);
        });
      });
    },
    logout(store) {
      return new Promise((resolve, reject) => {
        AuthHttpService.logout().then((res) => {
          store.commit("removeUser", res.data);
          resolve(res);
        });
      });
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
