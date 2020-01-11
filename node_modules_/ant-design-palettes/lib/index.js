'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetPrimaryColors = exports.presetPalettes = exports.generate = undefined;

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1890FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};

var presetPalettes = {};

Object.keys(presetPrimaryColors).forEach(function (key) {
  presetPalettes[key] = (0, _generate2.default)(presetPrimaryColors[key]);
});

exports.generate = _generate2.default;
exports.presetPalettes = presetPalettes;
exports.presetPrimaryColors = presetPrimaryColors;