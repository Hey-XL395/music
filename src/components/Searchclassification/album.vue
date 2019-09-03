<template>
  <div class="album">
    <div
      v-for="(item, index) in albums"
      :key="index"
      class="albumdv"
      @click="todetails(item)"
    >
      <div><img :src="item.blurPicUrl" alt="" /></div>
      <div class="text">
        <div>{{ item.name }}</div>
        <div>
          {{ item.artist.name }}
          <span
            v-text="
              new Date(parseInt(item.publishTime))
                .toLocaleString()
                .split(' ')[0]
                .replace('/', '年')
                .replace('/', '月') + '日'
            "
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "album",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      albums: {}
    };
  },
  methods: {
    // 点击专辑去详情页
    todetails(item) {
      console.log(item);
      wx.navigateTo({
        url: `../../pages/Details/Details?id=${item.id}&title=新碟`
      });
    }
  },
  mounted() {
    // 获取当前页面专辑
    wx.showLoading();
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=10`)
      .then(res => {
        console.log(res.data.result.albums);
        this.albums = res.data.result.albums;
        // item.publishTime是当前时间戳
        wx.hideLoading();
        // 时间转换
        // this.albums.map(item => {
        //   // 传入毫秒时间戳也可以获取时间对象
        //   let date = new Date(item.publishTime)
        //   console.log(date);
        //   let y = date.getFullYear()
        //   console.log(y);
        // });
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
.albumdv {
  display: flex;
  align-items: center;
}
.albumdv img {
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
