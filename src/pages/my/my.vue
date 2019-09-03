<config lang="json">
  {
  navigationBarTitleText: '我的',
  usingComponents: {
  "van-button": "../../native/lib/vant/button/index",
  "van-cell": "../../native/lib/vant/cell/index",
  "van-cell-group": "../../native/lib/vant/cell-group/index",
  "van-icon": "../../native/lib/vant/icon/index",
  "van-switch": "../../native/lib/vant/switch/index"
  }
  }
</config>

<template>
  <div class="app">
    <div>
      <img src="../../native/tabbar/扫一扫.png" alt="" class="topimg" />
    </div>

    <div v-if="flag === false" class="toLand">
      <div class="noland">登陆网易云音乐</div>
      <div class="noland">手机电脑多端同步，尽享海量高品质音乐</div>
      <div class="toland1" @click="toLand">
        立即登录
      </div>
    </div>
    <!--    登录之后-->
    <div v-else>
      <div class="topmsg">
        <div class="topleft">
          <div><img :src="user.avatarUrl" alt="" class="userimg" /></div>
          <div>
            {{ user.nickname }}
            <div class="userLv">Lv.{{ user.follows }}</div>
          </div>
        </div>
        <div class="tolivedv">
          <img
            src="../../native/tabbar/签到.png"
            alt=""
            class="tolive"
            @click="tolive"
          /><span @click="tolive">签到</span>
        </div>
      </div>
      <div class="usermsg">
        <div class="usermsg1">
          0
          <div>动态</div>
        </div>
        <div class="usermsg1">
          5
          <div>关注</div>
        </div>
        <div class="usermsg1">
          0
          <div>粉丝</div>
        </div>
        <div class="usermsg1">
          <img src="../../native/tabbar/笔.png" alt="" />
          <div>编辑资料</div>
        </div>
      </div>
    </div>
    <div class="tabimg">
      <div>
        <img src="../../native/tabbar/消息.png" alt="" />
        <div>消息</div>
      </div>
      <div>
        <img src="../../native/tabbar/商城.png" alt="" />
        <div>商城</div>
      </div>
      <div>
        <img src="../../native/tabbar/门票.png" alt="" />
        <div>演出</div>
      </div>
      <div>
        <img src="../../native/tabbar/皮肤.png" alt="" />
        <div>个性换肤</div>
      </div>
    </div>
    <van-cell title="设置" is-link icon="setting-o"></van-cell>
    <van-cell title="夜间模式" icon="star-o"
      ><van-switch :checked="checked" @change="onChange" size="35rpx"
    /></van-cell>
    <van-cell title="定时关闭" is-link icon="flower-o"></van-cell>
    <van-cell title="音乐闹钟" is-link icon="bulb-o"></van-cell>

    <!--    登录之后-->
    <div @click="back1" class="back1" v-if="flag === true">退出登陆</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      flag: false,
      checked: false, //选择器
      user: {} //用户信息
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    toLand() {
      wx.navigateTo({
        url: "../Land/Land"
      });
    },
    // 改变模式
    onChange(detail) {
      console.log(detail);
      // // 需要手动对 checked 状态进行更新
      this.checked = detail.detail;
    },
    // 退出登录
    back1() {
      this.flag = false;
      let obj = {};
      this.$fly
        .get(`/logout`)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
      wx.setStorageSync("user", obj);
    },
    // 签到
    tolive() {
      this.$fly
        .get(`/daily_signin`)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  onLoad(options) {},
  onReady() {},
  onShow() {
    this.user = wx.getStorageSync("user");
    if (!this.user.nickname) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    //查询用户信息
    this.$fly
      .get(`/user/detail?uid=1698635610`)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  onHide() {},
  onUnload() {}
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
};
</script>

<style lang="scss">
.topimg {
  margin: 20rpx;
  width: 40rpx;
  height: 40rpx;
}
.toland1 {
  width: 100%;
  padding: 25rpx 0;
  text-align: center;
  border-radius: 50rpx;
  margin: 30rpx auto;
  border: solid silver 1rpx;
}
.topmsg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}
.tolive {
  width: 40rpx;
  height: 40rpx;
  vertical-align: middle;
}
.topleft {
  display: flex;
  vertical-align: middle;
  align-items: center;
}
.userimg {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50rpx;
  margin: 20rpx;
}
.noland {
  text-align: center;
  width: 100%;
  line-height: 40rpx;
}
.tolivedv {
  padding: 10rpx 20rpx;
  color: white;
  margin: 20rpx;
  font-size: 26rpx;
  background-color: #c10d0d;
  border-radius: 30rpx;
}
.tabimg {
  display: flex;
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20rpx;
  justify-content: space-around;
}
.tabimg img {
  margin: 20rpx;
  width: 50rpx;
  height: 50rpx;
}
.usermsg {
  display: flex;
  text-align: center;
  vertical-align: middle;
  margin-bottom: 20rpx;
  justify-content: space-around;
}
.usermsg1 {
  margin-right: 18rpx;
  width: 200rpx;
  height: 50rpx;
}
.usermsg1 img {
  width: 35rpx;
  height: 35rpx;
}
.userLv {
  font-weight: bold;
  font-style: italic;
  color: silver;
  padding: 5rpx 5rpx;
  border-radius: 30rpx;
  font-size: 27rpx;
}
.back1 {
  width: 300rpx;
  margin: 40rpx auto;
  text-align: center;
  border: #b3b3b3 solid 1rpx;
  padding: 20rpx 50rpx;
}
</style>
