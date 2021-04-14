<template>
  <div class='app_nav'>
      <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJOCoaadzBwwO5NsMyE3PrzVfT8EBSficz2OT8uDZLPHJmC6NkyOz5SA7RLjvN1Cpday09unmxQPeA/132" alt="">
      <h3>小程序管理系统</h3>
      <div>
        <span @click='skip("/article", 1)' :class='routeIndex === 1 ? "currentRoute" : ""'>文章管理</span>
        <span @click='skip("/comment", 2)' :class='routeIndex === 2 ? "currentRoute" : ""'>评论管理</span>
        <span @click='skip("/fanVideo", 3)' :class='routeIndex === 3 ? "currentRoute" : ""'>粉圈管理</span>
      </div>
      
    </div>
</template>

<script>
export default {
  props: {},

  components: {},

  data () {
    return {
      routeIndex: 1
    };
  },

  methods: {
    skip (url, index) {
      this.routeIndex = index;
      this.$router.push(url);
    }
  }
};
</script>

<style lang='scss'>
  
.app_nav{
  display: flex;
  align-items: center;
  background: #999;
  color: #fff;
  .currentRoute{
    color: #832;
  }
  h3{
    font-size: .36rem;
    // color: #343434;
    padding-right: 30px;
  }
  img{
    padding-left: 30px;
    padding-right: 10px;
    width: 50px;
    border-radius: 50%;
  }
  span{
    padding: 20px 10px;
    display: inline-block;
    font-size: .24rem;
    &:hover{
      color: #38f;
    }
  }
}
</style>