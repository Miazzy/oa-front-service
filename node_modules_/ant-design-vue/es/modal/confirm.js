import _extends from 'babel-runtime/helpers/extends';
import Vue from 'vue';
import ConfirmDialog from './ConfirmDialog';

export default function confirm(config) {
  var div = document.createElement('div');
  var el = document.createElement('div');
  div.appendChild(el);
  document.body.appendChild(div);
  var currentConfig = _extends({}, config, { close: close, visible: true });

  var confirmDialogInstance = null;
  var confirmDialogProps = { props: {} };
  function close() {
    destroy.apply(undefined, arguments);
  }
  function update(newConfig) {
    currentConfig = _extends({}, currentConfig, newConfig);
    confirmDialogProps.props = currentConfig;
  }
  function destroy() {
    if (confirmDialogInstance && div.parentNode) {
      confirmDialogInstance.$destroy();
      confirmDialogInstance = null;
      div.parentNode.removeChild(div);
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });
    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, args);
    }
  }

  function render(props) {
    confirmDialogProps.props = props;
    return new Vue({
      el: el,
      data: function data() {
        return { confirmDialogProps: confirmDialogProps };
      },
      render: function render() {
        var h = arguments[0];

        // 先解构，避免报错，原因不详
        var cdProps = _extends({}, this.confirmDialogProps);
        return h(ConfirmDialog, cdProps);
      }
    });
  }

  confirmDialogInstance = render(currentConfig);

  return {
    destroy: close,
    update: update
  };
}