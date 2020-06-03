<template>
  <div class='addArticle'>
    <div class='addArticle_wrap'>
      <div class='addArticle_title'>
        新增文章
        <span style='flex: 1;'></span>
        <i class="el-icon-close" @click="$emit('cancelAdd')"></i>
      </div>

      <div class='addArticle_box'>
        <div class='addArticle_box_item'>
          昵称：
          <el-input v-model="form.nick" style='width: 240px;' size='small'></el-input>
        </div>

         <div class='addArticle_box_item'>
          图像地址：
          <!-- <el-input v-model="form.headImg" style='width: 240px;' size='small'></el-input> -->
          <el-upload
            style='widthL 100px; height: 100px;'
            ref="upload"
            list-type="picture-card"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="uploadBeforeImg">
            <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
            <i v-if='!form.headImg' slot="default" class="el-icon-plus"></i>
            <img v-else width="100px" :src="form.headImg" alt="">
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>

         <div class='addArticle_box_item'>
          标题：
          <el-input v-model="form.title" type='textarea' style='width: 240px;' size='small'></el-input>
        </div>

         <div class='addArticle_box_item'>
          摘要：
          <el-input v-model="form.summary" type='textarea' style='width: 240px;' size='small'></el-input>
        </div>

         <div class='addArticle_box_item'>
          文章地址：
          <!-- <el-input style='width: 240px;' size='small'></el-input> -->
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="uploadBefore">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <el-button v-if='form.articleUrl' @click='lookEvent' type='primary' size="small" style='margin-left: 20px;'>预览</el-button>
        </div>

        <div class='addArticle_box_item'>
          分类：
          <el-radio-group v-model="form.classId">
            <el-radio label="">全部</el-radio>
            <el-radio :label="1">文学</el-radio>
            <el-radio :label="2">历史</el-radio>
            <el-radio :label="3">生活</el-radio>
            <el-radio :label="4">小说</el-radio>
            <el-radio :label="5">杂志</el-radio>
            <el-radio :label="6">其他</el-radio>
          </el-radio-group>
        </div>

      </div>

      <div style='text-align: center;margin-bottom: 20px;'>
        <el-button type='' size='small' @click="$emit('cancelAdd')">取消</el-button>
        <el-button type='primary' size='small' @click="addEvent">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import $Axios from 'axios';
export default {
  props: {
    formData: {
      default: () => {}
    }
  },

  components: {},

  data () {
    return {
      form: {
        nick: '',
        headImg: '',
        title: '',
        summary: '',
        articleUrl: '',
        classId: ''
      }
    };
  },

  created () {
    // Object.assign(this.form, this.formData);
    Object.keys(this.form).map(key => {
      this.form[key] = this.formData[key];
    });
  },

  methods: {
    uploadBefore (file) {
      let forData = new FormData();
      forData.append('file', file);
      window.$axios.post('upload/uploadFile', {data: forData, headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}}).then(res => {
        this.form.articleUrl = res.data.data[0] || '';
      });
      return false;
    },
    uploadBeforeImg (file) {
      let forData = new FormData();
      forData.append('file', file);
      window.$axios.post('upload/uploadFile', {data: forData, headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'}}).then(res => {
        this.form.headImg = res.data.data[0] || '';
      });
      return false;
    },
    addEvent () {
      // editArticle
      if (this.formData.id) {
        let obj = {...this.form};
        obj.id = this.formData.id;
        window.$axios.post('articles/editArticle', {data: obj}).then(() => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.$emit('cancelAdd');
          this.$emit('successAdd');
        });
      } else {
        window.$axios.post('articles/submitArticle', {data: this.form}).then(() => {
          this.$emit('cancelAdd');
          this.$emit('successAdd');
        });
      }
    },
    lookEvent () {
      let aLink = window.document.createElement('a');
      aLink.target = '_blank';
      aLink.href = this.form.articleUrl;
      aLink.click();
    }
  }
};
</script>

<style lang='sass' scoped>
  @import url('./addArticle.scss');
</style>
