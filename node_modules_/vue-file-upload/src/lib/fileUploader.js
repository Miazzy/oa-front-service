
import _ from '../util/public.js';
import generateOptions from './generate.js';
import FileItem from './fileItem.js';
import FileAlias from './fileAlias.js';
/**
 * FileUploader 类
 * 图片队列保存，
 * 回调函数执行
 */
class FileUploader{


  constructor(options){

    _.extend(this,generateOptions(),options,{
      fileIndex:0,
      isUploading:false,
      failFilterIndex:-1
    });
    //限制图片上传数量
    this.filters.push({
      name:"maxLimit",
      fn(){
        return  this.getAll().length < this.maxItems;
      }
    });
  }
  /**
   * [getAll 获取所有队列文件]
   * 完成用户业务组件和vue－file－upload组件的文件同步
   * @return {[type]} [description]
   */
  getAll(){
    return this.queue;
  }

  /**
   * [addQueue 添加到队列]
   * 由组件里input发生change时，调用此函数
   * @param {[FileList]} files [文件列表]
   */
  addToQueue(files){
    var uploader = this;
    var files = uploader._isFileList(files) ? _.toArray(files) : [files];

    //file可能是File,htmlInputElement,Object
    files.forEach((file)=>{
      var fileAlias = new FileAlias(file);
      if(uploader._isValidFile(fileAlias,uploader.filters)){
        var fileItem = new FileItem(this,file,fileAlias);
        uploader.queue.push(fileItem);
        uploader.onAddFileSuccess(fileItem);
      }else{
        uploader.onAddFileFail(file,uploader.filters[uploader.failFilterIndex]);
      }
    });

    if(uploader.autoUpload){
      uploader.uploadAll();
    }
  }
  /**
   * [uploadAll 上传所有队列里的文件]
   * @return {[type]} [description]
   */
  uploadAll(){
    //var uploader =  this;
    if(!this.queue.length)return;
    var fileItems = this.getNotUploadedItems();

    fileItems.forEach((fileItem)=>{
        fileItem.onPrepareUpload();
    });
    fileItems.length && fileItems[0].upload();
    //_.()
  }
  /**
   * [uploadItem 开始执行上传文件]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
  uploadItem(fileItem){
    if(this.isUploading)return;

    var postMethod = _.isHTML5() ? "_xhrPost" : "_iframePost";
    var fileItem = fileItem || this.getNotUploadedItems()[0];
    if(fileItem){
      this.isUploading = true;
      //预备上传，调整状态
      fileItem.onPrepareUpload();
      this[postMethod](fileItem);
    }
  }
  /**
   * [abortItem 取消上传]
   * 由组件发起取消命令，执行对应的回调函数（onabort）
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  abortItem(item){
    var prop = _.isHTML5() ? '_xhr' : '_form';
    if(item && item.isUploading) item[prop].abort();
  }

/**
 * [clearQueue 清空队列文件]
 * @return {[type]} [description]
 */
  clearQueue(){
    while(this.queue.length){
      this.queue[0].remove();
    }
  }
  /**
   * [removeFromQueue 删除文件]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
  removeFromQueue(fileItem){
    let index = this.queue.indexOf(fileItem);
    if(fileItem.isUploading)fileItem.cancel();
    this.queue.splice(index, 1);
    fileItem.destroy();
  }
  /**
   * 设置formData
   * @param { string } key 键名
   * @param { string | array | object} data 键值
   */
  setFormDataItem( key, data = ''){
    this.formData[ key ] = data;
  }
  /**
   * [getNotUploadedItems 获取队列未上传文件列表]
   * @return {[type]} [description]
   */
  getNotUploadedItems(){
    return this.queue.filter(item=>!item.isUploaded)
  }
  /**
   * [getNextReadyItems 获取待上传文件]
   * @return {[type]} [description]
   */
  getNextReadyItems(){
    return this.queue.filter(item=>item.isReady && !item.isUploading);
  }
  /**
   * [onAddFileSuccess 成功添加队列回调]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
  onAddFileSuccess(fileItem){

  }
  /**
   * [onAddFileFail 失败添加队列回调]
   * @param  {[type]} file       [description]
   * @param  {[type]} failFilter [description]
   * @return {[type]}            [description]
   */
  onAddFileFail(file,failFilter){

  }
  /**
   * [_onProgressUpload 内部方法，上传进度]
   * @param  {[class]} fileItem [description]
   * @param  {[number]} progress [进度值]
   * @return {[type]}          [description]
   */
  _onProgressUpload(fileItem, progress){

    fileItem.onProgress(progress);
    this.onProgressUpload(fileItem,progress);
  }
  /**
   * [onProgressUpload 回调上传进度函数]
   * @param  {[class]} fileItem [description]
   * @param  {[number]} progress [description]
   * @return {[type]}          [description]
   */
  onProgressUpload(fileItem, progress){

  }

