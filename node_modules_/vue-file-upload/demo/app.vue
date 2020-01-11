<style>
.vue-file-upload{
    position: relative;
    overflow: hidden;
    display: inline-block;
    color:#fff;
    padding:6px 12px;
    background-color:#5cb85c;
    border-color: #4cae4c;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
}
.vue-file-upload input[type=file]{
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    opacity: 0;
    -ms-filter: alpha(opacity=0);
    font-size: 200px;
    direction: ltr;
    cursor: pointer;
}
</style>
<template lang='jade'>
div
    vue-file-upload(url="http://127.0.0.1:6080/vue-file-upload/demo/upload.php",
    ref="vueFileUploader"
    class="fileupload-button"
    v-bind:events = 'cbEvents',
    v-bind:filters = "filters",
    v-bind:request-options = "reqopts",
    v-on:onAdd = "onAddItem"
    )
      span(slot="label") 选择文件
    table
      thead
        tr
          th name
          th size
          th preview
          th progress
          th status
          th action
      tbody
        tr(v-for='file in files')
          td(v-text='file.name')
          td(v-text='file.size')
          td
            img(v-bind:src='onPreview(file)',width='220px')
          td(v-text='file.progress')
          td(v-text='onStatus(file)')
          td
            button(type='button',value='upload',@click="uploadItem(file)") upload
            button(type='button',value='upload',@click="deleteItem(file)") delete
    button(type='button',@click="uploadAll") 上传所有文件
    button(type='button',@click="clearAll") 清空文件列表
</template>
<script>
import VueFileUpload from '../src/vue-file-upload.vue';
export default{
  data(){
    return{
      files:[],
      //过滤器回调
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //事件回调
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(file);
          console.log("finish upload;")
        },
        onAddFileSuccess:(file)=>{
          console.log(file);
          console.log("success add to queue");
        },
        onProgressUpload:(file, progress) => {
          console.log(file.name + ":" + progress);
        }
      },
      reqopts:{
        formData:{
          tokens:'tttttttttttttt',
          authorization:'',
        },
        responseType:'json',
        withCredentials:false,
        headers: {
            'custormerHeader':'aaa'
        }
      }
    }
  },
  created(){
  },
  mounted(){
    this.$refs.vueFileUploader.setFormDataItem('authorization',"123");
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    onPreview(file){
      if("URL" in window){
        var src = window.URL.createObjectURL(file.file);
        return src;
      }
        
    },
    onAddItem(files){
        console.log(files);
        this.files = files;
    },
    uploadItem(file){
      file.upload();
    },
    deleteItem(file){
        file.remove();
    },
    uploadAll(){
      this.$refs.vueFileUploader.uploadAll();
    },
    clearAll(){
      this.$refs.vueFileUploader.clearAll();
    }
  },
  components:{
    VueFileUpload
  }
}
</script>
