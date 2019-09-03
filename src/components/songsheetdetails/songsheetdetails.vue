<template>
  <div class="songsheetdetails">
    <img :src="detail.coverImgUrl" alt="" class="bacimg" />
    <div style="z-index: 10">
      <div>
        <div class="songdv">
          <img :src="detail.coverImgUrl" alt="" class="songimg" />
        </div>
        <div class="songname">{{ detail.name }}</div>
      </div>
      <div>
        <div class="tags">
          标签：
          <div v-for="(item, index) in detail.tags" :key="index" class="tagsvip">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="songdetails">{{ detail.description }}</div>
      <div class="down" @click.stop="down">下载图片</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songsheetdetails",
  components: {},
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      url: ""
    };
  },
  methods: {
    // 保存到本地
    down() {
      // wx.getImageInfo保存本地图片
      // wx.downloadFile保存网络图片
      wx.downloadFile({
        url: this.url,
        success: res => {
          let tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: res1 => {
              console.log(res1);
              if (res1){
                wx.showToast({
                  title: '保存成功'

                })
              }
            }
          });
        }
      });
    }
  },
  mounted() {
    console.log(this.detail);
    this.url = this.detail.coverImgUrl;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bacimg {
  position: absolute;
  filter: blur(100px);
  width: 100%;
  height: 100vh;
  z-index: -1;
}
.songimg {
  width: 500rpx;
  height: 500rpx;
  text-align: center;
  margin: 20rpx auto;
}
.songdv {
  width: 100%;
  text-align: center;
}
.songsheetdetails {
  color: white;
  font-size: 26rpx;
  margin: 20rpx;
}
.tags {
  display: flex;
  margin-top: 20rpx;
}
.songname {
  width: 400rpx;
  margin: 0 auto;
}
.songdetails {
  line-height: 50rpx;
  margin-top: 20rpx;
  z-index: 999;
}
.tagsvip {
  padding: 0rpx 20rpx;
}
.down {
  width: 300rpx;
  text-align: center;
  border: white solid 1rpx;
  border-radius: 40rpx;
  margin: 20rpx auto;
  padding: 10rpx 20rpx;
}
</style>
