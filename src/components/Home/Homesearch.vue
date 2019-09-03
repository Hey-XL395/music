<template>
  <div class="Homesearch">
    <div class="topdv">
      <div class="section">
        <div class="searchimg">
          <img src="../../native/tabbar/搜索.png" alt="" />
        </div>
        <input
          v-model.trim="val"
          placeholder-style="color:#c10d0d"
          :placeholder="placeholder"
        />
      </div>
      <div class="topmusic" @click="flag">
        取消
      </div>
    </div>
    <div v-if="val" class="searchtxt">
      <div @click="tosearch">搜索：{{ val }}</div>
      <div v-if="suggest">
        <div
          class="searchtxt1"
          v-for="(item, index) in suggest.artists"
          :key="index"
          @click="tosearch1(item)"
        >
          <img src="../../native/tabbar/top音乐.png" alt="" />
          {{ item.name }}
        </div>
      </div>
      <div v-if="suggest">
        <div
          class="searchtxt1"
          v-for="(item, index) in suggest.songs"
          :key="index"
          @click="tosearch1(item)"
        >
          <img src="../../native/tabbar/top音乐.png" alt="" />
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="sharchtop">
        <div>搜索历史</div>
        <div @click="del">删除</div>
      </div>
      <div class="searchhistory1">
        <div v-for="(item, index) in arr" :key="index" class="searchhistory" @click="clisearch(item)">
          {{ item }}
        </div>
      </div>
      <div class="hot2">热搜榜</div>
      <div v-for="(item, index) in hots" class="hotclass" @click="clihot(item)">
        <span :class="{ hot: index === 0 || index === 1 || index === 2 }">{{
          index + 1
        }}</span>
        {{ item.first }}
        <span class="hot hot1" v-if="index === 0 || index === 1">hot</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homesearch",
  components: {},
  props: {
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      val: "", //输入框的值
      hots: {}, //热搜
      placeholder: "", //动态占位符
      suggest: {}, //搜索建议
      flag: true, //是否加入搜索记录
      arr: [] //搜索记录
    };
  },
  methods: {
    // 点击历史纪录去搜素
    clisearch(item){
      this.val = item
      wx.navigateTo({
        url: `../../pages/Searchclassification/Searchclassification?key=${
                this.val
                }`
      });
    },
    // 删除搜索记录
    del() {
      let arr = []
      wx.setStorageSync('historysearch', arr);
      this.arr = []
    },
    // 改变父组件值
    flag() {
      this.$emit("update:flag", false);
    },
    // 点击进行搜索并进入搜索分类
    tosearch() {
      // this.flag = true
      wx.navigateTo({
        url: `../../pages/Searchclassification/Searchclassification?key=${
          this.val
        }`
      });
      let arr = wx.getStorageSync("historysearch");
      arr.map(item => {
        if (this.val === item) {
          this.flag = false;
        }
      });
      if (this.flag) {
        arr.push(this.val);
      }
      wx.setStorageSync("historysearch", arr);
    },
    // 点击搜索建议进行搜索
    tosearch1(item) {
      console.log(item);
      wx.navigateTo({
        url: `../../pages/Searchclassification/Searchclassification?key=${
          item.name
        }`
      });
    },
    // 点击热搜进行搜索
    clihot(item) {
      console.log(item);
      this.val = item.first;
      wx.navigateTo({
        url: `../../pages/Searchclassification/Searchclassification?key=${
          this.val
        }`
      });
    }
  },
  mounted() {
    // 获取热搜
    this.$fly
      .get(`/search/hot`)
      .then(res => {
        console.log(res.data.result.hots);
        this.hots = res.data.result.hots;
      })
      .catch(e => {
        console.log(e);
      });
    // 获取默认热搜关键词
    this.$fly
      .get(`/search/default`)
      .then(res => {
        console.log(res.data.data.showKeyword);
        this.placeholder = res.data.data.showKeyword;
      })
      .catch(e => {
        console.log(e);
      });
    //获取搜索历史
    this.arr = wx.getStorageSync("historysearch");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    val(val) {
      console.log(val);
      this.$fly
        .get(`/search/suggest?keywords=${val}`)
        .then(res => {
          this.suggest = res.data.result;
          console.log(res.data.result);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.Homesearch {
  padding: 10rpx;
}
.searchtxt {
  padding: 30rpx;
  color: skyblue;
}
.searchhistory {
  display: flex;
  margin: 20rpx;
}
.searchhistory1 {
  display: flex;
  flex-wrap: wrap;
  margin: 20rpx;
}
.searchtxt1 {
  padding: 30rpx 0;
  color: black;
  border-bottom: silver solid 1rpx;
}
.searchtxt1 img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: middle;
}
.searchimg img {
  width: 40rpx;
  vertical-align: middle;
  height: 40rpx;
  left: 10%;
  position: absolute;
}
.ConcertHall {
  font-size: 40rpx;
  font-weight: bold;
}
.Homesearch .topmusic img {
  width: 60rpx;
  height: 60rpx;
}
.sharchtop {
  display: flex;
  margin: 20rpx;
  justify-content: space-between;
}
.section {
  position: relative;
  text-align: center;
  background: #fafafa;
  margin-top: 10rpx;
  border-radius: 40rpx;
  padding: 6rpx 20rpx;
}
input {
  width: 400rpx;
}
.topdv {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.hot {
  color: #c10d0d;
}
.hotclass {
  margin: 30rpx;
}
.hot1 {
  font-style: italic;
}
.hot2 {
  padding: 20rpx;
}
</style>
