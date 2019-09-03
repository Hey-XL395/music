<config lang="json">
  {
  navigationBarTitleText: '电台详情',
  usingComponents: {
  "van-tab": "../../native/lib/vant/tab/index",
  "van-tabs": "../../native/lib/vant/tabs/index"
  }
  }
</config>

<template>
  <div class="radiosdetails">
    <div class="topimg"><img :src="detail.picUrl" alt="" /></div>
    <div class="tab">
      <van-tabs :active="active" @change="onChange">
        <van-tab title="详情"><radioDetails :id="id"></radioDetails></van-tab>
        <van-tab title="节目"><program :id="id"></program></van-tab>
      </van-tabs>
    </div>
    <div class="singermsg">
      <div>
        <div v-if="detail">{{ detail.name }}</div>
        <div>{{ detail.subCount }}人订阅</div>
      </div>
      <!--      <div class="like">+ 收藏</div>-->
    </div>
  </div>
</template>

<script>
import program from "../../components/radio/program";
import radioDetails from "../../components/radio/radioDetails";
export default {
  name: "radiosdetails",
  components: {
    program,
    radioDetails
  },
  props: {},
  data() {
    return {
      active: 0,
      detail: {},
      id:0,
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  onLoad: function(options) {
    this.id = options.id
    console.log(options.id);
    this.$fly
      .get(`/dj/detail?rid=${options.id}`)
      .then(res => {
        this.detail = res.data.djRadio;
      })
      .catch(e => {
        console.log(e);
      });
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.topimg {
  z-index: -1;
  position: absolute;
  width: 100%;
}
.topimg img {
  width: 100%;
  height: 550rpx;
}
.tab {
  padding-top: 550rpx;
}
.singermsg {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  position: absolute;
  top: 350rpx;
  color: white;
  font-size: 24rpx;
}
</style>
