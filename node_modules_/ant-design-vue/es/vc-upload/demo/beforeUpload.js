import Upload from '../index';

export default {
  render: function render() {
    var h = arguments[0];

    var uploaderProps = {
      props: {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        multiple: true,
        beforeUpload: function beforeUpload(file, fileList) {
          console.log(file, fileList);
          return new Promise(function (resolve) {
            console.log('start check');
            setTimeout(function () {
              console.log('check finshed');
              resolve(file);
            }, 3000);
          });
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