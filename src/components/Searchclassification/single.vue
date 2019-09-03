<template>
  <div class="single">
    <div class="middle">
      <div class="allplay" v-if="songs" @click="toplay1">
        <img src="../../native/tabbar/播放2.png" alt="" />播放全部(共{{
          songs.length
        }}首)
      </div>
      <div class="like">
        <img src="../../native/tabbar/多选1.png" alt="" />多选
      </div>
    </div>
    <div
      v-for="(item, index) in songs"
      :key="item.id"
      class="list"
      @click="toplay(item, index)"
    >
      <div class="list" @click="toplay(item, index)">
        <div class="num">{{ index + 1 }}</div>
        <div>
          <div class="title" v-html="item.name"></div>
          <div class="text">
            <span v-html="item.artists[0].name"></span
            ><span v-html="item.album.name">-</span>
            <span v-html="item.album.name"></span>
            <div v-if="item.album" v-html="">{{ item.album.alia }}</div>
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
  name: "single",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      songs: [], //当前页歌曲
      IDarr: [] //所有ID数组
    };
  },
  methods: {
    toplay1() {
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=0`
      });
    },
    changeColor(resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.keywords && this.keywords.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.keywords, "g");
          // 高亮替换v-html值
          let replaceString =
            '<span class="search-text">' + this.keywords + "</span>";
          resultsList[index].artists[0].name = item.artists[0].name.replace(
            replaceReg,
            replaceString
          );
          resultsList[index].album.name = item.album.name.replace(
            replaceReg,
            replaceString
          );
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          );
        }
      });
      this.songs = [];
      this.songs = resultsList;
      console.log(resultsList);
    },
    // 点击歌曲去播放页面
    toplay(item, index) {
      console.log(item);
      console.log(index);
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=${index}`
      });
    }
  },
  mounted() {
    // 获取当前页面歌曲
    wx.showLoading();
    console.log(this.keywords);
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=1`)
      .then(res => {
        this.changeColor(res.data.result.songs);
        wx.hideLoading();
        this.songs.map(item => {
          this.IDarr.push(item.id);
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

.list {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  align-items: center;
}
.like {
  margin: 10rpx 20rpx;
  padding: 10rpx 20rpx;
  font-size: 28rpx;
}
.like img {
  vertical-align: middle;
}
.allplay {
  align-items: center;
  line-height: 40px;
}
.allplay img {
  vertical-align: middle;
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
