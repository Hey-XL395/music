<template>
  <div class="singerMove">
    <div class="top">
      <div class="top1">MV(共{{ mv.length }}个)</div>
      <div>MV</div>
    </div>
    <div v-for="(item, index) in mv" :key="index" class="videonav" @click="todetails(item)">
      <div class="videonav1">
        <img class="videonavimg" :src="item.imgurl" alt="" />
        <div class="playnum">
          <img class="playimg" src="../../native/tabbar/三角形.png" alt="" />
          <span v-if="parseInt(item.playCount / 10000) > 10"
            >{{ parseInt(item.playCount / 10000) }}万</span
          >
          <span v-else>{{ item.playCount }}</span>
        </div>
      </div>
      <div class="videonav2">
        <div>{{ item.name }}</div>
        <div>
          <span>{{ item.publishTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerMove",
  components: {},
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      mv: {} //歌手MV
    };
  },
  methods: {
    todetails(item){
      console.log(item);
      wx.navigateTo({
        url: `../../pages/playMove/playMv?id=${item.id}`
      })
    }
  },
  mounted() {
    this.$fly
      .get(`/artist/mv?id=${this.id}`)
      .then(res => {
        console.log(res.data);
        this.mv = res.data.mvs;
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
  margin: 20rpx;
  border-radius: 15rpx;
  height: 150rpx;
  z-index: -1;
}
.playnum {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 10rpx;
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
.top {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  font-size: 26rpx;
}
  .top1 {
    color: #b3b3b3;
  }
</style>
