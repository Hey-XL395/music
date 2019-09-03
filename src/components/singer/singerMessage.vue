<template>
  <div class="singermsg">
    <div class="introduction">{{ name }}简介</div>
    <div class="msg">{{ msg }}</div>
    <div class="todetails">完整歌手介绍 ></div>
    <div>
      <header>相关专栏文章</header>
      <div v-for="(item, index) in topicData" :key="index">
        <div class="topicDatamsg">
          <div><img :src="item.rectanglePicUrl" alt="" /></div>
          <div>
            <div class="title">{{ item.recmdTitle }}</div>
            <div class="byhow">
              by{{ item.creator.nickname }} 阅读：{{ item.readCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerMessage",
  components: {},
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      msg: "",
      topicData: []
    };
  },
  methods: {},
  mounted() {
    console.log(this.id);
    console.log(this.name);
    this.$fly
      .get(`/artist/desc?id=${this.id}`)
      .then(res => {
        console.log(res.data);
        this.msg = res.data.briefDesc;
        this.topicData = res.data.topicData;
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
.introduction {
  font-weight: bold;
  font-size: 26rpx;
  margin: 20rpx;
}
.msg {
  font-size: 26rpx;
  text-indent: 50rpx;
  margin: 20rpx;
  line-height: 60rpx;
}
.todetails {
  text-align: center;
  width: 100%;
  font-size: 24rpx;
  color: #eeeeee;
}
header {
  margin: 30rpx;
}
.topicDatamsg {
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.topicDatamsg img {
  width: 200rpx;
  height: 150rpx;
  border-radius: 30rpx;
  margin: 20rpx;
}
.byhow {
  font-size: 24rpx;
  color: #cccccc;
}
.title {
  font-size: 28rpx;
}
</style>
