import App from "./App";
import Vue from "vue";
import VHtmlPlugin from "@megalo/vhtml-plugin";
import Vuex from "vuex";
const Fly = require("./native/lib/fly/wx.js");
const fly = new Fly();
const play = wx.createInnerAudioContext();

fly.config.baseURL = "http://116.62.234.172:3000";

Vue.use(VHtmlPlugin);
Vue.use(Vuex);

const store = require("./store").default;
Vue.prototype.$store = store;
Vue.prototype.$play = play;
Vue.prototype.$fly = fly;
const app = new Vue(App);

app.$mount();

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      "pages/Home/Home",
      "pages/Singer/Singer",
      "pages/my/my",
      "pages/Details/Details",
      "pages/Play/Play",
      "pages/Land/Land",
      "pages/singerDetails/singerDetails",
      "pages/radiosdetails/radiosdetails",
      "pages/playMove/playMove",
      "pages/playMove/playMv",
      "pages/Searchclassification/Searchclassification"
    ],
    tabBar: {
      color: "#333",
      selectedColor: "#c10d0d",
      list: [
        {
          pagePath: "pages/Home/Home",
          text: "发现",
          iconPath: "native/tabbar/发现1.png",
          selectedIconPath: "native/tabbar/发现.png"
        },
        {
          pagePath: "pages/Singer/Singer",
          text: "歌手",
          iconPath: "native/tabbar/音乐1.png",
          selectedIconPath: "native/tabbar/音乐.png"
        },
        {
          pagePath: "pages/my/my",
          text: "我的",
          iconPath: "native/tabbar/我的1.png",
          selectedIconPath: "native/tabbar/我的.png"
        }
      ]
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#c10d0d",
      navigationBarTitleText: "网易云音乐",
      navigationBarTextStyle: "white"
    }
  }
};
