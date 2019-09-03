<config lang="json">
  {
  navigationBarTitleText: '歌手详情',
  usingComponents: {
  "van-tab": "../../native/lib/vant/tab/index",
  "van-tabs": "../../native/lib/vant/tabs/index"
  }
  }
</config>
<template>
  <div class="singerDetails">
    <div class="topimg"><img :src="artist.picUrl" alt="" /></div>
    <div class="tab">
      <van-tabs :active="active" @change="onChange">
        <van-tab title="热门单曲"
          ><singersongs :hotSongs="hotSongs"></singersongs
        ></van-tab>
        <van-tab title="专辑"><singeralbum :id="id"></singeralbum></van-tab>
        <van-tab title="视频"><singerMove :id="id"></singerMove></van-tab>
        <van-tab title="艺人信息"
          ><singerMessage :id="id" :name="artist.name"></singerMessage
        ></van-tab>
      </van-tabs>
    </div>
    <div class="like1">
      <div>
        <div v-if="artist.alias">{{ artist.name }}({{ artist.alias[0] }})</div>
        <div>被收藏了万次</div>
      </div>
      <!--      <div class="like">+ 收藏</div>-->
    </div>
  </div>
</template>

<script>
import singersongs from "../../components/singer/singersongs";
import singeralbum from "../../components/singer/singeralbum";
import singerMessage from "../../components/singer/singerMessage";
import singerMove from "../../components/singer/singerMove";
export default {
  name: "singerDetails",
  components: {
    singersongs,
    singerMove,
    singeralbum,
    singerMessage
  },
  props: {},
  data() {
    return {
      active: 0,
      id: 0, //歌手id
      artist: {}, //歌手信息
      hotSongs: {} //热歌
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    }
  },
  mounted() {},
  onLoad(options) {
    this.id = options.id;
    // 获取歌手详情
    this.$fly
      .get(`/artists?id=${options.id}`)
      .then(res => {
        this.artist = res.data.artist;
        this.hotSongs = res.data.hotSongs;
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
.topimg {
  z-index: -1;
  position: absolute;
  width: 100%;
}
.topimg img {
  width: 100%;
  height: 550rpx;
}
.tab {
  padding-top: 550rpx;
}
.like1 {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  position: absolute;
  top: 350rpx;
  color: white;
  font-size: 24rpx;
}
.like {
  background-color: red;
  padding: 5rpx 20rpx;
  line-height: 40rpx;
  vertical-align: middle;
  border-radius: 30rpx;
}
</style>
