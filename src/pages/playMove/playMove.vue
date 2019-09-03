<template>
  <div class="playMove">
    <div class="section tc">
      <video id="myVideo" :src="url" enable-danmu danmu-btn controls></video>
    </div>
    <div class="title">
      {{ detail.title }}
      <div @click="showup" v-if="flag">
        <img src="../../native/tabbar/下.png" alt="" />
      </div>
      <div @click="showup" v-else>
        <img src="../../native/tabbar/上.png" alt="" />
      </div>
    </div>
    <div class="topvip" :class="{ height: flag === false }">
      <div class="top">
        <div>
          <span v-if="parseInt(detail.playTime / 10000) > 10"
            >{{ parseInt(detail.playTime / 10000) }}万次播放</span
          >
          <span v-else>{{ detail.playTime }}次播放</span>
        </div>
        <div
          v-for="(item, index) in detail.videoGroup"
          :key="index"
          class="vidersinger"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="msg">
        <span
          v-text="
            new Date(parseInt(detail.publishTime))
              .toLocaleString()
              .split(' ')[0]
              .replace('/', '-')
              .replace('/', '-')
          "
        ></span>
        <div>{{ detail.description }}</div>
      </div>
    </div>
    <div class="tabimg">
      <div>
        <img src="../../native/tabbar/赞.png" alt="" />
        <div>{{ detail.praisedCount }}</div>
      </div>
      <div>
        <img src="../../native/tabbar/添加.png" alt="" />
        <div>{{ detail.subscribeCount }}</div>
      </div>
      <div>
        <img src="../../native/tabbar/对话1.png" alt="" />
        <div>{{ detail.commentCount }}</div>
      </div>
      <div>
        <img src="../../native/tabbar/转发1.png" alt="" />
        <div>{{ detail.shareCount }}</div>
      </div>
    </div>
    <div v-if="detail.creator" class="fromhow">
      <div>
        <img :src="detail.creator.avatarUrl" alt="" class="img1" />{{
          detail.creator.nickname
        }}
      </div>
      <div class="like">+关注</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playMove",
  components: {},
  props: {},
  data() {
    return {
      url: "",
      detail: {},
      flag: true //显示上下
    };
  },
  methods: {
    showup() {
      this.flag = !this.flag;
    }
  },
  mounted() {},
  onLoad: function(options) {
    console.log(options);
    // 视频播放URL
    this.$fly
      .get(`/video/url?id=${options.id}`)
      .then(res => {
        console.log(res.data);
        this.url = res.data.urls[0].url;
      })
      .catch(e => {
        console.log(e);
      });
    // 获取当前视频详情
    this.$fly
      .get(`/video/detail?id=${options.id}`)
      .then(res => {
        console.log(res.data.data);
        this.detail = res.data.data;
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
#myVideo {
  width: 100%;
}
.vidersinger {
  font-size: 24rpx;
  color: #404040;
  background-color: #d8d8d8;
  padding: 5rpx 10rpx;
  margin: 10rpx 20rpx;
  border-radius: 20rpx;
}
.top {
  vertical-align: middle;
  align-items: center;
  margin-top: 20rpx;
  display: flex;
  font-size: 24rpx;
  justify-content: space-around;
  flex-wrap: wrap;
}
.topvip {
  height: 80rpx;
  overflow: hidden;
}
.title {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  margin: 20rpx;
}
.title img {
  width: 20rpx;
  height: 20rpx;
}
.height {
  height: 350rpx;
}
.msg {
  margin: 20rpx;
  color: #b4b4b4;
  font-size: 26rpx;
}
.like {
  color: white;
  font-size: 24rpx;
  background-color: red;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
}
.tabimg {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 25rpx;
  margin-top: 10rpx;
}
.tabimg img {
  width: 40rpx;
  height: 40rpx;
}
.fromhow {
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  margin: 10rpx;
  font-size: 26rpx;
}
.img1 {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}
</style>
