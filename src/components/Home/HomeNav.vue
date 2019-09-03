<template>
  <div class="HomeNav">
    <header>
      <div>
        <span @click="clickNew" :class="{ color: num === 1 }">{{
          title[0]
        }}</span>
        <span @click="New" :class="{ color: num === 2 }">{{ title[2] }}</span>
      </div>
      <div class="square">{{ title[1] }}</div>
    </header>

    <div class="squarenav">
      <div v-for="(item, index) in resource" :key="index" class="squarenav1">
        <div v-if="item.picUrl">
          <img :src="item.picUrl" alt="" class="resourceimg" @click="todetails(item)"/>
        </div>
        <div v-if="item.album">
          <img :src="item.album.blurPicUrl" alt="" class="resourceimg"  @click="todetails(item)"/>
        </div>
        <div v-if="item.song">
          <img :src="item.song.album.blurPicUrl" alt="" class="resourceimg"  @click="todetails(item)"/>
        </div>
        <div v-if="item.coverUrl">
          <img :src="item.coverUrl" alt="" class="resourceimg"  @click="todetails(item)"/>
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeNav",
  components: {},
  props: {
    resource: {
      type: Array
    },
    title: {
      type: Array
    }
  },
  data() {
    return {
      num: 2
    };
  },
  methods: {
    New() {
      this.num = 1;
      this.$emit("update:resource", this.newSongs);
    },
    clickNew() {
      this.num = 2;
      this.$emit("update:resource", this.album);
    },
    todetails(item) {
      wx.navigateTo({
        url: `../../pages/Details/Details?id=${item.id}&title=${this.title[0]}`
      })
      console.log(this.title[0]);
      console.log(item);
    },
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    album() {
      return this.$store.state.album;
    },
    newSongs() {
      return this.$store.state.newSongs;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.HomeNav header {
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  align-items: center;
}
.squarenav {
  display: flex;
  flex-wrap: wrap;
}
.squarenav1 {
  /* 只显示一行 */
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 24rpx;
  margin: 10rpx;
}
.resourceimg {
  width: 100%;
  height: 200rpx;
  border-radius: 10rpx;
}
.square {
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  background-color: #eeeeee;
}
.color {
  color: #eeeeee;
  font-size: 30rpx;
}
</style>
