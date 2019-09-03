<template>
  <div v-if="flag === false" @click="tosongdetails">
    <songsheetdetails :detail="detail"></songsheetdetails>
  </div>
  <div class="Details" v-else>
    <!--    新歌结构-->
    <div v-if="detail.coverImgUrl">
      <div @click="tosongdetails">
        <div
          class="topimg1"
          :style="{
            background: 'url(' + detail.coverImgUrl + ')',
            'background-size': '100% 100%',
            filter: 'blur(10px)'
          }"
        ></div>
      </div>
      <div class="top" @click="tosongdetails">
        <img :src="detail.coverImgUrl" alt="" class="topimg" />
        <div class="topname">
          {{ detail.name }}
          <div class="topimg3">
            <div><img :src="detail.creator.avatarUrl" alt="" /></div>
            <div>{{ detail.creator.nickname }}</div>
          </div>
          <div class="topname1">{{ detail.description }}</div>
        </div>
      </div>
      <div class="topbtn">
        <div>
          <img class="topimg2" src="../../native/tabbar/对话.png" alt="" />
          <div>{{ detail.commentCount }}</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/转发.png" alt="" />
          <div>{{ detail.shareCount }}</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/下载.png" alt="" />
          <div>下载</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/多选.png" alt="" />
          <div>多选</div>
        </div>
      </div>
      <div>
        <div class="middle">
          <div class="allplay" @click="toplay1">
            <img src="../../native/tabbar/播放2.png" alt="" />播放全部(共{{
              detail.tracks.length
            }}首)
          </div>
          <div class="like">+收藏（{{ detail.subscribedCount }}）</div>
        </div>
        <div v-for="(item, index) in detail.tracks" :key="item.id" class="list">
          <div class="list" @click="toplay(item, index)">
            <div class="num">{{ index + 1 }}</div>
            <div>
              <div class="title">{{ item.name }}</div>
              <div class="text">
                {{ item.ar[0].name }}
                <span v-if="item.ar[1]">/{{ item.ar[1].name }}</span>
                <span v-if="item.al">-{{ item.al.name }}</span>
              </div>
            </div>
          </div>
          <img class="play" src="../../native/tabbar/播放1.png" alt="" />
          <img class="play" src="../../native/tabbar/点点点.png" alt="" />
        </div>
      </div>
    </div>

    <!--    新碟结构-->
    <div v-else-if="detail.album">
      <div>
        <div
          class="topimg1"
          :style="{
            background: 'url(' + detail.album.picUrl + ')',
            'background-size': '100% 100%',
            filter: 'blur(30px)'
          }"
        ></div>
      </div>
      <div class="top">
        <img :src="detail.album.picUrl" alt="" class="topimg" />
        <div class="topname">
          {{ detail.album.name }}
          <div class="topname1">
            歌手:{{ detail.album.artists[0].name }}
            <div>{{ detail.album.description }}</div>
          </div>
        </div>
      </div>
      <div class="topbtn">
        <div>
          <img class="topimg2" src="../../native/tabbar/对话.png" alt="" />
          <div>44</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/转发.png" alt="" />
          <div>32</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/下载.png" alt="" />
          <div>下载</div>
        </div>
        <div>
          <img class="topimg2" src="../../native/tabbar/多选.png" alt="" />
          <div>多选</div>
        </div>
      </div>
      <div>
        <div class="middle">
          <div class="allplay">
            <img src="../../native/tabbar/播放.png" alt="" />播放全部(共{{
              detail.songs.length
            }}首)
          </div>
          <div class="like">+收藏（9999万）</div>
        </div>
        <div v-for="(item, index) in detail.songs" :key="item.id" class="list">
          <div class="list" @click="toplay(item, index)">
            <div class="num">{{ index + 1 }}</div>
            <div>
              <div class="title">{{ item.name }}</div>
              <div class="text">
                {{ item.ar[0].name }}
                <span v-if="item.ar[1]">/{{ item.ar[1].name }}</span>
                <span v-if="item.al">-{{ item.al.name }}</span>
              </div>
            </div>
          </div>
          <img class="play" src="../../native/tabbar/播放1.png" alt="" />
          <img class="play" src="../../native/tabbar/点点点.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songsheetdetails from "../../components/songsheetdetails/songsheetdetails";
export default {
  name: "Details",
  components: {
    songsheetdetails
  },
  props: {},
  data() {
    return {
      i: 0,
      detail: {}, //详情
      IDarr: [], //ID数组
      options: {}, //title
      flag: true //歌单详情的显示与隐藏
    };
  },
  methods: {
    // 点击顶部图片去详情
    tosongdetails() {
      this.flag = !this.flag;
    },
    // 点击播放全部开始播放
    toplay1() {
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=0`
      });
    },
    // 点击歌曲去播放页面
    toplay(item, index) {
      wx.navigateTo({
        url: `../Play/Play?id=${JSON.stringify(this.IDarr)}&index=${index}`
      });
    }
  },
  onLoad: function(options) {
    this.options = options;
    if (options.title === "推荐歌单") {
      let str = options.id;
      // 获取id请求歌单详情
      wx.showLoading({
        title: "加载中"
      });
      this.$fly
        .get(`/playlist/detail?id=${str}`)
        .then(res => {
          console.log(res.data.playlist);
          this.detail = res.data.playlist;
          wx.hideLoading();
          this.detail.tracks.map(item => {
            this.IDarr.push(item.id);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (options.title === "新碟") {
      wx.showLoading({
        title: "加载中"
      });
      let str = options.id;
      // 获取id请求新碟详情
      this.$fly
        .get(`/album?id=${str}&limit=30`)
        .then(res => {
          console.log(res.data);
          this.detail = res.data;
          wx.hideLoading();
          this.detail.songs.map(item => {
            this.IDarr.push(item.id);
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.topimg {
  width: 250rpx;
  height: 250rpx;
  border-radius: 30rpx;
}
.top {
  width: 100%;
  height: 400rpx;
  position: absolute;
  top: 100rpx;
  left: 50rpx;
  color: white;
  display: flex;
  justify-content: space-around;
}
.topimg1 {
  position: relative;
  width: 100%;
  height: 500rpx;
}
.topimg2 {
  width: 40rpx;
  height: 40rpx;
}
.topname {
  width: 400rpx;
  height: 400rpx;
  margin-left: 20rpx;
  margin-right: 40rpx;
}
.topimg3 {
  display: flex;
}
.topimg3 img {
  margin-top: 20rpx;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  vertical-align: middle;
}
.topimg3 div:last-child {
  vertical-align: middle;
  line-height: 84rpx;
  padding-left: 20rpx;
}
.topname1 {
  margin-top: 30rpx;
  margin-right: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 24rpx;
}
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
.topbtn {
  display: flex;
  text-align: center;
  justify-content: space-around;
  position: absolute;
  top: 350rpx;
  width: 100%;
  margin: 20rpx;
  font-size: 30rpx;
  color: white;
}
.play {
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  margin-right: 20rpx;
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
  background-color: #c10d0d;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: white;
}
</style>
