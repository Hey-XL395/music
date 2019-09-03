<template>
  <div>
    <!--    背景图片-->
    <div v-if="detail.al" class="backg">
      <img class="backgimg" :src="detail.al.picUrl" alt="" />
    </div>
    <!--    头部标题-->
    <div class="songname">
      {{ detail.name }}
      <div v-if="detail.ar">{{ detail.ar[0].name }} ></div>
    </div>
    <!--      头部旋转图-->
    <div v-if="detail.al && flag2 === true" class="top">
      <img
        class="topimg"
        :class="{ run1: flag1 === true }"
        :src="detail.al.picUrl"
        alt=""
        @click="rotate"
      />
    </div>
    <!--      歌词-->
    <div v-else-if="flag2 === false" @click="rotate1">
      <lrc :id="id" :index="index"></lrc>
    </div>
    <div class="imgbuttom1">
      <div class="imgbuttom">
        <div @click="like" v-if="flag === false">
          <img src="../../native/tabbar/桃心.png" alt="" />
        </div>
        <div @click="like" v-if="flag === true">
          <img src="../../native/tabbar/实心桃心.png" alt="" />
        </div>
        <div><img src="../../native/tabbar/下载.png" alt="" /></div>
        <div><img src="../../native/tabbar/11-小猪.png" alt="" /></div>
        <div><img src="../../native/tabbar/对话.png" alt="" /></div>
        <div><img src="../../native/tabbar/点点点1.png" alt="" /></div>
      </div>
      <!--进度条-->
      <div>
        <div class="body-view">
          <span class="leftnum">{{ minute }}:{{ second }}</span>
          <div class="section_gap">
            <!--          微信进度条-->
            <slider
              block-size="14"
              :value="num"
              :max="length"
              @changing="musicnumber1"
              @change="musicnumber"
            />
          </div>
          <span class="rightnum">{{ end }}</span>
        </div>
      </div>
      <div class="imgbuttom">
        <div @click="playtype" v-if="type === 'random'">
          <img src="../../native/tabbar/随机.png" alt="" />
        </div>
        <div @click="playtype" v-if="type === 'single'">
          <img src="../../native/tabbar/单曲.png" alt="" />
        </div>
        <div @click="playtype" v-if="type === 'order'">
          <img src="../../native/tabbar/循环.png" alt="" />
        </div>
        <div @click="lastsong">
          <img src="../../native/tabbar/上一个.png" alt="" />
        </div>
        <div @click="toplay" v-if="flag1 === true">
          <img class="yes" src="../../native/tabbar/播放.png" alt="" />
        </div>
        <div @click="toplay" v-if="flag1 === false">
          <img class="yes" src="../../native/tabbar/暂停.png" alt="" />
        </div>
        <div @click="nextsong">
          <img src="../../native/tabbar/下一首.png" alt="" />
        </div>
        <div @click="like" v-if="flag === false">
          <img src="../../native/tabbar/桃心.png" alt="" />
        </div>
        <div @click="like" v-if="flag === true">
          <img src="../../native/tabbar/实心桃心.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lrc from "../../components/lrc/lrc";
