/**
 * commonjs 直接导出对象数据，会导致多个vue-file-upload重复引用数据问题
 * 谢谢 @qianniuc 提出的issue
 */
const generateOptions = () => {
  return {
  method:"POST",
  queue:[],
  alias:"file",
  autoUpload:true,
  filters:[],
  formData:{},
  headers:{},
  maxItems:Number.MAX_VALUE,
  withCredentials:false,
  responseType:"json"
};
}
export default generateOptions;