'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: (0, _docsUrl2.default)('named')
    }
  },

  create: function (context) {
    function checkSpecifiers(key, type, node) {
      // ignore local exports and type imports/exports
      if (node.source == null || node.importKind === 'type' || node.importKind === 'typeof' || node.exportKind === 'type') {
        return;
      }

      if (!node.specifiers.some(function (im) {
        return im.type === type;
      })) {
        return; // no named imports/exports
      }

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        if (im.type !== type) return;

        // ignore type imports
        if (im.importKind === 'type' || im.importKind === 'typeof') return;

        const deepLookup = imports.hasDeep(im[key].name);

        if (!deepLookup.found) {
          if (deepLookup.path.length > 1) {
            const deepPath = deepLookup.path.map(i => path.relative(path.dirname(context.getFilename()), i.path)).join(' -> ');

            context.report(im[key], `${im[key].name} not found via ${deepPath}`);
          } else {
            context.report(im[key], im[key].name + ' not found in \'' + node.source.value + '\'');
          }
        }
      });
    }

    return {
      'ImportDeclaration': checkSpecifiers.bind(null, 'imported', 'ImportSpecifier'),

      'ExportNamedDeclaration': checkSpecifiers.bind(null, 'local', 'ExportSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25hbWVkLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsInR5cGUiLCJkb2NzIiwidXJsIiwiY3JlYXRlIiwiY29udGV4dCIsImNoZWNrU3BlY2lmaWVycyIsImtleSIsIm5vZGUiLCJzb3VyY2UiLCJpbXBvcnRLaW5kIiwiZXhwb3J0S2luZCIsInNwZWNpZmllcnMiLCJzb21lIiwiaW0iLCJpbXBvcnRzIiwiRXhwb3J0cyIsImdldCIsInZhbHVlIiwiZXJyb3JzIiwibGVuZ3RoIiwicmVwb3J0RXJyb3JzIiwiZm9yRWFjaCIsImRlZXBMb29rdXAiLCJoYXNEZWVwIiwibmFtZSIsImZvdW5kIiwiZGVlcFBhdGgiLCJtYXAiLCJpIiwicmVsYXRpdmUiLCJkaXJuYW1lIiwiZ2V0RmlsZW5hbWUiLCJqb2luIiwicmVwb3J0IiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7SUFBWUEsSTs7QUFDWjs7OztBQUNBOzs7Ozs7OztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkMsVUFBTSxTQURGO0FBRUpDLFVBQU07QUFDSkMsV0FBSyx1QkFBUSxPQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsYUFBU0MsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEJOLElBQTlCLEVBQW9DTyxJQUFwQyxFQUEwQztBQUN4QztBQUNBLFVBQUlBLEtBQUtDLE1BQUwsSUFBZSxJQUFmLElBQXVCRCxLQUFLRSxVQUFMLEtBQW9CLE1BQTNDLElBQ0FGLEtBQUtFLFVBQUwsS0FBb0IsUUFEcEIsSUFDaUNGLEtBQUtHLFVBQUwsS0FBb0IsTUFEekQsRUFDaUU7QUFDL0Q7QUFDRDs7QUFFRCxVQUFJLENBQUNILEtBQUtJLFVBQUwsQ0FDRUMsSUFERixDQUNPLFVBQVVDLEVBQVYsRUFBYztBQUFFLGVBQU9BLEdBQUdiLElBQUgsS0FBWUEsSUFBbkI7QUFBeUIsT0FEaEQsQ0FBTCxFQUN3RDtBQUN0RCxlQURzRCxDQUMvQztBQUNSOztBQUVELFlBQU1jLFVBQVVDLG9CQUFRQyxHQUFSLENBQVlULEtBQUtDLE1BQUwsQ0FBWVMsS0FBeEIsRUFBK0JiLE9BQS9CLENBQWhCO0FBQ0EsVUFBSVUsV0FBVyxJQUFmLEVBQXFCOztBQUVyQixVQUFJQSxRQUFRSSxNQUFSLENBQWVDLE1BQW5CLEVBQTJCO0FBQ3pCTCxnQkFBUU0sWUFBUixDQUFxQmhCLE9BQXJCLEVBQThCRyxJQUE5QjtBQUNBO0FBQ0Q7O0FBRURBLFdBQUtJLFVBQUwsQ0FBZ0JVLE9BQWhCLENBQXdCLFVBQVVSLEVBQVYsRUFBYztBQUNwQyxZQUFJQSxHQUFHYixJQUFILEtBQVlBLElBQWhCLEVBQXNCOztBQUV0QjtBQUNBLFlBQUlhLEdBQUdKLFVBQUgsS0FBa0IsTUFBbEIsSUFBNEJJLEdBQUdKLFVBQUgsS0FBa0IsUUFBbEQsRUFBNEQ7O0FBRTVELGNBQU1hLGFBQWFSLFFBQVFTLE9BQVIsQ0FBZ0JWLEdBQUdQLEdBQUgsRUFBUWtCLElBQXhCLENBQW5COztBQUVBLFlBQUksQ0FBQ0YsV0FBV0csS0FBaEIsRUFBdUI7QUFDckIsY0FBSUgsV0FBVzFCLElBQVgsQ0FBZ0J1QixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QixrQkFBTU8sV0FBV0osV0FBVzFCLElBQVgsQ0FDZCtCLEdBRGMsQ0FDVkMsS0FBS2hDLEtBQUtpQyxRQUFMLENBQWNqQyxLQUFLa0MsT0FBTCxDQUFhMUIsUUFBUTJCLFdBQVIsRUFBYixDQUFkLEVBQW1ESCxFQUFFaEMsSUFBckQsQ0FESyxFQUVkb0MsSUFGYyxDQUVULE1BRlMsQ0FBakI7O0FBSUE1QixvQkFBUTZCLE1BQVIsQ0FBZXBCLEdBQUdQLEdBQUgsQ0FBZixFQUNHLEdBQUVPLEdBQUdQLEdBQUgsRUFBUWtCLElBQUssa0JBQWlCRSxRQUFTLEVBRDVDO0FBRUQsV0FQRCxNQU9PO0FBQ0x0QixvQkFBUTZCLE1BQVIsQ0FBZXBCLEdBQUdQLEdBQUgsQ0FBZixFQUNFTyxHQUFHUCxHQUFILEVBQVFrQixJQUFSLEdBQWUsa0JBQWYsR0FBb0NqQixLQUFLQyxNQUFMLENBQVlTLEtBQWhELEdBQXdELElBRDFEO0FBRUQ7QUFDRjtBQUNGLE9BckJEO0FBc0JEOztBQUVELFdBQU87QUFDTCwyQkFBcUJaLGdCQUFnQjZCLElBQWhCLENBQXNCLElBQXRCLEVBQ3NCLFVBRHRCLEVBRXNCLGlCQUZ0QixDQURoQjs7QUFNTCxnQ0FBMEI3QixnQkFBZ0I2QixJQUFoQixDQUFzQixJQUF0QixFQUNzQixPQUR0QixFQUVzQixpQkFGdEI7QUFOckIsS0FBUDtBQVlEO0FBakVjLENBQWpCIiwiZmlsZSI6InJ1bGVzL25hbWVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAncHJvYmxlbScsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduYW1lZCcpLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGZ1bmN0aW9uIGNoZWNrU3BlY2lmaWVycyhrZXksIHR5cGUsIG5vZGUpIHtcbiAgICAgIC8vIGlnbm9yZSBsb2NhbCBleHBvcnRzIGFuZCB0eXBlIGltcG9ydHMvZXhwb3J0c1xuICAgICAgaWYgKG5vZGUuc291cmNlID09IG51bGwgfHwgbm9kZS5pbXBvcnRLaW5kID09PSAndHlwZScgfHxcbiAgICAgICAgICBub2RlLmltcG9ydEtpbmQgPT09ICd0eXBlb2YnICB8fCBub2RlLmV4cG9ydEtpbmQgPT09ICd0eXBlJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFub2RlLnNwZWNpZmllcnNcbiAgICAgICAgICAgIC5zb21lKGZ1bmN0aW9uIChpbSkgeyByZXR1cm4gaW0udHlwZSA9PT0gdHlwZSB9KSkge1xuICAgICAgICByZXR1cm4gLy8gbm8gbmFtZWQgaW1wb3J0cy9leHBvcnRzXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGltcG9ydHMgPSBFeHBvcnRzLmdldChub2RlLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGltcG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIG5vZGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBub2RlLnNwZWNpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAoaW0pIHtcbiAgICAgICAgaWYgKGltLnR5cGUgIT09IHR5cGUpIHJldHVyblxuXG4gICAgICAgIC8vIGlnbm9yZSB0eXBlIGltcG9ydHNcbiAgICAgICAgaWYgKGltLmltcG9ydEtpbmQgPT09ICd0eXBlJyB8fCBpbS5pbXBvcnRLaW5kID09PSAndHlwZW9mJykgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgZGVlcExvb2t1cCA9IGltcG9ydHMuaGFzRGVlcChpbVtrZXldLm5hbWUpXG5cbiAgICAgICAgaWYgKCFkZWVwTG9va3VwLmZvdW5kKSB7XG4gICAgICAgICAgaWYgKGRlZXBMb29rdXAucGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGRlZXBMb29rdXAucGF0aFxuICAgICAgICAgICAgICAubWFwKGkgPT4gcGF0aC5yZWxhdGl2ZShwYXRoLmRpcm5hbWUoY29udGV4dC5nZXRGaWxlbmFtZSgpKSwgaS5wYXRoKSlcbiAgICAgICAgICAgICAgLmpvaW4oJyAtPiAnKVxuXG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydChpbVtrZXldLFxuICAgICAgICAgICAgICBgJHtpbVtrZXldLm5hbWV9IG5vdCBmb3VuZCB2aWEgJHtkZWVwUGF0aH1gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydChpbVtrZXldLFxuICAgICAgICAgICAgICBpbVtrZXldLm5hbWUgKyAnIG5vdCBmb3VuZCBpbiBcXCcnICsgbm9kZS5zb3VyY2UudmFsdWUgKyAnXFwnJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdJbXBvcnREZWNsYXJhdGlvbic6IGNoZWNrU3BlY2lmaWVycy5iaW5kKCBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgJ2ltcG9ydGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdJbXBvcnRTcGVjaWZpZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG5cbiAgICAgICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJzogY2hlY2tTcGVjaWZpZXJzLmJpbmQoIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdsb2NhbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdFeHBvcnRTcGVjaWZpZXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICB9XG5cbiAgfSxcbn1cbiJdfQ==