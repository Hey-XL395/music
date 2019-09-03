<template>
  <div class="lrc">
    <scroll-view
      scroll-y="true"
      style="height: 330px;"
      scroll-with-animation="true"
      :scroll-top="marginTop"
    >
      <div v-for="(item, index) in lyricDataStr" :key="index">
        <div
          class="lrcmsg"
          :class="gateTime === index ? 'currentTime' : ''"
        >
          {{ item[1] }}
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: "lrc",
  components: {},
  props: {
    id: {
      type: Array
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      lyricDataStr: {}, //歌词      //文稿数组，转化完成用来在wxml中使用
      lyricDataArr: [],
      storyContent: [], //文稿滚动距离
      marginTop: 0, //纵向滚动
      gateTime: 0, //当前正在第几行
      time: "",
      lrcvip: [],
      item: "",
      second: "",
      minute: ""
    };
  },
  methods: {
    scroll1(event) {
      console.log(event.detail.scrollTop);
    },
    //用于请求歌词
    requestlrc() {
      this.$fly
        .get(`/lyric?id=${this.id[this.index]}`)
        .then(res => {
          this.lyricDataStr = res.data.lrc.lyric;
          console.log(this.lrcvip);
          this.lyricDataStr = res.data.lrc.lyric;
          let lyrics = this.lyricDataStr.split("\n");
          let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
          while (!pattern.test(lyrics[0])) {
            lyrics = lyrics.slice(1);
          }
          lyrics[lyrics.length - 1].length === 0 && lyrics.pop();
          lyrics.forEach((v, i, a) => {
            let time = v.match(pattern);
            let value = v.replace(pattern, "");
            time.forEach((v1, i1, a1) => {
              let t = v1.slice(1, -1).split(":");
              this.lyricDataArr.push([
                parseInt(t[0], 10) * 60 + parseFloat(t[1]),
                value
              ]);
            });
          });
          this.lyricDataArr.sort((a, b) => {
            return a[0] - b[0];
          });
          this.lyricDataStr = this.lyricDataArr;
          console.log(this.lyricDataStr);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.requestlrc();
    this.$play.onTimeUpdate(() => {
      if (this.gateTime >= 6) {
        this.marginTop = (this.gateTime - 6) * 20;
      }
      if (this.gateTime !== this.lyricDataStr.length - 1) {
        let j = 0;
        for (let j = this.gateTime; j < this.lyricDataStr.length; j++) {
          if (this.gateTime === this.lyricDataStr.length - 2) {
            if (
              parseFloat(this.$play.currentTime) >
              this.lyricDataStr[this.lyricDataStr.length - 1][0]
            ) {
              this.gateTime = this.lyricDataStr.length - 1;
              return;
            }
          } else {
            if (
              parseFloat(this.$play.currentTime) > this.lyricDataStr[j][0] &&
              parseFloat(this.$play.currentTime) < this.lyricDataStr[j + 1][0]
            ) {
              this.gateTime = j;
              return;
            }
          }
        }
      }
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
.lrc {
  font-size: 26rpx;
  color: white;
  margin-top: 20rpx;
  padding-top: 20rpx;
  text-align: center;
}
.lrcmsg {
  line-height: 50rpx;
}
.currentTime {
  color: red;
}
</style>
