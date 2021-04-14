<template>
  <div class='home'>
    <div class='article_search'>

      <div class='article_search_item'>
        标题：
        <el-input v-model="title" style='width: 240px;' size='small'></el-input>
      </div>
      <div class='article_search_item' style='margin-left: 20px;'>
        摘要：
        <el-input v-model="summary" style='width: 240px;' size='small'></el-input>
      </div>
      <el-button type='primary' @click='searchEvent' size='small' style='margin-left: 20px;'>查询</el-button>
      <el-button type='primary' size='small' style='margin-left: 20px;' @click='isShowAdd = true'>新增</el-button>
    </div>

    <div class='article_table'>
      <el-table border size='small'
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="nick" label="nick" width="180"> </el-table-column>
      <el-table-column prop="headImg" label="headImg" width="126">
        <template slot-scope="props">
          <img class='article_table_headImg' :src="props.row.headImg" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="title"> </el-table-column>
      <el-table-column prop="summary" label="summary"  width="300">
        <template slot-scope="props">
          <div class="article_table_summary">{{props.row.summary}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="articleUrl" label="articleUrl"> </el-table-column>
      <el-table-column prop="classId" label="classify">
        <template slot-scope="props">
          {{classifyTrans(props.row.classId)}}
        </template>
      </el-table-column>
      <el-table-column prop="isOpen" label="状态">
        <template slot-scope="props">
          {{props.row.isOpen ? '开放' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column prop="isOpen" label="操作" minWidth='155px'>
        <template slot-scope="props">
          <el-button type='primary' size='small' @click='editEvent(props.row.id)'>编辑</el-button>
          <el-button type='primary' size='small' @click='editStatusEvent(props.row.id, props.row.isOpen)'>{{!props.row.isOpen ? '开放' : '关闭'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <add-article v-if='isShowAdd' :formData='formData' @cancelAdd='isShowAdd = false' @successAdd='getList'></add-article>
  </div>
</template>

<script>
import AddArticle from './addArticle';
export default {
  props: {},

  components: {
    AddArticle
  },

  data () {
    return {
      isShowAdd: false,
      tableData: [],
      title: '',
      summary: '',
      formData: {}
    };
  },

  created () {
    this.getList();
    window.$axios.get({url: '/test/404'}).then(() => {
      // console.log('401 状态流转回来了', res);
    });
    // window.$axios.get({url: '/test/404'});
  },

  methods: {
    getList () {
      let params = {
        title: this.title,
        summary: this.summary
      };
      window.$axios.get({url:'/articles/getArticle', params}).then(res => {
        // console.log('请求成功', res.data.data);
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
        }
      }).catch(() => {
        // console.log('错误跳出循环');
      });
    },
    searchEvent () {
      this.getList();
    },
    editEvent (id) {
      window.$axios.get({url: '/articles/getArticle?id=' + id}).then(res => {
        if (res.data && res.data.data) {
          this.formData = res.data.data[0];
          this.isShowAdd = true;
        }
      });
    },
    editStatusEvent (id, isOpen) {
      let obj = {id: id, isOpen: isOpen ? 0 : 1};
      window.$axios.post('articles/editArticle', {data: obj}).then(() => {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        });
        this.getList();
      });
    },
    classifyTrans (val) {
      const obj = {
        1: '文学',
        2: '历史',
        3: '生活',
        4: '小说',
        5: '杂志',
        6: '其他'
      };
      return val ? obj[val] : '--';
    }
  }
};
</script>

<style lang='sass' scoped>
  @import url('./index.scss');
</style>