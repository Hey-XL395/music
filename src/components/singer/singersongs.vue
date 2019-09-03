<template>
  <div class="singersongs">
    <div class="middle">
      <div class="allplay" v-if="hotSongs" @click="allplay(item, index)">
        <img src="../../native/tabbar/播放2.png" alt=""/>播放全部(共{{
          hotSongs.length
        }}首)
      </div>
      <div class="like">
        <img src="../../native/tabbar/多选1.png" alt="" />多选
      </div>
    </div>
    <div
      v-for="(item, index) in hotSongs"
      :key="item.id"
      class="list"
      @click="toplay(item, index)"
    >
      <div class="list" @click="toplay(item, index)">
        <div class="num">{{ index + 1 }}</div>
        <div>
          <div class="title">{{ item.name }}</div>
          <div class="text">
            {{ item.al.name }}
          </div>
        </div>
      </div>
      <img class="play" src="../../native/tabbar/播放1.png" alt="" />
      <img class="play" src="../../native/tabbar/点点点.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "singersongs",
  components: {},
  props: {
    hotSongs: {
      type: Object
    }
  },
  data() {
    return {
      IDarr: [] //所有ID数组
    };
  },
  methods: {
    //播放全部
    allplay(){
      this.hotSongs.map(item => {
        this.IDarr.push(item.id);
      });
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=${0}`
      });
    },
    // 点击歌曲去播放页面
    toplay(item, index) {
      console.log(item);
      console.log(index);
      console.log(this.hotSongs);
      this.hotSongs.map(item => {
        this.IDarr.push(item.id);
      });
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=${index}`
      });
    }
  },
  mounted() {
    console.log(this.hotSongs);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.middle img {
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  margin-right: 20rpx;
}
.middle {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
}
.allplay {
  align-items: center;
  line-height: 40px;
}
.allplay img {
  vertical-align: middle;
}
.like {
  margin: 10rpx 20rpx;
  padding: 10rpx 20rpx;
  font-size: 28rpx;
}
.like img {
  vertical-align: middle;
}
.list {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  align-items: center;
}
.num {
  margin-right: 20rpx;
  color: #b3b3b3;
}

.text {
  margin-right: 20rpx;
  color: #b3b3b3;
  font-size: 24rpx;
  width: 400rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.title {
  font-size: 30rpx;
  width: 450rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.play {
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  margin-right: 20rpx;
}
</style>
