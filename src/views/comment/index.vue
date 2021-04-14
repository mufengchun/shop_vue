<template>
  <div class='comment'>

    <div class='comment_search'>
      <div class='comment_search_item'>
        标题：
        <el-input v-model="title" style='width: 240px;' size='small'></el-input>
      </div>
      <div class='comment_search_item' style='margin-left: 20px;'>
        摘要：
        <el-input v-model="summary" style='width: 240px;' size='small'></el-input>
      </div>
      <el-button type='primary' @click='searchEvent' size='small' style='margin-left: 20px;'>查询</el-button>
    </div>

    <div class='comment_table'>
      <el-table border size='small'
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="commentId" label="id" width="80"> </el-table-column>
      <el-table-column prop="nick" label="nick" width="180"> </el-table-column>
      <el-table-column prop="headImg" label="headImg" width="124">
        <template slot-scope="props">
          <img class='comment_table_headImg' :src="props.row.headImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="text" label="text">
        <template slot-scope="props">
          <div class="comment_table_text">{{props.row.text}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="summary" label="summary"> </el-table-column> -->
      <el-table-column prop="commentUrl" label="commentUrl">
        <template slot-scope="props">
          <img class='comment_table_headImg' :src="item" v-for='(item, index) in props.row.imageList ? props.row.imageList.split(",") : []' :key='index' alt="">
        </template>
      </el-table-column>
      <el-table-column prop="isOpen" label="状态" width="80">
        <template slot-scope="props">
          {{props.row.isOpen ? '开放' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column prop="isOpen" label="操作" width='215px'>
        <template slot-scope="props">
          <el-button :type="!props.row.isOpen ? 'primary' : 'warning'" size='small' @click='editStatusEvent(props.row.commentId, props.row.isOpen)'>{{!props.row.isOpen ? '开放' : '关闭'}}</el-button>
          <el-button type='primary' size='small' @click='deleEvent(props.row.commentId)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  components: {},

  data () {
    return {
      tableData: [],
      title: '',
      summary: '',
      formData: {}
    };
  },

  created () {
    this.getList();
  },

  methods: {
    getList () {
      let params = {
        title: this.title,
        summary: this.summary
      };
      window.$axios.get({url: '/comments/getComment', params}).then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
        }
      });
    },
    searchEvent () {
      this.getList();
    },
    editStatusEvent (id, isOpen) {
      // let obj = {commentId: id, isOpen: isOpen ? 0 : 1};
      let str = '?';
      if (id) {
        str += `commentId=${id}`;
      }
      if (isOpen || isOpen === 0) {
        str += `&isOpen=${isOpen ? 0 : 1}`;
      }
      window.$axios.get({url: '/comments/status' + str}).then(() => {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        });
        this.getList();
      });
    },
    deleEvent (id) {
      window.$axios.get('comments/delete?commentId=' + id).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList();
      });
    }
  }
};
</script>

<style lang='scss'>
  @import url('./index.scss');
  // @import './index.scss';
</style>