<template>
  <div class="radioDetails" v-if="detail.dj">
    主播
    <header>
      <div class="topimg">
        <div><img :src="detail.dj.avatarUrl" alt="" /></div>
        <div>
          <div>{{ detail.name }}</div>
          <div>{{ detail.dj.nickname }}</div>
        </div>
      </div>
      <div class="like">赞赏</div>
    </header>
    <div>电台内容简介 <div class="msg">{{ detail.dj.signature }}</div></div>
  </div>
</template>

<script>
export default {
  name: "radioDetails",
  components: {},
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      detail:{}
    };
  },
  methods: {},
  mounted() {
    this.$fly
      .get(` /dj/detail?rid=${this.id}`)
      .then(res => {
        console.log(res.data);
        this.detail = res.data.djRadio
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
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .like {
    font-size: 30rpx;
    margin: 0 40rpx;
    color: red;
    border: solid red 1rpx;
    padding: 8rpx 16rpx;
    border-radius: 40rpx;
  }
  .topimg {
    display: flex;
    margin: 20rpx;
    align-items: center;
    font-size: 30rpx;
  }
  .topimg img {
    width: 70rpx;
    height: 70rpx;
    border-radius: 50%;
    margin: 20rpx ;
  }
  .radioDetails {
    font-size: 30rpx;
    margin: 20rpx;
  }
  .msg {
    font-size: 30rpx;
    color: #b4b4b4;
    line-height: 50rpx;
  }
</style>
