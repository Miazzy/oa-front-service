import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../../_util/vue-types';
import BaseMixin from '../../_util/BaseMixin';
import classNames from 'classnames';
import defaultRequest from './request';
import getUid from './uid';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';

var upLoadPropTypes = {
  componentTag: PropTypes.string,
  // style: PropTypes.object,
  prefixCls: PropTypes.string,
  name: PropTypes.string,
  // className: PropTypes.string,
  multiple: PropTypes.bool,
  directory: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  // children: PropTypes.any,
  // onStart: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  headers: PropTypes.object,
  beforeUpload: PropTypes.func,
  customRequest: PropTypes.func,
  // onProgress: PropTypes.func,
  withCredentials: PropTypes.bool,
  openFileDialogOnClick: PropTypes.bool
};

var AjaxUploader = {
  inheritAttrs: false,
  name: 'ajaxUploader',
  mixins: [BaseMixin],
  props: upLoadPropTypes,
  data: function data() {
    this.reqs = {};
    return {
      uid: getUid()
    };
  },
  mounted: function mounted() {
    this._isMounted = true;
  },
  beforeDestroy: function beforeDestroy() {
    this._isMounted = false;
    this.abort();
  },

  methods: {
    onChange: function onChange(e) {
      var files = e.target.files;
      this.uploadFiles(files);
      this.reset();
    },
    onClick: function onClick() {
      var el = this.$refs.fileInputRef;
      if (!el) {
        return;
      }
      el.click();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        this.onClick();
      }
    },
    onFileDrop: function onFileDrop(e) {
      var _this = this;

      e.preventDefault();
      if (e.type === 'dragover') {
        return;
      }
      if (this.directory) {
        traverseFileTree(e.dataTransfer.items, this.uploadFiles, function (_file) {
          return attrAccept(_file, _this.accept);
        });
      } else {
        var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) {
          return attrAccept(file, _this.accept);
        });
        this.uploadFiles(files);
      }
    },
    uploadFiles: function uploadFiles(files) {
      var _this2 = this;

      var postFiles = Array.prototype.slice.call(files);
      postFiles.forEach(function (file) {
        file.uid = getUid();
        _this2.upload(file, postFiles);
      });
    },
    upload: function upload(file, fileList) {
      var _this3 = this;

      if (!this.beforeUpload) {
        // always async in case use react state to keep fileList
        return setTimeout(function () {
          return _this3.post(file);
        }, 0);
      }

      var before = this.beforeUpload(file, fileList);
      if (before && before.then) {
        before.then(function (processedFile) {
          var processedFileType = Object.prototype.toString.call(processedFile);
          if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
            return _this3.post(processedFile);
          }
          return _this3.post(file);
        })['catch'](function (e) {
          console && console.log(e); // eslint-disable-line
        });
      } else if (before !== false) {
        setTimeout(function () {
          return _this3.post(file);
        }, 0);
      }
    },
    post: function post(file) {
      var _this4 = this;

      if (!this._isMounted) {
        return;
      }
      var data = this.$props.data;

      if (typeof data === 'function') {
        data = data(file);
      }
      new Promise(function (resolve) {
        var action = _this4.action;

        if (typeof action === 'function') {
          return resolve(action(file));
        }
        resolve(action);
      }).then(function (action) {
        var uid = file.uid;

        var request = _this4.customRequest || defaultRequest;
        _this4.reqs[uid] = request({
          action: action,
          filename: _this4.name,
          file: file,
          data: data,
          headers: _this4.headers,
          withCredentials: _this4.withCredentials,
          onProgress: function onProgress(e) {
            _this4.$emit('progress', e, file);
          },
          onSuccess: function onSuccess(ret, xhr) {
            delete _this4.reqs[uid];
            _this4.$emit('success', ret, file, xhr);
          },
          onError: function onError(err, ret) {
            delete _this4.reqs[uid];
            _this4.$emit('error', err, ret, file);
          }
        });
        _this4.$emit('start', file);
      });
    },
    reset: function reset() {
      this.setState({
        uid: getUid()
      });
    },
    abort: function abort(file) {
      var reqs = this.reqs;

      if (file) {
        var uid = file;
        if (file && file.uid) {
          uid = file.uid;
        }
        if (reqs[uid]) {
          reqs[uid].abort();
          delete reqs[uid];
        }
      } else {
        Object.keys(reqs).forEach(function (uid) {
          if (reqs[uid]) {
            reqs[uid].abort();
          }

          delete reqs[uid];
        });
      }
    }
  },

  render: function render() {
    var _classNames;

    var h = arguments[0];
    var $props = this.$props,
        $attrs = this.$attrs;
    var Tag = $props.componentTag,
        prefixCls = $props.prefixCls,
        disabled = $props.disabled,
        multiple = $props.multiple,
        accept = $props.accept,
        directory = $props.directory,
        openFileDialogOnClick = $props.openFileDialogOnClick;

    var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
    var events = disabled ? {} : {
      click: openFileDialogOnClick ? this.onClick : function () {},
      keydown: this.onKeyDown,
      drop: this.onFileDrop,
      dragover: this.onFileDrop
    };
    var tagProps = {
      on: _extends({}, this.$listeners, events),
      attrs: {
        role: 'button',
        tabIndex: disabled ? null : '0'
      },
      'class': cls
    };
    return h(
      Tag,
      tagProps,
      [h('input', {
        attrs: {
          id: $attrs.id,
          type: 'file',

          accept: accept,
          directory: directory ? 'directory' : null,
          webkitdirectory: directory ? 'webkitdirectory' : null,
          multiple: multiple
        },
        ref: 'fileInputRef',
        key: this.uid,
        style: { display: 'none' }, on: {
          'change': this.onChange
        }
      }), this.$slots['default']]
    );
  }
};

export default AjaxUploader;