  /**
   * [_onSuccessUpload 内部方法，成功上传执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出内容]
   * @param  {[number]} status   [状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  _onSuccessUpload(fileItem, response, status, headers){
    fileItem.onSuccess();
    this.onSuccessUpload(fileItem, response, status, headers);
  }

  /**
   * [onSuccessUpload 成功回调]
   * @param  {[type]} fileItem [description]
   * @param  {[type]} response [description]
   * @param  {[type]} status   [description]
   * @param  {[type]} headers  [description]
   * @return {[type]}          [description]
   */
  onSuccessUpload(fileItem, response, status, headers){

  }

  /**
   * [_onCompleteUpload 内部方法，完成上传过程，执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  _onCompleteUpload(fileItem, response, status, headers){
    this.onCompleteUpload(fileItem, response, status, headers);
    var nextItem = this.getNextReadyItems()[0];
    this.isUploading = false;

    if(_.isObject(nextItem)){
      nextItem.upload();
    }
  }
  /**
   * [_onCompleteUpload 完成上传回调]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  onCompleteUpload(fileItem, response, status, headers){

  }

  /**
   * [_onErrorUpload 内部函数，上传异常执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  _onErrorUpload(fileItem, response, status, headers){
    fileItem.onError();
    this.onErrorUpload(fileItem, response, status, headers);
  }

  /**
   * [_onErrorUpload 上传异常回调函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  onErrorUpload(fileItem, response, status, headers){

  }
  /**
   * [_onAbortUpload 内部函数，取消上传执行函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  _onAbortUpload(fileItem, response, status, headers){
    fileItem.onAbort()
    this.onAbortUpload(fileItem, response, status, headers);
  }

  /**
   * [onAbortUpload 取消上传回调函数]
   * @param  {[class]} fileItem [文件]
   * @param  {[string｜xml｜json]} response [服务端输出]
   * @param  {[number]} status   [网络状态]
   * @param  {[string｜json]} headers  [头部信息]
   * @return {[type]}          [description]
   */
  onAbortUpload(fileItem, response, status, headers){

  }

  /**
   * [_onBeforeUpload 上传之前回调函数]
   * @param  {[type]} fileItem [description]
   * @return {[type]}          [description]
   */
  _onBeforeUpload(fileItem){
    fileItem.onBeforeUpload();
    this.onBeforeUpload(fileItem);
  }
  onBeforeUpload(fileItem){

  }
  /**
   * [_getQueueItem 获取下一个待上传文件]
   * @return {[type]} [description]
   */
  _getQueueItem(){
    return this.queue.shift();
  }
  /**
   * [isFileList FileList类型判断]
   * @param  {[type]}  fileList [description]
   * @return {Boolean}          [description]
   */
  _isFileList(fileList){
    if("FileList" in window){
        return fileList instanceof FileList;
    }else{
        //ie
        return _.isObject(fileList) && 'length' in fileList;
    }
    
  }

