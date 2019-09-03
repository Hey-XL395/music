<config lang="json">
  {
  navigationBarTitleText: '登陆',
  usingComponents: {
  "van-popup": "../../native/lib/vant/popup/index",
  "van-field": "../../native/lib/vant/field/index"
  }
  }
</config>
<template>
  <div class="Land">
    <div class="inp">
      <van-cell-group>
        <van-field
          :value="phone"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号码"
          @change="onChange"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          :value="password"
          required
          type="password"
          clearable
          label="密码"
          placeholder="请输入密码"
          @change="onChangepass"
        />
      </van-cell-group>
    </div>
    <div class="phone" @click="show1">手机号登陆</div>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      phone: "",
      password: ""
    };
  },
  methods: {
    onChange(event) {
      // event.detail 为当前输入的值
      this.phone = event.detail;
      console.log(this.phone);
    },
    onChangepass(e) {
      this.password = e.detail;
      console.log(this.password);
    },
    show1() {
      console.log(1);
      if (this.phone !== "" && this.password !== "") {
        this.$fly
          .get(`/login/cellphone?phone=${this.phone}&password=${this.password}`)
          .then(res => {
            console.log(res.data.profile);
            if (res.data.loginType === 1) {
              wx.showToast({
                title: "登陆成功"
              });
              wx.navigateBack(-1)
              wx.setStorageSync('user', res.data.profile);
            }else {
              wx.showToast({
                title: "用户名或密码错误"
              });
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
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
.Land {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c10d0d;
}
.inp {
  width: 70%;
  margin: 0 auto;
  margin-top: 30%;
  border-radius: 40rpx;
}
.phone {
  color: #c10d0d;
  background-color: white;
  margin: 0 auto;
  margin-top: 10%;
  width: 60%;
  text-align: center;
  font-weight: bold;
  border-radius: 40rpx;
  padding: 20rpx 30rpx;
}
</style>
