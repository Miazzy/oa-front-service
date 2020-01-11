var traverseFileTree = function traverseFileTree(files, callback, isAccepted) {
  var _traverseFileTree = function _traverseFileTree(item, path) {
    path = path || '';
    if (item.isFile) {
      item.file(function (file) {
        if (isAccepted(file)) {
          callback([file]);
        }
      });
    } else if (item.isDirectory) {
      var dirReader = item.createReader();

      dirReader.readEntries(function (entries) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entrieItem = _step.value;

            _traverseFileTree(entrieItem, '' + path + item.name + '/');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  };
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var file = _step2.value;

      _traverseFileTree(file.webkitGetAsEntry());
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
};

export default traverseFileTree;