  /**
   * [_isValidFile 有效的文件判断]
   * @param  {[File]}  file [description]
   * @param  {[Array]}  filters [description]
   * @return {Boolean}  true or false    [description]
   */
  _isValidFile(file,filters){
    this.failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter)=>{
      this.failFilterIndex++;
      return filter.fn.call(this,file);
    })
  }
  /**
   * [_parseHeaders 头部信息转json格式]
   * @param  {[type]} headers [description]
   * @return {[type]}         [description]
   */
  _parseHeaders(headers){
    var json = {};
    if(_.isObject(headers))return;
    headers.split("\n").forEach((header)=>{
      let index = header.indexOf(":");
      if(index > -1){
        let key = header.slice(0, index).trim();
        let val = header.slice(index + 1).trim();

        json[key] = json[key] ? json[key]+","+val : val;
      }

    })
    return json;
  }
  /**
   * [_xhrPost 支持html5特性]
   * 可以直接使用formdata，配合xmlhttprequest上传任意文件
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
  _xhrPost(fileItem){
    var uploader = this;
    //保留xhr对象，防止abort可以执行
    var xhr = fileItem._xhr = new XMLHttpRequest();
    var postData = new FormData();

    this._onBeforeUpload(fileItem);
    //追加formdata
    if(!_.isEmptyObject(uploader.formData)){
      for(let key in uploader.formData){
        postData.append(key,uploader.formData[key]);
      }
    }
    //添加上传文件
    postData.append(fileItem.alias,fileItem.file,fileItem.name);

    xhr.open(fileItem.method,fileItem.url,true);
    //添加header信息
    if(!_.isEmptyObject(uploader.headers)){
      for(let key in uploader.headers){
        xhr.setRequestHeader(key,uploader.headers[key])
      }
    }
    //上传进度回调
    xhr.upload.onprogress = (event)=>{
      var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      uploader._onProgressUpload(fileItem, progress);
    };
    //上传完成
    xhr.onload = ()=>{
      var headers = uploader._parseHeaders(xhr.getAllResponseHeaders());
      var response = xhr.response;
      var action = xhr.status == 200 ? "Success": "Error";
      var method = "_on"+action+"Upload";
      uploader[method](fileItem,response,xhr.status,headers);
      uploader._onCompleteUpload(fileItem,response,xhr.status,headers);
    };
    //上传错误
    xhr.onerror = ()=>{
      var headers = uploader._parseHeaders(xhr.getAllResponseHeaders());
      var response = xhr.response;
      uploader._onErrorUpload(fileItem,response,xhr.status,headers);
      uploader._onCompleteUpload(fileItem,response,xhr.status,headers);
    };
    //上传取消
    xhr.onabort = ()=>{
      var headers = uploader._parseHeaders(xhr.getAllResponseHeaders());
      var response = xhr.response;
      uploader._onAbortUpload(fileItem,response,xhr.status,headers);
      uploader._onCompleteUpload(fileItem,response,xhr.status,headers);
    };
    //返回类型设置，默认：json
    xhr.responseType = uploader.responseType;
    //跨域支持,默认：False
    xhr.withCredentials = uploader.withCredentials;
    xhr.send(postData);

  }
  /**
   * [_iframePost 悲剧，竟然不支持html5]
   * 只能模拟表单submit，target给iframe
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
  _iframePost(filecontrol){
    var uploader = this;
    var form = document.createElement("form");
    var iframe = document.createElement("iframe");

    var input = filecontrol.input;
    if(filecontrol._form){
      filecontrol._form = null;
    }
    filecontrol._form = form;

    this._onBeforeUpload(filecontrol);

    input.name = filecontrol.alias;

    form.style['display'] = 'none';
    iframe.name = "vueUploadFile"+Date.now();

    //追加formdata
    if(!_.isEmptyObject(uploader.formData)){
      for(let key in uploader.formData){
        let _input = document.createElement("input");
        _input.type = "hidden";
        _input.name = key;
        _input.value = uploader.formData[key];

        form.appendChild(_input);
      }
    }
    form.action = filecontrol.url;
    form.method = filecontrol.method;
    form.target = iframe.name;
    form.enctype = 'multipart/form-data';
    form.encoding = 'multipart/form-data';

    form.abort = ()=>{
      var xhr = {status: 0,response:null};
      var headers = {};
      _.off(iframe,"load");
      iframe.src = "javascript:false;"

      uploader._onAbortUpload(filecontrol, xhr.response, xhr.status, headers);
      uploader._onCompleteUpload(filecontrol, xhr.response, xhr.status, headers);
      uploader.vm.$refs.fileInput.parentNode.parentNode.appendChild(input);
      uploader.vm.$refs.fileInput.parentNode.removeChild(form);

    }


    uploader.vm.$refs.fileInput.parentNode.insertBefore(form,uploader.vm.$refs.fileInput);
    form.appendChild(input);
    form.appendChild(iframe);

    _.on(iframe,"load",function(){
      var response = '';
      var status = 200;
      var headers = {};
      try{
        response = iframe.contentDocument.body.innerHTML;
      }catch(e){
        status = 500;
        throw e;
      }
      var xhr = {response,status};
      uploader._onSuccessUpload(filecontrol, xhr.response, xhr.status, headers);
      uploader._onCompleteUpload(filecontrol, xhr.response, xhr.status, headers);
      _.off(iframe,"load");
      uploader.vm.$refs.fileInput.parentNode.parentNode.appendChild(input);
      uploader.vm.$refs.fileInput.parentNode.removeChild(form);

      input=null;
      form = null;
      iframe = null;
    });
    form.submit();
  }
}
export default FileUploader;
