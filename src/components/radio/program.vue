<template>
  <div class="program">
    <div>
      <div v-for="(item, index) in program" :key="index" class="programnav">
        <div class="num">
          {{ program.length - index }}
        </div>
        <div>
          {{ item.name }}
          <div>
            <span
              v-text="
                new Date(parseInt(item.createTime))
                  .toLocaleString()
                  .split(' ')[0]
                  .replace('/', '-')
                  .replace('/', '-')
              "
            ></span>
            播放次数：{{ item.listenerCount }}时间：{{ item.duration }}
          </div>
        </div>
        <div class="proimg">
          <img src="../../native/tabbar/点点点.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "program",
  components: {},
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      program: {}
    };
  },
  methods: {},
  mounted() {
    console.log(this.id);
    this.$fly
      .get(`/dj/program?rid=${this.id}&limit=40`)
      .then(res => {
        this.program = res.data.programs;
        console.log(res.data.programs);
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
.programnav {
  display: flex;
  font-size: 26rpx;
  align-items: center;
  margin: 10rpx;
}
.proimg img {
  width: 100rpx;
  height: 100rpx;
}
.num {
  margin: 10rpx;
}
</style>
