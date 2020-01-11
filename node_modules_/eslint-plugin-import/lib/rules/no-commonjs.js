'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EXPORT_MESSAGE = 'Expected "export" or "export default"',
      IMPORT_MESSAGE = 'Expected "import" instead of "require()"'; /**
                                                                    * @fileoverview Rule to prefer ES6 to CJS
                                                                    * @author Jamund Ferguson
                                                                    */

function normalizeLegacyOptions(options) {
  if (options.indexOf('allow-primitive-modules') >= 0) {
    return { allowPrimitiveModules: true };
  }
  return options[0] || {};
}

function allowPrimitive(node, options) {
  if (!options.allowPrimitiveModules) return false;
  if (node.parent.type !== 'AssignmentExpression') return false;
  return node.parent.right.type !== 'ObjectExpression';
}

function allowRequire(node, options) {
  return options.allowRequire;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const schemaString = { enum: ['allow-primitive-modules'] };
const schemaObject = {
  type: 'object',
  properties: {
    allowPrimitiveModules: { 'type': 'boolean' },
    allowRequire: { 'type': 'boolean' }
  },
  additionalProperties: false
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-commonjs')
    },

    schema: {
      anyOf: [{
        type: 'array',
        items: [schemaString],
        additionalItems: false
      }, {
        type: 'array',
        items: [schemaObject],
        additionalItems: false
      }]
    }
  },

  create: function (context) {
    const options = normalizeLegacyOptions(context.options);

    return {

      'MemberExpression': function (node) {

        // module.exports
        if (node.object.name === 'module' && node.property.name === 'exports') {
          if (allowPrimitive(node, options)) return;
          context.report({ node, message: EXPORT_MESSAGE });
        }

        // exports.
        if (node.object.name === 'exports') {
          const isInScope = context.getScope().variables.some(variable => variable.name === 'exports');
          if (!isInScope) {
            context.report({ node, message: EXPORT_MESSAGE });
          }
        }
      },
      'CallExpression': function (call) {
        if (context.getScope().type !== 'module') return;
        if (call.parent.type !== 'ExpressionStatement' && call.parent.type !== 'VariableDeclarator' && call.parent.type !== 'AssignmentExpression') return;

        if (call.callee.type !== 'Identifier') return;
        if (call.callee.name !== 'require') return;

        if (call.arguments.length !== 1) return;
        var module = call.arguments[0];

        if (module.type !== 'Literal') return;
        if (typeof module.value !== 'string') return;

        if (allowRequire(call, options)) return;

        // keeping it simple: all 1-string-arg `require` calls are reported
        context.report({
          node: call.callee,
          message: IMPORT_MESSAGE
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLWNvbW1vbmpzLmpzIl0sIm5hbWVzIjpbIkVYUE9SVF9NRVNTQUdFIiwiSU1QT1JUX01FU1NBR0UiLCJub3JtYWxpemVMZWdhY3lPcHRpb25zIiwib3B0aW9ucyIsImluZGV4T2YiLCJhbGxvd1ByaW1pdGl2ZU1vZHVsZXMiLCJhbGxvd1ByaW1pdGl2ZSIsIm5vZGUiLCJwYXJlbnQiLCJ0eXBlIiwicmlnaHQiLCJhbGxvd1JlcXVpcmUiLCJzY2hlbWFTdHJpbmciLCJlbnVtIiwic2NoZW1hT2JqZWN0IiwicHJvcGVydGllcyIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJkb2NzIiwidXJsIiwic2NoZW1hIiwiYW55T2YiLCJpdGVtcyIsImFkZGl0aW9uYWxJdGVtcyIsImNyZWF0ZSIsImNvbnRleHQiLCJvYmplY3QiLCJuYW1lIiwicHJvcGVydHkiLCJyZXBvcnQiLCJtZXNzYWdlIiwiaXNJblNjb3BlIiwiZ2V0U2NvcGUiLCJ2YXJpYWJsZXMiLCJzb21lIiwidmFyaWFibGUiLCJjYWxsIiwiY2FsbGVlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7OztBQUVBLE1BQU1BLGlCQUFpQix1Q0FBdkI7QUFBQSxNQUNNQyxpQkFBaUIsMENBRHZCLEMsQ0FQQTs7Ozs7QUFVQSxTQUFTQyxzQkFBVCxDQUFnQ0MsT0FBaEMsRUFBeUM7QUFDdkMsTUFBSUEsUUFBUUMsT0FBUixDQUFnQix5QkFBaEIsS0FBOEMsQ0FBbEQsRUFBcUQ7QUFDbkQsV0FBTyxFQUFFQyx1QkFBdUIsSUFBekIsRUFBUDtBQUNEO0FBQ0QsU0FBT0YsUUFBUSxDQUFSLEtBQWMsRUFBckI7QUFDRDs7QUFFRCxTQUFTRyxjQUFULENBQXdCQyxJQUF4QixFQUE4QkosT0FBOUIsRUFBdUM7QUFDckMsTUFBSSxDQUFDQSxRQUFRRSxxQkFBYixFQUFvQyxPQUFPLEtBQVA7QUFDcEMsTUFBSUUs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QUkvQixhQUFhMkIsSUFBYixFQUFtQm5DLE9BQW5CLENBQUosRUFBaUM7O0FBRWpDO0FBQ0F3QixnQkFBUUksTUFBUixDQUFlO0FBQ2J4QixnQkFBTStCLEtBQUtDLE1BREU7QUFFYlAsbUJBQVMvQjtBQUZJLFNBQWY7QUFJRDtBQTdDSSxLQUFQO0FBZ0REO0FBMUVjLENBQWpCIiwiZmlsZSI6InJ1bGVzL25vLWNvbW1vbmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gcHJlZmVyIEVTNiB0byBDSlNcbiAqIEBhdXRob3IgSmFtdW5kIEZlcmd1c29uXG4gKi9cblxuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuY29uc3QgRVhQT1JUX01FU1NBR0UgPSAnRXhwZWN0ZWQgXCJleHBvcnRcIiBvciBcImV4cG9ydCBkZWZhdWx0XCInXG4gICAgLCBJTVBPUlRfTUVTU0FHRSA9ICdFeHBlY3RlZCBcImltcG9ydFwiIGluc3RlYWQgb2YgXCJyZXF1aXJlKClcIidcblxuZnVuY3Rpb24gbm9ybWFsaXplTGVnYWN5T3B0aW9ucyhvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLmluZGV4T2YoJ2FsbG93LXByaW1pdGl2ZS1tb2R1bGVzJykgPj0gMCkge1xuICAgIHJldHVybiB7IGFsbG93UHJpbWl0aXZlTW9kdWxlczogdHJ1ZSB9XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNbMF0gfHwge31cbn1cblxuZnVuY3Rpb24gYWxsb3dQcmltaXRpdmUobm9kZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMuYWxsb3dQcmltaXRpdmVNb2R1bGVzKSByZXR1cm4gZmFsc2VcbiAgaWYgKG5vZGUucGFyZW50LnR5cGUgIT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHJldHVybiBmYWxzZVxuICByZXR1cm4gKG5vZGUucGFyZW50LnJpZ2h0LnR5cGUgIT09ICdPYmplY3RFeHByZXNzaW9uJylcbn1cblxuZnVuY3Rpb24gYWxsb3dSZXF1aXJlKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuYWxsb3dSZXF1aXJlXG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSdWxlIERlZmluaXRpb25cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHNjaGVtYVN0cmluZyA9IHsgZW51bTogWydhbGxvdy1wcmltaXRpdmUtbW9kdWxlcyddIH1cbmNvbnN0IHNjaGVtYU9iamVjdCA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICBhbGxvd1ByaW1pdGl2ZU1vZHVsZXM6IHsgJ3R5cGUnOiAnYm9vbGVhbicgfSxcbiAgICBhbGxvd1JlcXVpcmU6IHsgJ3R5cGUnOiAnYm9vbGVhbicgfSxcbiAgfSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLWNvbW1vbmpzJyksXG4gICAgfSxcblxuICAgIHNjaGVtYToge1xuICAgICAgYW55T2Y6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IFtzY2hlbWFTdHJpbmddLFxuICAgICAgICAgIGFkZGl0aW9uYWxJdGVtczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbc2NoZW1hT2JqZWN0XSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBvcHRpb25zID0gbm9ybWFsaXplTGVnYWN5T3B0aW9ucyhjb250ZXh0Lm9wdGlvbnMpXG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAnTWVtYmVyRXhwcmVzc2lvbic6IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgICAgICAgLy8gbW9kdWxlLmV4cG9ydHNcbiAgICAgICAgaWYgKG5vZGUub2JqZWN0Lm5hbWUgPT09ICdtb2R1bGUnICYmIG5vZGUucHJvcGVydHkubmFtZSA9PT0gJ2V4cG9ydHMnKSB7XG4gICAgICAgICAgaWYgKGFsbG93UHJpbWl0aXZlKG5vZGUsIG9wdGlvbnMpKSByZXR1cm5cbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7IG5vZGUsIG1lc3NhZ2U6IEVYUE9SVF9NRVNTQUdFIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBleHBvcnRzLlxuICAgICAgICBpZiAobm9kZS5vYmplY3QubmFtZSA9PT0gJ2V4cG9ydHMnKSB7XG4gICAgICAgICAgY29uc3QgaXNJblNjb3BlID0gY29udGV4dC5nZXRTY29wZSgpXG4gICAgICAgICAgICAudmFyaWFibGVzXG4gICAgICAgICAgICAuc29tZSh2YXJpYWJsZSA9PiB2YXJpYWJsZS5uYW1lID09PSAnZXhwb3J0cycpXG4gICAgICAgICAgaWYgKCEgaXNJblNjb3BlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7IG5vZGUsIG1lc3NhZ2U6IEVYUE9SVF9NRVNTQUdFIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0sXG4gICAgICAnQ2FsbEV4cHJlc3Npb24nOiBmdW5jdGlvbiAoY2FsbCkge1xuICAgICAgICBpZiAoY29udGV4dC5nZXRTY29wZSgpLnR5cGUgIT09ICdtb2R1bGUnKSByZXR1cm5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNhbGwucGFyZW50LnR5cGUgIT09ICdFeHByZXNzaW9uU3RhdGVtZW50J1xuICAgICAgICAgICYmIGNhbGwucGFyZW50LnR5cGUgIT09ICdWYXJpYWJsZURlY2xhcmF0b3InXG4gICAgICAgICAgJiYgY2FsbC5wYXJlbnQudHlwZSAhPT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJ1xuICAgICAgICApIHJldHVyblxuXG4gICAgICAgIGlmIChjYWxsLmNhbGxlZS50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgICBpZiAoY2FsbC5jYWxsZWUubmFtZSAhPT0gJ3JlcXVpcmUnKSByZXR1cm5cblxuICAgICAgICBpZiAoY2FsbC5hcmd1bWVudHMubGVuZ3RoICE9PSAxKSByZXR1cm5cbiAgICAgICAgdmFyIG1vZHVsZSA9IGNhbGwuYXJndW1lbnRzWzBdXG5cbiAgICAgICAgaWYgKG1vZHVsZS50eXBlICE9PSAnTGl0ZXJhbCcpIHJldHVyblxuICAgICAgICBpZiAodHlwZW9mIG1vZHVsZS52YWx1ZSAhPT0gJ3N0cmluZycpIHJldHVyblxuXG4gICAgICAgIGlmIChhbGxvd1JlcXVpcmUoY2FsbCwgb3B0aW9ucykpIHJldHVyblxuXG4gICAgICAgIC8vIGtlZXBpbmcgaXQgc2ltcGxlOiBhbGwgMS1zdHJpbmctYXJnIGByZXF1aXJlYCBjYWxscyBhcmUgcmVwb3J0ZWRcbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGU6IGNhbGwuY2FsbGVlLFxuICAgICAgICAgIG1lc3NhZ2U6IElNUE9SVF9NRVNTQUdFLFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgfSxcbn1cbiJdfQ==