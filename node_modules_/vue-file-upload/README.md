# vue-file-upload
[![NPM version](https://img.shields.io/npm/v/vue-file-upload.svg?style=flat-square)](https://www.npmjs.com/package/vue-file-upload)
[![npm download](https://img.shields.io/npm/dm/vue-file-upload.svg?style=flat-square)](https://www.npmjs.com/package/vue-file-upload)

> vue1.x版本 可安装vue-file-upload@0.0.7版本   
vue2.x版本 可安装当前最新版本

vue.js ，vue-loader 上传文件，vue-file-upload
代码里面包含demo，运行：
```shell
yarn install && yarn sart
```

## install
### npm
```shell
npm install --save vue-file-upload
```
### CommonJS
```javascript
var VueFileUpload = require('vue-file-upload');
//es6
import VueFileUpload from 'vue-file-upload';
```
### 属性（Props）
```javascript
//目标服务器地址
url:{
  type:String,
  required:true
},
//最大文件上传数
max:{
  type:Number,
  default:Number.MAX_VALUE
},
//文件名称（服务端识别的上传文件名）
name:{
  type:String,
  default:'file'
},
//自动上传
autoUpload:{
  type:Boolean,
  default:false
},
//支持多选文件上传
multiple:{
  type:Boolean,
  default:false
},
//每新增一个待上传文件回调函数
onAdd:{
    type:Function,
    default:noop
},
//过滤函数
filters:{
  type:Array,
  default:()=>{
    return new Array();
  }
},
//请求附带参数
requestOptions:{
  type:Object,
  default:()=>{
    return{
      formData:{},
      headers:{},
      responseType:'json',
      withCredentials:false
    }
  }
},
//文件上传状态回调函数
events:{
  type:Object,
  default:()=>{
    return {
      onProgressUpload:noop(file,progress:number),//上传进度回调
      onCompleteUpload:noop(file,response,status,headers),//上传完成回调，不论成功或失败都调用
      onErrorUpload:noop(file,response,status,headers),//上传失败回调
      onSuccessUpload:noop(file,response,status,headers),//上传成功回调
      onAbortUpload:noop(file,response,status,headers),//取消上传
      onAddFileFail:noop(file,failFilter:array),//添加待上传文件失败回调，会通过filters过滤函数校验，不通过回调此函数
      onAddFileSuccess:noop(file)//添加待上传文件成功回调
    }
  }
}

```
### 按钮名称说明
```html
<vue-file-upload>
    <span slot="label">上传文件</span>
</vue-file-upload>

```
### 文件属性说明（file）
```javascript
const file = {
  name:"文件名称",//文件名称
  size:123,//文件大小
  type:"image/jpeg",//文件类型
  isReady: false,//，点击上传后，即将准备好上传
  isUploading:false,//正在上传
  isUploaded:false,//上传后
  isSuccess:false,//成功上传
  isCancel:false,//取消上传
  isError:false,//上传失败
  progress:0,//上传进度
}

//file 函数（method）
file.upload(); //上传该文件
file.cancel();//取消上传
file.remove();//移除该文件

```
### 方法（methods）
```javascript
this.$refs.vueFileUploader.uploadAll()//上传所有队列中的文件
this.$refs.vueFileUploader.clearAll()//清空队列文件
this.$refs.vuefileUploader.setFormDataItem( key, value );//设置formdata
```
### ES6
app.vue
```javascript
<template lang="jade">
vue-file-upload(url='upload.do',
  ref="vueFileUploader",
  v-bind:filters = "filters",
  v-bind:events = 'cbEvents',
  v-bind:request-options = "reqopts",
  v-on:onAdd = "onAddItem")
    span(slot="label") 选择文件
table
  thead
    tr
      th name
      th size
      th progress
      th status
      th action
  tbody
    tr(v-for='file in files')
      td(v-text='file.name')
      td(v-text='file.size')
      td(v-text='file.progress')
      td(v-text='onStatus(file)')
      td
        button(type='button',@click="uploadItem(file)") 上传
button(type='button',@click="uploadAll") 上传所有文件
button(type='button',@click="clearAll") 清空文件列表
</template>
<script>
import VueFileUpload from 'vue-file-upload';
export default{
  data(){
    return{
      files:[],
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(file);
          console.log("finish upload;")
        }
      },
      //xhr请求附带参数
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  mounted(){
    //设置formData数据
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
    onAddItem(files){
        console.log(files);
        this.files = files;
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$refs.vueFileUploader.uploadAll();
    },
    clearAll(){
      //清空所有文件
      this.$refs.vueFileUploader.clearAll();
    }
  },
  components:{
    VueFileUpload
  }
}
</script>
```