export default {
  name: "play",
  components: {
    lrc
  },
  props: {},
  data() {
    return {
      flag2: true, //歌词显示隐藏
      num: 0, //当前播放时间
      second: 0, //左侧显示当前分钟
      minute: 0, //左侧显示当前秒数
      length: 100, //当前音频长度
      flag: false, //喜欢显示隐藏
      flag1: false, //显示播放暂停
      play: {}, //音乐播放
      detail: {},
      type: "random", //播放类型
      end: "03:00", //右侧结束时间
      index: 0, //当前播放歌曲下标
      id: [], //ID数组
      lasthistory: [], ///随机播放播放历史
      lasthistoryVIP: [], //过滤暂存数组
      obj: {} //点击上一首下一首改变本地存储对象中的INDEX
    };
  },
  methods: {
    rotate() {
      this.flag2 = !this.flag2;
    },
    rotate1() {
      this.flag2 = !this.flag2;
    },
    // 上一首
    lastsong() {
      // 单曲循环和顺序播放都可以上一首
      if (
        this.$store.state.type === "single" ||
        this.$store.state.type === "order"
      ) {
        if (Number(this.index) > 0) {
          this.index = Number(this.index) - 1;
          console.log(this.index);
          this.requestsong();
          this.requestdetails();
        } else {
          wx.showToast({
            title: "没有上一首了"
          });
        }
      } else {
        console.log(this.$store.state.lasthistoryVIP);
        this.lasthistoryVIP = this.$store.state.lasthistoryVIP;
        // 如果播放历史存在且大于一首就播放历史数组
        if (this.lasthistoryVIP.length > 1) {
          console.log(1);
          // 如果播放到历史的第一项，也是随机
          if (this.index === this.lasthistoryVIP[0]) {
            let i = Math.floor(Math.random() * (this.id.length - 1), 10);
            this.lasthistory.unshift(Number(i));
            this.$store.state.lasthistoryVIP.unshift(Number(i));
            console.log("播放到历史第一项");
            console.log(this.$store.state.lasthistoryVIP);
            this.index = i;
            this.requestsong();
            this.requestdetails();
          } else {
            console.log("还在历史中");
            let i = this.$store.state.lasthistoryVIP.indexOf(this.index);
            let j = i + 1;
            console.log("正在播放历史的第" + j + "项");
            this.index = this.$store.state.lasthistoryVIP[i - 1];
            this.requestsong();
            this.requestdetails();
          }
        } else {
          console.log("播放历史不存在随机");
          console.log(this.$store.state.lasthistoryVIP);
          let i = Math.floor(Math.random() * (this.id.length - 1), 10);
          this.lasthistory.unshift(Number(i));
          this.$store.state.lasthistoryVIP.unshift(Number(i));
          this.index = i;
          this.requestsong();
          this.requestdetails();
        }
      }
    },
    // 下一首
    nextsong() {
      // 单曲循环和顺序播放都可以上下一首
      if (
        this.$store.state.type === "single" ||
        this.$store.state.type === "order"
      ) {
        if (this.id.length === Number(this.index) + 1) {
          wx.showToast({
            title: "没有下一首了"
          });
        } else {
          this.index = Number(this.index) + 1;
          console.log(this.index);
          this.requestsong();
          this.requestdetails();
        }
      } else {
        this.lasthistoryVIP = this.$store.state.lasthistoryVIP;
        // 如果播放历史存在且大于一首就播放历史数组
        if (this.lasthistoryVIP.length > 1) {
          console.log(1);
          // 如果播放到历史的最后一项，也是随机
          if (
            this.index ===
            this.lasthistoryVIP[this.$store.state.lasthistoryVIP.length - 1]
          ) {
            let i = Math.floor(Math.random() * (this.id.length - 1), 10);
            this.lasthistory.push(Number(i));
            this.$store.state.lasthistoryVIP.push(Number(i));
            console.log("播放到历史最后一项");
            console.log(this.$store.state.lasthistoryVIP);
            this.index = i;
            this.requestsong();
            this.requestdetails();
          } else {
            console.log("还在历史中");
            console.log(this.$store.state.lasthistoryVIP);
            let i = this.$store.state.lasthistoryVIP.indexOf(this.index);
            let j = i + 1;
            console.log("正在播放历史的第" + j + "项");
            this.index = this.$store.state.lasthistoryVIP[i + 1];
            this.requestsong();
            this.requestdetails();
          }
        } else {
          // 播放历史不存在也是随机
          let i = Math.floor(Math.random() * (this.id.length - 1), 10);
          console.log(i);
          this.lasthistory.push(Number(i));
          this.$store.state.lasthistoryVIP.push(Number(i));
          console.log("播放历史不存在随机");
          console.log(this.$store.state.lasthistoryVIP);
          this.index = i;
          this.requestsong();
          this.requestdetails();
        }
      }
      (this.obj = JSON.parse(wx.getStorageSync("nowplay"))),
        (this.obj.index = this.index);
      wx.setStorageSync("nowplay", JSON.stringify(this.obj));
    },
    // 进度条拖动左侧时间变化时刻变化
    musicnumber1(e) {
      // 分钟
      this.minute = parseInt(e.detail.value / 60);
      if (this.minute < 10) {
        this.minute = `0${this.minute}`;
      }
      // 秒
      this.second = parseInt(e.detail.value % 60);
      if (this.second < 10) {
        this.second = `0${this.second}`;
      }
    },
    // 进度条拖动音频变化防止音频卡顿
    musicnumber(e) {
      this.$play.seek(e.detail.value);
      this.Update();
    },
    // 显示喜欢
    like() {
      this.flag = !this.flag;
    },
    //显示播放
    toplay() {
      this.flag1 = !this.flag1;
      if (this.flag1 === true) {
        this.$play.pause();
        // 暂停播放
        this.$play.onPause(() => {
          console.log("暂停播放");
        });
      }
      if (this.flag1 === false) {
        this.$play.play();
      }
    },
    //显示顺序随机单曲
    playtype() {
      if (this.type === "random") {
        this.type = "single";
      } else if (this.type === "single") {
        this.type = "order";
      } else if (this.type === "order") {
        this.type = "random";
        // 用于随机播放
        this.$store.state.lasthistoryVIP = [];
        this.$store.state.lasthistoryVIP.push(this.index);
      }
      this.$store.state.type = this.type;

      // 是否开启单曲
      if (this.type === "single") {
        this.$play.loop = true;
      } else {
        this.$play.loop = false;
      }
    },
    // 监听时间变化，方便调用，随时赋值
    Update() {
      // 监听播放时间变化 单位S
      this.$play.onTimeUpdate(() => {
        // 当前音频长度
        this.length = this.$play.duration;
        let m = parseInt(this.length / 60);
        if (m < 10) {
          m = `0${m}`;
        }
        let s = parseInt(this.length % 60);
        if (s < 10) {
          s = `0${s}`;
        }
        this.end = `${m}:${s}`;
        //当前进度
        this.num = this.$play.currentTime;
        // console.log(this.num);
        // 分钟
        this.minute = parseInt(this.num / 60);
        if (this.minute < 10) {
          this.minute = `0${this.minute}`;
        }
        // console.log(this.minute);
        // 秒
        this.second = parseInt(this.num % 60);
        if (this.second < 10) {
          this.second = `0${this.second}`;
        }
      });
    },
    // 请求音乐播放，调接口，好调用
    requestsong() {
      // 请求音乐播放
      this.$fly
        .get(`/song/url?id=${this.id[this.index]}`)
        .then(res => {
          this.play = res.data.data[0].url;
          // console.log(this.play);
          if (this.$store.state.play !== this.play) {
            // console.log("不相等"); //不相等先停止上次播放
            this.$play.stop();
            this.$play.onStop(() => {
              console.log("停止播放");
            });
            this.$store.state.play = this.play;
            // 是否开启默认播放
            this.$play.autoplay = true;
            if (this.type === "single") {
              this.$play.loop = true;
            } else {
              this.$play.loop = false;
            }
            // // 用于直接播放
            this.$play.src = this.play;
            // // 开始播放
            // this.$play.play();
            this.Update();
            // // 监听开始播放是一个函数，播放了就打印
            this.$play.onPlay(() => {
              console.log("开始播放");
            });
            this.$play.onEnded(() => {
              console.log("放完了");
              this.nextsong();
            });
            this.$play.onError(res => {
              console.log(res.errMsg);
              console.log(res.errCode);
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 请求单个音乐详情无法路由传参，调接口，好调用
    requestdetails() {
      // 请求单个音乐详情无法路由传参
      this.$fly
        .get(`/song/detail?ids=${this.id[this.index]}`)
        .then(res => {
          // console.log(res.data);
          this.detail = res.data.songs[0];
          // console.log(this.detail.al.picUrl);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  onLoad: function(options) {
    console.log(options);
    // 如果当前是从首页进来的就从历史中取
    if (options.index) {
      wx.setStorageSync("nowplay", JSON.stringify(options));
    } else {
      options = JSON.parse(wx.getStorageSync("nowplay"));
      this.Update();
    }
    // console.log(this.$store.state.type);
    if (!this.$store.state.type) {
      this.$store.state.type = "order";
    }
    // console.log(this.$store.state.type);
    // 判断当前播放类型
    if (this.$store.state.type === "random") {
      this.type = "random";
    }
    if (this.$store.state.type === "single") {
      this.type = "single";
    }
    if (this.$store.state.type === "order") {
      this.type = "order";
    }
    // 时间加0
    if (this.minute < 10) {
      this.minute = `0${this.minute}`;
    }
    if (this.second < 10) {
      this.second = `0${this.second}`;
    }
    this.id = JSON.parse(options.id);
    // for (let j = 0 ;j<this.id.length;j++){
    //   this.lasthistoryVIP.push(j)
    // }
    // console.log(this.lasthistoryVIP);
    // console.log(this.id);
    this.index = options.index;
    // 先存入第一首播放历史
    this.$store.state.lasthistoryVIP = [];
    this.$store.state.lasthistoryVIP.push(this.index);
    this.requestsong();
    this.requestdetails();
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
.backg {
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.backgimg {
  z-index: -1;
  width: 100%;
  height: 100vh;
  filter: blur(30px);
}
/*动画*/
.top {
  width: 100%;
  text-align: center;
  text-align: center;
  margin-top: 100rpx;
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
}
.topimg {
  z-index: 999;
  width: 450rpx;
  height: 450rpx;
  border-radius: 50%;
  margin: 0 auto;
  -webkit-transform: rotate(360deg);
  animation: rotation 25s linear infinite;
  -moz-animation: rotation 25s linear infinite;
  -webkit-animation: rotation 25s linear infinite;
  -o-animation: rotation 25s linear infinite;
}
.run1 {
  animation-play-state: paused;
}
.songname {
  color: white;
  width: 100%;
  text-align: center;
  margin-top: 30rpx;
}
.body-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section_gap {
  width: 80%;
  margin: 0 auto;
}
.imgbuttom img {
  width: 40rpx;
  height: 40rpx;
}
.leftnum {
  color: white;
  font-size: 26rpx;
  margin-left: 26rpx;
}
.rightnum {
  color: white;
  font-size: 26rpx;
  margin-right: 26rpx;
}
.imgbuttom {
  margin: 30rpx 10rpx;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
  align-items: center;
}
.imgbuttom1 {
  position: absolute;
  bottom: 20rpx;
  width: 100%;
}
.yes {
  width: 80rpx !important;
  height: 80rpx !important;
}
</style>