<template>
  <div class="singers">
    <div v-for="(item,index) in singers" :key="index" class="singersdv" @click="todetails(item)">
      <div><img :src="item.img1v1Url" alt=""></div>
      <div class="text">{{item.name}} <span v-if="item.alias[0]">({{item.alias[0]}})</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singers",
  components: {},
  props: {
    keywords:{
      type:String
    }
  },
  data() {
    return {
        singers:[]
    };
  },
  methods: {
    // 点击歌手进入详情页
    todetails(item){
      console.log(item);
      wx.navigateTo({
        url: `../../pages/singerDetails/singerDetails?id=${item.id}`
      })
    }
  },
  mounted() {
    // 获取当前页面歌手
    wx.showLoading();
    this.$fly
      .get(`/search?keywords=${this.keywords}&type=100`)
      .then(res => {
        console.log(res.data.result.artists);
        this.singers = res.data.result.artists;
        wx.hideLoading();
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
  .singersdv {
    display: flex;
    align-items: center;
  }
  .singersdv img{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin: 20rpx;
  }
  .text {
    vertical-align: middle;
    align-items: center;
    justify-content: center;
  }
</style>
