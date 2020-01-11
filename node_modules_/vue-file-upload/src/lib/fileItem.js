import _ from '../util/public.js';

class FileItem{
  constructor(uploader,fileObject,fileAlias){
    var file = _.isFile(fileObject) ? fileObject : null;
    var input =  file ? null : fileObject;
    _.extend(this,{
      uploader,
      file,
      input,
      index:null,
      url:uploader.url,
      alias:uploader.name,
      method:uploader.method,
      isReady: false,
      isUploading: false,
      isUploaded: false,
      isSuccess: false,
      isCancel: false,
      isError: false,
      progress: 0
    },{
      name:fileAlias.name,
      size:fileAlias.size,
      type:fileAlias.type
    })
  }

/**
 * [upload 上传文件]
 * @return {[type]} [description]
 */
  upload(){
    try{
      this.uploader.uploadItem(this);
    }catch(e){

      this.uploader._onErrorUpload(this,e.message,e.number,[]);
      this.uploader._onErrorUpload(this,e.message,e.number,[]);
      throw e;
    }
  }
  /**
   * [cancel 取消上传]
   * @return {[type]} [description]
   */
  cancel(){
    this.uploader.abortItem(this);
  }
  /**
   * [remove 从队列移除]
   * @return {[type]} [description]
   */
  remove(){
    this.uploader.removeFromQueue(this);
  }
  /**
   * [destroy 销毁]
   * @return {[type]} [description]
   */
  destroy(){
    this.uploader = {};
  }
  /**
   * [onPrepareUpload 预备上传函数]
   * @return {[type]} [description]
   */
  onPrepareUpload(){
    if(this.isReady)return;
    this.isReady = true;
    this.index = ++this.uploader.fileIndex;
  }
  /**
   * [onBeforeUpload 上传之前的函数执行]
   * @return {[type]} [description]
   */
  onBeforeUpload(){
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;

  }
  /**
   * [onProgress 上传进度回调]
   * @param  {[type]} progress [description]
   * @return {[type]}          [description]
   */
  onProgress(progress){
    if(this.isUploading){
      this.progress = progress;
    }
  }
  /**
   * [onSuccess 上传成功，状态变更]
   * @return {[type]} [description]
   */
  onSuccess(){
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
  }
  /**
   * [onError 上传错误，状态变更]
   * @return {[type]} [description]
   */
  onError(){
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
  }
  /**
   * [onAbort 取消上传，上传错误，状态变更]
   * @return {[type]}          [description]
   */
  onAbort(){
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
  }
}
export default FileItem;
