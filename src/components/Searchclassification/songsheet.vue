<template>
  <div class="songsheet">
    <div v-for="(item, index) in playlists" :key="index" class="songsheetdv" @click="todetails(item)">
      <div><img :src="item.coverImgUrl" alt="" /></div>
      <div class="text">
        <div>{{ item.name }}</div>
        <div>
          <span>共{{ item.trackCount }}首</span> by {{ item.creator.nickname }},
          播放：<span v-if="parseInt(item.playCount / 10000) > 10"
            >{{ parseInt(item.playCount / 10000) }}万次</span
          >
          <span v-else>{{ item.playCount }}次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songsheet",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      playlists: {}
    };
  },
  methods: {
    // 点击歌单去详情页
    todetails(item){
      console.log(item);
      wx.navigateTo({
        url: `../../pages/Details/Details?id=${item.id}&title=推荐歌单`
      })
    }
  },
  mounted() {
    // 获取当前页面歌单
    wx.showLoading();
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=1000`)
      .then(res => {
        // console.log(res.data.result.playlists);
        this.playlists = res.data.result.playlists;
        wx.hideLoading();
      })
      .catch(e => {
        console.log(e);
        wx.hideLoading();
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
.songsheetdv {
  display: flex;
  align-items: center;
}
.songsheetdv img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 15rpx;
  margin: 10rpx;
}
.text div:first-child {
  margin-left: 20rpx;
  font-size: 30rpx;
}
.text div:last-child {
  font-size: 23rpx;
  color: #b3b3b3;
  margin-left: 20rpx;
  margin-top: 20rpx;
}
</style>
