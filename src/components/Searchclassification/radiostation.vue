<template>
  <div class="radiostation">
    <div v-if="radio !== {}">
      <div v-for="(item, index) in radio" :key="index" class="albumdv" @click="todetails(item)">
        <div><img :src="item.picUrl" alt="" /></div>
        <div class="text">
          <div>{{ item.name }}</div>
          <div>{{ item.dj.nickname }}</div>
        </div>
      </div>
    </div>
    <div v-else>无结果</div>
  </div>
</template>

<script>
export default {
  name: "radiostation",
  components: {},
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      radio: {}
    };
  },
  methods: {
    todetails(item){
      wx.navigateTo({
        url: `../../pages/radiosdetails/radiosdetails?id=${item.id}`
      })
      console.log(item);
    }
  },
  mounted() {
    // 获取当前页面电台
    wx.showLoading();
    console.log(this.keywords);
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=1009`)
      .then(res => {
        console.log(res.data.result);
        this.radio = res.data.result.djRadios;
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
</style>
