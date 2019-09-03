<script>
export default {
  onLaunch(options) {
    if (!wx.getStorageSync("nowplay")) {
      let obj = {};
      wx.setStorageSync("nowplay", obj);
    }
    if (!wx.getStorageSync("user")) {
      let obj = {};
      wx.setStorageSync("user", obj);
    }
    if (!wx.getStorageSync("historysearch")) {
      let arr = [];
      wx.setStorageSync("historysearch", arr);
    }
  },
  onShow(options) {
    // Do something when show.
    console.log("App onShow");
  },
  onHide() {
    // Do something when hide.
    console.log("App onHide");
  },
  onError(msg) {
    console.log("App onError");
    console.log(msg);
  },
  globalData() {
    return {
      a: "I am global data"
    };
  }
};
</script>
<style>
.search-text {
  color: skyblue !important;
}
</style>
