"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC1iYXNlLmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiX2RlZmF1bHRzIiwiZm9yRWFjaCIsImZuIiwicHJvdG90eXBlIiwiYXJncyIsInB1c2giLCJfc2V0RGVmYXVsdHMiLCJyZXEiLCJkZWYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBU0EsS0FBVCxHQUFpQjtBQUNmLE9BQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDRDs7QUFFRCxDQUNFLEtBREYsRUFFRSxJQUZGLEVBR0UsTUFIRixFQUlFLEtBSkYsRUFLRSxPQUxGLEVBTUUsTUFORixFQU9FLFFBUEYsRUFRRSxNQVJGLEVBU0UsaUJBVEYsRUFVRSxXQVZGLEVBV0UsT0FYRixFQVlFLElBWkYsRUFhRSxXQWJGLEVBY0UsU0FkRixFQWVFLFFBZkYsRUFnQkUsV0FoQkYsRUFpQkUsT0FqQkYsRUFrQkUsSUFsQkYsRUFtQkUsS0FuQkYsRUFvQkUsS0FwQkYsRUFxQkUsTUFyQkYsRUFzQkUsaUJBdEJGLEVBdUJFQyxPQXZCRixDQXVCVSxVQUFBQyxFQUFFLEVBQUk7QUFDZDtBQUNBSCxFQUFBQSxLQUFLLENBQUNJLFNBQU4sQ0FBZ0JELEVBQWhCLElBQXNCLFlBQWtCO0FBQUEsc0NBQU5FLElBQU07QUFBTkEsTUFBQUEsSUFBTTtBQUFBOztBQUN0QyxTQUFLSixTQUFMLENBQWVLLElBQWYsQ0FBb0I7QUFBRUgsTUFBQUEsRUFBRSxFQUFGQSxFQUFGO0FBQU1FLE1BQUFBLElBQUksRUFBSkE7QUFBTixLQUFwQjs7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEO0FBSUQsQ0E3QkQ7O0FBK0JBTCxLQUFLLENBQUNJLFNBQU4sQ0FBZ0JHLFlBQWhCLEdBQStCLFVBQVNDLEdBQVQsRUFBYztBQUMzQyxPQUFLUCxTQUFMLENBQWVDLE9BQWYsQ0FBdUIsVUFBQU8sR0FBRyxFQUFJO0FBQzVCRCxJQUFBQSxHQUFHLENBQUNDLEdBQUcsQ0FBQ04sRUFBTCxDQUFILE9BQUFLLEdBQUcscUJBQVlDLEdBQUcsQ0FBQ0osSUFBaEIsRUFBSDtBQUNELEdBRkQ7QUFHRCxDQUpEOztBQU1BSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLEtBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gQWdlbnQoKSB7XG4gIHRoaXMuX2RlZmF1bHRzID0gW107XG59XG5cbltcbiAgJ3VzZScsXG4gICdvbicsXG4gICdvbmNlJyxcbiAgJ3NldCcsXG4gICdxdWVyeScsXG4gICd0eXBlJyxcbiAgJ2FjY2VwdCcsXG4gICdhdXRoJyxcbiAgJ3dpdGhDcmVkZW50aWFscycsXG4gICdzb3J0UXVlcnknLFxuICAncmV0cnknLFxuICAnb2snLFxuICAncmVkaXJlY3RzJyxcbiAgJ3RpbWVvdXQnLFxuICAnYnVmZmVyJyxcbiAgJ3NlcmlhbGl6ZScsXG4gICdwYXJzZScsXG4gICdjYScsXG4gICdrZXknLFxuICAncGZ4JyxcbiAgJ2NlcnQnLFxuICAnZGlzYWJsZVRMU0NlcnRzJ1xuXS5mb3JFYWNoKGZuID0+IHtcbiAgLy8gRGVmYXVsdCBzZXR0aW5nIGZvciBhbGwgcmVxdWVzdHMgZnJvbSB0aGlzIGFnZW50XG4gIEFnZW50LnByb3RvdHlwZVtmbl0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgdGhpcy5fZGVmYXVsdHMucHVzaCh7IGZuLCBhcmdzIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5fc2V0RGVmYXVsdHMgPSBmdW5jdGlvbihyZXEpIHtcbiAgdGhpcy5fZGVmYXVsdHMuZm9yRWFjaChkZWYgPT4ge1xuICAgIHJlcVtkZWYuZm5dKC4uLmRlZi5hcmdzKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl19