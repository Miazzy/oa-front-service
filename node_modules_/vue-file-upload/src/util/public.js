var pub = {
  /**
   * [isHTML5 支持html5判断]
   * vue.js肯定是支持html5的
   * @return {Boolean} [description]
   */
  isHTML5(){
    return !!(window.FormData && File);
  },
  /**
   * [extend 多个对象复制]
   * 原来的vue的extend函数只支持2个参数，太不仁道了
   * @param  {[Object]} target     [目标对象]
   * @param  {[Object]} ...sources [原对象（可能多个）]
   * @return {[Object]}            [返回新的对象]
   */
  extend(target,...sources){

    sources.forEach(source => {
      Object.defineProperties(target, Object.keys(source).reduce((descriptors, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
          return descriptors;
    }, {}));
    });
    return target;
  },
  /**
   * [isEmptyObject 空对象检查]
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isEmptyObject(obj){
    if(this.isObject(obj)){
      let name = null;

      for(name in obj){
        if(name)return false;
      }
    }
    return true;
  },
  /**
   * [_isFile check文件]
   * ie9 未定义File
   * @param  {[type]}  file [description]
   * @return {Boolean}      [description]
   */
  isFile(file){
    return file !== null && !!((window.File && file instanceof window.File) && file.size >= 0 )
  },

  /**
   * Add event listener shorthand.
   *
   * @param {Element} el
   * @param {String} event
   * @param {Function} cb
   * @param {Boolean} [useCapture]
   */
  on(el, event, cb, useCapture){
    el.addEventListener(event, cb, useCapture)
  },

  /**
   * Remove event listener shorthand.
   *
   * @param {Element} el
   * @param {String} event
   * @param {Function} cb
   */
  off(el, event, cb){
    el.removeEventListener(event, cb)
  },

  /**
   * Array type check.
   *
   * @param {*} obj
   * @return {Boolean}
   */
  isArray(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  },

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   *
   * @param {*} obj
   * @return {Boolean}
   */
  isObject(obj){
    return obj !== null && typeof obj === 'object'
  },

  /**
   * Convert an Array-like object to a real Array.
   *
   * @param {Array-like} list
   * @param {Number} [start] - start index
   * @return {Array}
   */
  toArray(list, start) {
    start = start || 0
    var i = list.length - start
    var ret = new Array(i)
    while (i--) {
      ret[i] = list[i + start]
    }
    return ret
  }

}
export default pub;
