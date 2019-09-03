<config lang="json">
    {
    navigationBarTitleText: '网易云音乐',
    usingComponents: {
    }
    }
</config>

<template>
  <div class="Home">
<!--    显示隐藏-->
    <div v-if="flag === true">
      <searchNav :flag.sync="flag"></searchNav>
    </div>
    <div v-else>
      <!--    顶部搜索-->
      <div class="Homesearch">
        <div class="topdv">
          <div class="ConcertHall">音乐馆</div>
          <div class="section">
            <div class="searchimg">
              <img src="../../native/tabbar/搜索.png" alt="" />
            </div>
            <input
              @click="inp"
              placeholder-style="color:#c10d0d"
              placeholder="搜索"
            />
          </div>
          <div class="topmusic">
            <img
              class="topmusicimg"
              :class="{ run1: flag1 === true }"
              src="../../native/tabbar/top音乐.png"
              alt=""
              @click="todetails"
            />
          </div>
        </div>
      </div>
      <!--        顶部轮播图-->
      <swiper
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        class="banner"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item>
            <img :src="item.imageUrl" alt="" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>

      <!--        头部tab栏-->
      <header>
        <div>
          <div>每日推荐</div>
          <div><img src="../../native/tabbar/推荐报表.png" alt="" /></div>
        </div>
        <div>
          <div>歌单</div>
          <div><img src="../../native/tabbar/音乐2.png" alt="" /></div>
        </div>
        <div>
          <div>排行</div>
          <div><img src="../../native/tabbar/排行榜.png" alt="" /></div>
        </div>
        <div>
          <div>电台</div>
          <div><img src="../../native/tabbar/蚂蚁-电台.png" alt="" /></div>
        </div>
        <div>
          <div>直播</div>
          <div><img src="../../native/tabbar/直播.png" alt="" /></div>
        </div>
      </header>
      <HomeNav :resource="resource" :title="title"></HomeNav>
      <HomeNav :resource.sync="album" :title="title1"></HomeNav>
      <HomeNav :resource="newsong" :title="title2"></HomeNav>
      <HomeNav :resource="djprogram" :title="title3"></HomeNav>
      <HomeNav :resource="recommendL" :title="title4"></HomeNav>
    </div>
  </div>
</template>

<script>
import searchNav from "../../components/Home/Homesearch"; //头部搜索
import HomeNav from "../../components/Home/HomeNav"; //首页主体

export default {
  name: "Home",
  components: {
    searchNav,
    HomeNav
  },
  props: {},
  data() {
    return {
      banner: [], //轮播图
      flag1: true, //暂停旋转
      title: ["推荐歌单", "歌单广场"],
      title1: ["新碟", "更多新碟", "新歌"],
      title2: ["音乐新势力", "新音乐"],
      title3: ["推荐电台", "更多电台"],
      title4: ["推荐节目", "更多节目"],
      resource: {}, //推荐歌单
      newsong: [], //音乐新势力
      djprogram: [], //推荐电台
      recommendL: [], //推荐节目，
      album: [], //新碟
      flag: false //搜索页面显示隐藏
    };
  },
  methods: {
    inp() {
      this.flag = true;
    },
    new(data) {
      this.msg = data;
      console.log(this.msg);
    },
    todetails() {
      // 点击右上角图标去详情页
      wx.navigateTo({
        url: "../Play/Play"
      });
    }
  },
  mounted() {
    // 获取 新歌
    this.$fly.get("/top/song?type=7").then(response => {
      let res = response.data;
      this.$store.state.newSongs = res.data.splice(0, 6);
    });
    // 获取轮播与数据
    this.$fly
      .get(`/banner`)
      .then(res => {
        this.banner = res.data.banners;
      })
      .catch(e => {
        console.log(e);
      });
    // 获取首页主体数据，推荐歌单
    this.$fly
      .get(`/personalized`)
      .then(res => {
        this.resource = res.data.result.splice(0, 6);
      })
      .catch(e => {
        console.log(e);
      });
    // 获取首页主体数据，新碟
    this.$fly
      .get(`/album/newest`)
      .then(res => {
        this.album = res.data.albums.splice(0, 6);
        this.$store.state.album = this.album;
      })
      .catch(e => {
        console.log(e);
      });
    // 获取首页主体数据，音乐新势力
    this.$fly
      .get(`/personalized/newsong`)
      .then(res => {
        this.newsong = res.data.result.splice(0, 6);
      })
      .catch(e => {
        console.log(e);
      });
    // 获取首页主体数据，推荐电台
    this.$fly
      .get(`/personalized/djprogram`)
      .then(res => {
        this.djprogram = res.data.result.splice(0, 6);
      })
      .catch(e => {
        console.log(e);
      });
    // 获取首页主体数据，推荐节目
    this.$fly
      .get(`/program/recommend`)
      .then(res => {
        this.recommendL = res.data.programs.splice(0, 6);
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  // 生命周期，监听页面显示
  onShow: function() {
    // 判断当前是否正在播放
    this.flag1 = true
    this.$play.onTimeUpdate(() => {
      this.flag1 = false
    });
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Home {
  margin: 10rpx;
}
.Homesearch {
  margin: 10rpx;
}
.searchimg img {
  width: 40rpx;
  vertical-align: middle;
  height: 40rpx;
  left: 10%;
  position: absolute;
}
.ConcertHall {
  font-size: 40rpx;
  font-weight: bold;
}
.Homesearch .topmusic img {
  width: 60rpx;
  height: 60rpx;
}
.section {
  position: relative;
  text-align: center;
  background: #fafafa;
  border-radius: 40rpx;
  padding: 6rpx 20rpx;
}
.topdv {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.Home header {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 30rpx;
  font-family: NSimSun;
  font-weight: bold;
}
.Home header img {
  width: 50rpx;
  height: 50rpx;
  padding: 0 30rpx;
}
.banner {
  margin: 10rpx;
}
.slide-image {
  width: 100%;
  height: 300rpx;
  padding: 0 3rpx;
  border-radius: 20rpx;
}
.topmusic {
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.topmusicimg {
  -webkit-transform: rotate(360deg);
  animation: rotation 25s linear infinite;
  -moz-animation: rotation 25s linear infinite;
  -webkit-animation: rotation 25s linear infinite;
  -o-animation: rotation 25s linear infinite;
}
/*暂停旋转属性*/
.run1 {
  animation-play-state: paused;
}
</style>
