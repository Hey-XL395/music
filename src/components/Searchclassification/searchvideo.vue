<template>
  <div class="searchvideo">
    <div v-for="(item, index) in videos" :key="index" class="videonav" @click="todetails(item)">
      <div class="videonav1">
        <img class="videonavimg" :src="item.coverUrl" alt="" />
        <div class="playnum">
          <img class="playimg" src="../../native/tabbar/三角形.png" alt="" />
          <span v-if="parseInt(item.playTime / 10000) > 10"
            >{{ parseInt(item.playTime / 10000) }}万</span
          >
          <span v-else>{{ item.playTime }}</span>
        </div>
      </div>
      <div class="videonav2">
        <div>{{ item.title }}</div>
        <div>
          <span>{{item.durationms}},</span>
          {{ item.creator[0].userName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchvideo",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      videos: {} //当前页视频
    };
  },
  methods: {
    // 点击视频去详情
    todetails(item){
      console.log(item);
      wx.navigateTo({
        url: `../../pages/playMove/playMove?id=${item.vid}`
      })
    }
  },
  mounted() {
    console.log(this.keywords);
    // 获取当前页面视频
    wx.showLoading();
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=1014`)
      .then(res => {
        // console.log(res.data.result.videos);
        this.videos = res.data.result.videos;
        wx.hideLoading();
        this.videos.map(item => {
          let i = parseInt(parseInt(item.durationms / 1000) / 60);
          let j = parseInt(parseInt(item.durationms / 1000) % 60);
          if (Number(i) < 10) {
            i = `0${i}`;
          }
          if (Number(j) < 10) {
            j = `0${j}`;
          }
          item.durationms = `${i}:${j}`;
        });
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.videonav {
  display: flex;
  justify-content: space-around;
}
.videonavimg {
  width: 100%;
  border-radius: 15rpx;
  height: 150rpx;
  z-index: -1;
}
.playnum {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24rpx;
  color: #ffffff;
  padding: 10rpx;
}
.videonav1 {
  width: 30%;
  position: relative;
}
.videonavimg {
  position: relative;
}
.videonav2 {
  width: 70%;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin-left: 30rpx;
}
.videonav2 div:first-child {
  margin: 25rpx 0;
  font-size: 26rpx;
}
.playimg {
  width: 24rpx;
  height: 24rpx;
  vertical-align: middle;
  align-items: center;
}
.videonav2 div:last-child {
  margin: 20rpx 0;
  font-size: 24rpx;
  color: #b3b3b3;
  margin-top: 20rpx;
}
</style>
