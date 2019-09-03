<config lang="json">
    {
    navigationBarTitleText: '歌手',
    usingComponents: {
    "van-tab": "../../native/lib/vant/tab/index",
    "van-tabs": "../../native/lib/vant/tabs/index"
    }
    }
</config>

<template>
  <div class="Singer">
    <van-tabs :active="active" @change="onChange">
      <van-tab v-for="(item, index) in singer" :title="item" :key="index">
        <scroll-view scroll-x="true" class="scrooldv">
          <div class="topIndexes">
            <div
              v-for="(item, index1) in topIndexes"
              :key="index1"
              v-if="active !== 0"
              class="topnum"
            >
              {{ item }}
            </div>
          </div>
        </scroll-view>
        <singerlist :index="index" v-if="active === index"></singerlist
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import singerlist from "../../components/singerlist/singerlist";
export default {
  name: "Singer",
  components: {
    singerlist
  },
  props: {},
  data() {
    return {
      active: 0,
      topIndexes: [
        "热",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      singer: [
        "入驻歌手",
        "华语男歌手",
        "华语女歌手",
        "华语组合/乐队",
        "欧美男歌手",
        "欧美女歌手",
        "欧美组合/乐队",
        "日本男歌手",
        "日本女歌手",
        "日本组合/乐队",
        "韩国男歌手",
        "韩国女歌手",
        "韩国组合/乐队",
        "其他男歌手",
        "其他女歌手",
        "其他组合/乐队"
      ],
      singerlist: []
    };
  },
  methods: {
    onChange(event) {
      console.log(event.detail.index);
      this.active = event.detail.index;
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
.topIndexes {
  display: flex;
  margin: 20rpx;
}
.topnum {
  width: 20rpx;
  margin: 20rpx;
}
</style>
