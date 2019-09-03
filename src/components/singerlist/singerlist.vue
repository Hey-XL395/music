<template>
  <div class="singerlist">
    <div
      v-for="(item, index) in singerlist"
      :key="index"
      @click="todetails(item)"
    >
      <div>
        <img :src="item.img1v1Url" alt="" class="img1" />{{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerlist",
  components: {},
  props: {
    Code: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      singerlist: [],
      codenum: [
        5001,
        1001,
        1002,
        1003,
        2001,
        2002,
        2003,
        6001,
        6002,
        6003,
        7001,
        7002,
        7003,
        4001,
        4002,
        4003
      ]
    };
  },
  methods: {
    todetails(item) {
      console.log(item);
      wx.navigateTo({
        url: `../../pages/singerDetails/singerDetails?id=${item.id}`
      });
    }
  },
  mounted() {
    this.$fly
      .get(`/artist/list?cat=${this.codenum[this.index]}`)
      .then(res => {
        this.singerlist = res.data.artists;
        console.log(res.data.artists);
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
.singerlist {
  margin: 20rpx;
}
.img1 {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  align-items: center;
  vertical-align: middle;
  margin: 20rpx;
}
</style>
