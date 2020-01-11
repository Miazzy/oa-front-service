import Upload from '../index';
import axios from 'axios';

export default {
  render: function render() {
    var h = arguments[0];

    var uploaderProps = {
      props: {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        multiple: false,
        data: {
          a: 1,
          b: 2
        },
        headers: {
          Authorization: '$prefix $token'
        },
        customRequest: function customRequest(_ref) {
          var action = _ref.action,
              data = _ref.data,
              file = _ref.file,
              filename = _ref.filename,
              headers = _ref.headers,
              onError = _ref.onError,
              onProgress = _ref.onProgress,
              onSuccess = _ref.onSuccess,
              withCredentials = _ref.withCredentials;

          // EXAMPLE: post form-data with 'axios'
          var formData = new FormData();
          if (data) {
            Object.keys(data).map(function (key) {
              formData.append(key, data[key]);
            });
          }
          formData.append(filename, file);

          axios.post(action, formData, {
            withCredentials: withCredentials,
            headers: headers,
            onUploadProgress: function onUploadProgress(_ref2) {
              var total = _ref2.total,
                  loaded = _ref2.loaded;

              onProgress({
                percent: Math.round(loaded / total * 100).toFixed(2)
              }, file);
            }
          }).then(function (_ref3) {
            var response = _ref3.data;

            onSuccess(response, file);
          })['catch'](onError);

          return {
            abort: function abort() {
              console.log('upload progress is aborted.');
            }
          };
        }
      },
      on: {
        start: function start(file) {
          console.log('start', file, file.name);
        },
        success: function success(file) {
          console.log('success', file);
        },
        error: function error(err) {
          console.log('error', err);
        },
        progress: function progress(_ref4, file) {
          var percent = _ref4.percent;

          console.log('progress', percent + '%', file.name);
        }
      }
    };
    return h(
      'div',
      {
        style: {
          margin: '100px'
        }
      },
      [h('div', [h(
        Upload,
        uploaderProps,
        [h('a', ['\u5F00\u59CB\u4E0A\u4F20'])]
      )])]
    );
  }
};