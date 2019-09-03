<config lang="json">
    {
    navigationBarTitleText: '分类',
    usingComponents: {
    "van-tab": "../../native/lib/vant/tab/index",
    "van-tabs": "../../native/lib/vant/tabs/index"
    }
    }
</config>
<template>
  <div class="Searchclassification">
    <div class="topdv">
      <div class="section">
        <div class="searchimg">
          <img src="../../native/tabbar/搜索.png" alt="" />
        </div>
        <input
          v-model.trim="keywords"
          @focus="backto"
          placeholder-style="color:#c10d0d"
        />
      </div>
      <div class="topmusic" @click="flag">
        取消
      </div>
    </div>
    <van-tabs active="active" @change="onChange">
      <van-tab title="单曲"><single :keywords="keywords" v-if="active === 0"></single></van-tab>
      <van-tab title="视频"
        ><searchvideo :keywords="keywords" v-if="active === 1"></searchvideo
      ></van-tab>
      <van-tab title="歌手"><singers :keywords="keywords" v-if="active === 2"></singers></van-tab>
      <van-tab title="专辑"><album :keywords="keywords" v-if="active === 3"></album></van-tab>
      <van-tab title="歌单"
        ><songsheet :keywords="keywords" v-if="active === 4"></songsheet
      ></van-tab>
      <van-tab title="主播电台"
        ><radiostation :keywords="keywords" v-if="active === 5"></radiostation
      ></van-tab>
      <van-tab title="用户"><userNav :keywords="keywords" v-if="active === 6"></userNav></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import single from "../../components/Searchclassification/single";
import searchvideo from "../../components/Searchclassification/searchvideo";
import singers from "../../components/Searchclassification/singers";
import album from "../../components/Searchclassification/album";
import songsheet from "../../components/Searchclassification/songsheet";
import radiostation from "../../components/Searchclassification/radiostation";
import userNav from "../../components/Searchclassification/userNav";
export default {
  name: "Searchclassification",
  components: {
    single,
    album,
    userNav,
    searchvideo,
    singers,
    radiostation,
    songsheet
  },
  props: {},
  data() {
    return {
      active: 0, //当前标签
      keywords: "" //搜索值
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
      this.active = val.detail.index;
    },
    flag() {
      wx.navigateBack(-1);
    },
    // 获取焦点返回
    backto() {
      // console.log(1);
      wx.navigateBack(-1);
    }
  },
  mounted() {},
  created() {},
  // 获取搜索值
  onLoad: function(options) {
    this.keywords = options.key;
    console.log(this.keywords);
  },

  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.topdv {
  display: flex;
  margin: 15rpx;
  justify-content: space-around;
  align-items: center;
}
.searchimg img {
  width: 40rpx;
  vertical-align: middle;
  height: 40rpx;
  left: 10%;
  position: absolute;
}
.section {
  position: relative;
  text-align: center;
  background: #fafafa;
  width: 500rpx;
  margin-top: 10rpx;
  border-radius: 40rpx;
  padding: 6rpx 20rpx;
}
</style>
