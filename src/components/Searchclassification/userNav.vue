<template>
  <div class="userNav">
    <div v-for="(item, index) in user" :key="index" class="userdv">
      <div class="topdv"><img class="topimg" :src="item.avatarUrl" alt="" /></div>
      <div class="text">
        <div class="dv1">
          {{ item.nickname
          }}<img
                class="gender"
            src="../../native/tabbar/男.png"
            alt=""
            v-if="item.gender === 1"
          /><img class="gender" src="../../native/tabbar/女.png" alt="" v-else />
        </div>
        <div v-if="item.signature" class="dv2">{{ item.signature }}</div>
      </div>
      <div class="like">+关注</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userNav",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {},
  mounted() {
    // 获取当前页面用户
    wx.showLoading();
    console.log(this.keywords);
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=1002`)
      .then(res => {
        // console.log(res.data.result);
        this.user = res.data.result.userprofiles;
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
.userdv {
  display: flex;
  align-items: center;/*文字居中*/
}
.topdv {
  flex: 2;
}
.gender {
  width: 30rpx;
  height: 30rpx;
  align-items: center;
  vertical-align: middle;
  margin-left: 20rpx;
}
.topimg {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin: 10rpx;
}
.text {
  flex: 6;
}
.text .dv1 {
  margin-left: 20rpx;
  font-size: 30rpx;
}
.text .dv2 {
  font-size: 23rpx;
  color: #b3b3b3;
  width: 300rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
  .like {
    padding: 6rpx 6rpx;
    color: red;
    border: solid red 1rpx;
    border-radius: 34rpx;
    vertical-align: middle;
    flex: 2;
    font-size: 23rpx;
    text-align: center;
    margin-right: 20rpx;
  }
</style>
