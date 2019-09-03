<template>
  <div class="singeralbum">
    <div class="top">
      <div>按发行时间排序</div>
      <div>排序</div>
    </div>
    <div v-for="(item, index) in albums" :key="index" class="albumdv" @click="todetails(item)">
      <div><img :src="item.picUrl" alt="" /></div>
      <div class="text">
        <div>{{ item.name }}</div>
        <div>
          <span
            v-text="
              new Date(parseInt(item.publishTime))
                .toLocaleString()
                .split(' ')[0]
                .replace('/', '年')
                .replace('/', '月') + '日'
            "
          ></span>
          <span>{{ item.size }}首</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singeralbum",
  components: {},
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      albums: []
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
    this.$fly
      .get(`/artist/album?id=${this.id}&limit=30`)
      .then(res => {
        console.log(res.data);
        this.albums = res.data.hotAlbums;
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
.top {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
}
</style>
