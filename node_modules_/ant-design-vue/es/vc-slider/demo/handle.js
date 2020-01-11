import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import Slider from '../index';
import Tooltip from '../../vc-tooltip';
import '../assets/index.less';
import '../../vc-tooltip/assets/bootstrap.less';

var Handle = Slider.Handle;
var createSliderWithTooltip = Slider.createSliderWithTooltip;

var Range = createSliderWithTooltip(Slider.Range);

export default {
  data: function data() {
    return {
      visibles: []
    };
  },

  methods: {
    handleTooltipVisibleChange: function handleTooltipVisibleChange(index, visible) {
      this.visibles[index] = visible;
      this.visibles = _extends({}, this.visibles);
    }
  },
  render: function render() {
    var h = arguments[0];

    var handle = function handle(props) {
      var value = props.value,
          dragging = props.dragging,
          index = props.index,
          ref = props.ref,
          style = props.style,
          restProps = _objectWithoutProperties(props, ['value', 'dragging', 'index', 'ref', 'style']);

      var handleProps = {
        props: _extends({}, restProps, {
          value: value
        }),
        key: index,
        style: style,
        ref: ref
      };
      return h(
        Tooltip,
        {
          attrs: {
            prefixCls: 'rc-slider-tooltip',
            overlay: value,
            visible: dragging,
            placement: 'top'
          },
          key: index
        },
        [h(Handle, handleProps)]
      );
    };

    // const handleRange = (h, { value, ref, dragging, index, disabled, style, ...restProps }) => {
    //   const tipFormatter = value => `${value}%`
    //   const tipProps = {}

    //   const {
    //     prefixCls = 'rc-slider-tooltip',
    //     overlay = tipFormatter(value),
    //     placement = 'top',
    //     visible = visible || false,
    //     ...restTooltipProps } = tipProps

    //   let handleStyleWithIndex
    //   if (Array.isArray(style)) {
    //     handleStyleWithIndex = style[index] || style[0]
    //   } else {
    //     handleStyleWithIndex = style
    //   }

    //   const tooltipProps = {
    //     props: {
    //       prefixCls,
    //       overlay,
    //       placement,
    //       visible: (!disabled && (this.visibles[index] || dragging)) || visible,
    //       ...restTooltipProps,
    //     },
    //     key: index,
    //   }
    //   const handleProps = {
    //     props: {
    //       value,
    //       ...restProps,
    //     },
    //     on: {
    //       mouseenter: () => this.handleTooltipVisibleChange(index, true),
    //       mouseleave: () => this.handleTooltipVisibleChange(index, false),
    //     },
    //     style: {
    //       ...handleStyleWithIndex,
    //     },
    //     ref,
    //   }

    //   return (
    //     <Tooltip
    //       {...tooltipProps}
    //     >

    //       <Handle
    //         {...handleProps}
    //       />
    //     </Tooltip>
    //   )
    // }
    var wrapperStyle = 'width: 400px; margin: 50px';

    return h('div', [h(
      'div',
      { style: wrapperStyle },
      [h('p', ['Slider with custom handle']), h(Slider, {
        attrs: { min: 0, max: 20, defaultValue: 3, handle: handle }
      })]
    ), h(
      'div',
      { style: wrapperStyle },
      [h('p', ['Range with custom handle']), h(Range, {
        attrs: { min: 0, max: 20, defaultValue: [3, 10], tipFormatter: function tipFormatter(value) {
            return value + '%';
          } }
      })]
    )]);
  }
};