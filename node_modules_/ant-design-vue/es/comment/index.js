import _mergeJSXProps from 'babel-helper-vue-jsx-merge-props';
import PropsTypes from '../_util/vue-types';
import { initDefaultProps, getComponentFromProp } from '../_util/props-util';

export var CommentProps = {
  actions: PropsTypes.array,
  /** The element to display as the comment author. */
  author: PropsTypes.any,
  /** The element to display as the comment avatar - generally an antd Avatar */
  avatar: PropsTypes.any,
  /** The main content of the comment */
  content: PropsTypes.any,
  /** Comment prefix defaults to '.ant-comment' */
  prefixCls: PropsTypes.string,
  /** A datetime element containing the time to be displayed */
  datetime: PropsTypes.any
};

var Comment = {
  name: 'AComment',
  props: initDefaultProps(CommentProps, {
    prefixCls: 'ant-comment'
  }),
  methods: {
    getAction: function getAction(actions) {
      var h = this.$createElement;

      if (!actions || !actions.length) {
        return null;
      }
      var actionList = actions.map(function (action, index) {
        return h(
          'li',
          { key: 'action-' + index },
          [action]
        );
      });
      return actionList;
    },
    renderNested: function renderNested(children) {
      var h = this.$createElement;
      var prefixCls = this.$props.prefixCls;


      return h(
        'div',
        { 'class': prefixCls + '-nested' },
        [children]
      );
    }
  },

  render: function render() {
    var h = arguments[0];
    var prefixCls = this.$props.prefixCls;


    var actions = getComponentFromProp(this, 'actions');
    var author = getComponentFromProp(this, 'author');
    var avatar = getComponentFromProp(this, 'avatar');
    var content = getComponentFromProp(this, 'content');
    var datetime = getComponentFromProp(this, 'datetime');

    var avatarDom = h(
      'div',
      { 'class': prefixCls + '-avatar' },
      [typeof avatar === 'string' ? h('img', {
        attrs: { src: avatar }
      }) : avatar]
    );

    var actionDom = actions && actions.length ? h(
      'ul',
      { 'class': prefixCls + '-actions' },
      [this.getAction(actions)]
    ) : null;

    var authorContent = h(
      'div',
      { 'class': prefixCls + '-content-author' },
      [author && h(
        'span',
        { 'class': prefixCls + '-content-author-name' },
        [author]
      ), datetime && h(
        'span',
        { 'class': prefixCls + '-content-author-time' },
        [datetime]
      )]
    );

    var contentDom = h(
      'div',
      { 'class': prefixCls + '-content' },
      [authorContent, h(
        'div',
        { 'class': prefixCls + '-content-detail' },
        [content]
      ), actionDom]
    );

    var comment = h(
      'div',
      { 'class': prefixCls + '-inner' },
      [avatarDom, contentDom]
    );
    var children = this.$slots['default'];
    return h(
      'div',
      _mergeJSXProps([{ 'class': prefixCls }, { on: this.$listeners }]),
      [comment, children ? this.renderNested(children) : null]
    );
  }
};

/* istanbul ignore next */
Comment.install = function (Vue) {
  Vue.component(Comment.name, Comment);
};
export default Comment;