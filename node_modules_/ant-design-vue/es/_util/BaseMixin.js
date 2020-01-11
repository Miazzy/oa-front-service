import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
export default {
  // directives: {
  //   ref: {
  //     bind: function (el, binding, vnode) {
  //       binding.value(vnode.componentInstance ? vnode.componentInstance : vnode.elm)
  //     },
  //     update: function (el, binding, vnode) {
  //       binding.value(vnode.componentInstance ? vnode.componentInstance : vnode.elm)
  //     },
  //     unbind: function (el, binding, vnode) {
  //       binding.value(null)
  //     },
  //   },
  // },
  methods: {
    setState: function setState(state, callback) {
      var newState = typeof state === 'function' ? state(this.$data, this.$props) : state;
      // if (this.getDerivedStateFromProps) {
      //   Object.assign(newState, this.getDerivedStateFromProps(getOptionProps(this), { ...this.$data, ...newState }, true) || {})
      // }
      _extends(this.$data, newState);
      this.$nextTick(function () {
        callback && callback();
      });
    },
    __emit: function __emit() {
      // 直接调用listeners，底层组件不需要vueTool记录events
      var args = [].slice.call(arguments, 0);
      var filterEvent = [];
      var eventName = args[0];
      if (args.length && this.$listeners[eventName]) {
        if (filterEvent.includes(eventName)) {
          this.$emit.apply(this, [eventName].concat(_toConsumableArray(args.slice(1))));
        } else {
          var _$listeners;

          (_$listeners = this.$listeners)[eventName].apply(_$listeners, _toConsumableArray(args.slice(1)));
        }
      }
    }
  }
};