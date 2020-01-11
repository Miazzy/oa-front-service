import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import PropTypes from '../_util/vue-types';
import { getComponentFromProp } from '../_util/props-util';

export default {
  name: 'ACardMeta',
  props: {
    prefixCls: PropTypes.string.def('ant-card'),
    title: PropTypes.any,
    description: PropTypes.any
  },
  render: function render() {
    var h = arguments[0];
    var _$props$prefixCls = this.$props.prefixCls,
        prefixCls = _$props$prefixCls === undefined ? 'ant-card' : _$props$prefixCls;

    var classString = _defineProperty({}, prefixCls + '-meta', true);

    var avatar = getComponentFromProp(this, 'avatar');
    var title = getComponentFromProp(this, 'title');
    var description = getComponentFromProp(this, 'description');

    var avatarDom = avatar ? h(
      'div',
      { 'class': prefixCls + '-meta-avatar' },
      [avatar]
    ) : null;
    var titleDom = title ? h(
      'div',
      { 'class': prefixCls + '-meta-title' },
      [title]
    ) : null;
    var descriptionDom = description ? h(
      'div',
      { 'class': prefixCls + '-meta-description' },
      [description]
    ) : null;
    var MetaDetail = titleDom || descriptionDom ? h(
      'div',
      { 'class': prefixCls + '-meta-detail' },
      [titleDom, descriptionDom]
    ) : null;
    return h(
      'div',
      _mergeJSXProps([{ on: this.$listeners }, { 'class': classString }]),
      [avatarDom, MetaDetail]
    );
  }
};