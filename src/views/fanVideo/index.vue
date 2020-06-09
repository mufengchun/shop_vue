<template>
  <div class='fanVideo'>
    
    <div class="comm_search">
      <div class="comm_search_item">
        <span class="comm_search_label">粉丝昵称：</span>
        <el-input class="comm_search_value" type="text" placeholder="请输入粉丝昵称" size="small" />
      </div>

      <div class="comm_search_item">
        <span class="comm_search_label">视屏标题：</span>
        <el-input class="comm_search_value" type="text" placeholder="请输入粉丝昵称" size="small" />
      </div>

      <div class="comm_search_item">
        <span class="comm_search_label">开放状态：</span>
        <!-- <el-radio v-model="isOpen" :label='1'>是</el-radio>
        <el-radio v-model="isOpen" :label='2'>否</el-radio> -->
        <el-select v-model="form.isOpen" placeholder="请选择">
          <el-option lable='全部' value=''></el-option>
          <el-option lable='开放' :value='1'></el-option>
          <el-option lable='未开放' :value='0'></el-option>
        </el-select>
      </div>

      <div class="comm_search_item">
        <span class="comm_search_label">推荐状态：</span>
        <el-select v-model="form.isRecommend" placeholder="请选择">
          <el-option lable='全部' value=''></el-option>
          <el-option lable='推荐' :value='1'></el-option>
          <el-option lable='不推荐' :value='0'></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  components: {},

  data () {
    return {
      form: {}
    };
  },

  created () {},

  methods: {}
};
</script>

<style lang='scss' scoped>
  @import url('./index.scss');
</style>