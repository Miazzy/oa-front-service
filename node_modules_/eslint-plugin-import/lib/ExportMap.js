'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursivePatternCapture = recursivePatternCapture;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _doctrine = require('doctrine');

var _doctrine2 = _interopRequireDefault(_doctrine);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _eslint = require('eslint');

var _parse = require('eslint-module-utils/parse');

var _parse2 = _interopRequireDefault(_parse);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _ignore = require('eslint-module-utils/ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _hash = require('eslint-module-utils/hash');

var _unambiguous = require('eslint-module-utils/unambiguous');

var unambiguous = _interopRequireWildcard(_unambiguous);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug2.default)('eslint-plugin-import:ExportMap');

const exportCache = new Map();

class ExportMap {
  constructor(path) {
    this.path = path;
    this.namespace = new Map();
    // todo: restructure to key on path, value is resolver + map of names
    this.reexports = new Map();
    /**
     * star-exports
     * @type {Set} of () => ExportMap
     */
    this.dependencies = new Set();
    /**
     * dependencies of this module that are not explicitly re-exported
     * @type {Map} from path = () => ExportMap
     */
    this.imports = new Map();
    this.errors = [];
  }

  get hasDefault() {
    return this.get('default') != null;
  } // stronger than this.has

  get size() {
    let size = this.namespace.size + this.reexports.size;
    this.dependencies.forEach(dep => {
      const d = dep();
      // CJS / ignored dependencies won't exist (#717)
      if (d == null) return;
      size += d.size;
    });
    return size;
  }

  /**
   * Note that this does not check explicitly re-exported names for existence
   * in the base namespace, but it will expand all `export * from '...'` exports
   * if not found in the explicit namespace.
   * @param  {string}  name
   * @return {Boolean} true if `name` is exported by this module.
   */
  has(name) {
    if (this.namespace.has(name)) return true;
    if (this.reexports.has(name)) return true;

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();

        // todo: report as unresolved?
        if (!innerMap) continue;

        if (innerMap.has(name)) return true;
      }
    }

    return false;
  }

  /**
   * ensure that imported name fully resolves.
   * @param  {[type]}  name [description]
   * @return {Boolean}      [description]
   */
  hasDeep(name) {
    if (this.namespace.has(name)) return { found: true, path: [this] };

    if (this.reexports.has(name)) {
      const reexports = this.reexports.get(name),
            imported = reexports.getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return { found: true, path: [this]

        // safeguard against cycles, only if name matches
      };if (imported.path === this.path && reexports.local === name) {
        return { found: false, path: [this] };
      }

      const deep = imported.hasDeep(reexports.local);
      deep.path.unshift(this);

      return deep;
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        let innerValue = innerMap.hasDeep(name);
        if (innerValue.found) {
          innerValue.path.unshift(this);
          return innerValue;
        }
      }
    }

    return { found: false, path: [this] };
  }

  get(name) {
    if (this.namespace.has(name)) return this.namespace.get(name);

    if (this.reexports.has(name)) {
      const reexports = this.reexports.get(name),
            imported = reexports.getImport();

      // if import is ignored, return explicit 'null'
      if (imported == null) return null;

      // safeguard against cycles, only if name matches
      if (imported.path === this.path && reexports.local === name) return undefined;

      return imported.get(reexports.local);
    }

    // default exports must be explicitly re-exported (#328)
    if (name !== 'default') {
      for (let dep of this.dependencies) {
        let innerMap = dep();
        // todo: report as unresolved?
        if (!innerMap) continue;

        // safeguard against cycles
        if (innerMap.path === this.path) continue;

        let innerValue = innerMap.get(name);
        if (innerValue !== undefined) return innerValue;
      }
    }

    return undefined;
  }

  forEach(callback, thisArg) {
    this.namespace.forEach((v, n) => callback.call(thisArg, v, n, this));

    this.reexports.forEach((reexports, name) => {
      const reexported = reexports.getImport();
      // can't look up meta for ignored re-exports (#348)
      callback.call(thisArg, reexported && reexported.get(reexports.local), name, this);
    });

    this.dependencies.forEach(dep => {
      const d = dep();
      // CJS / ignored dependencies won't exist (#717)
      if (d == null) return;

      d.forEach((v, n) => n !== 'default' && callback.call(thisArg, v, n, this));
    });
  }

  // todo: keys, values, entries?

  reportErrors(context, declaration) {
    context.report({
      node: declaration.source,
      message: `Parse errors in imported module '${declaration.source.value}': ` + `${this.errors.map(e => `${e.message} (${e.lineNumber}:${e.column})`).join(', ')}`
    });
  }
}

exports.default = ExportMap; /**
                              * parse docs from the first node that has leading comments
                              */

function captureDoc(source, docStyleParsers) {
  const metadata = {};

  // 'some' short-circuits on first 'true'

  for (var _len = arguments.length, nodes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    nodes[_key - 2] = arguments[_key];
  }

  nodes.some(n => {
    try {

      let leadingComments;

      // n.leadingComments is legacy `attachComments` behavior
      if ('leadingComments' in n) {
        leadingComments = n.leadingComments;
      } else if (n.range) {
        leadingComments = source.getCommentsBefore(n);
      }

      if (!leadingComments || leadingComments.length === 0) return false;

      for (let name in docStyleParsers) {
        const doc = docStyleParsers[name](leadingComments);
        if (doc) {
          metadata.doc = doc;
        }
      }

      return true;
    } catch (err) {
      return false;
    }
  });

  return metadata;
}

const availableDocStyleParsers = {
  jsdoc: captureJsDoc,
  tomdoc: captureTomDoc

  /**
   * parse JSDoc from leading comments
   * @param  {...[type]} comments [description]
   * @return {{doc: object}}
   */
};function captureJsDoc(comments) {
  let doc;

  // capture XSDoc
  comments.forEach(comment => {
    // skip non-block comments
    if (comment.type !== 'Block') return;
    try {
      doc = _doctrine2.default.parse(comment.value, { unwrap: true });
    } catch (err) {
      /* don't care, for now? maybe add to `errors?` */
    }
  });

  return doc;
}

/**
  * parse TomDoc section from comments
  */
function captureTomDoc(comments) {
  // collect lines up to first paragraph break
  const lines = [];
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment.value.match(/^\s*$/)) break;
    lines.push(comment.value.trim());
  }

  // return doctrine-like object
  const statusMatch = lines.join(' ').match(/^(Public|Internal|Deprecated):\s*(.+)/);
  if (statusMatch) {
    return {
      description: statusMatch[2],
      tags: [{
        title: statusMatch[1].toLowerCase(),
        description: statusMatch[2]
      }]
    };
  }
}

ExportMap.get = function (source, context) {
  const path = (0, _resolve2.default)(source, context);
  if (path == null) return null;

  return ExportMap.for(childContext(path, context));
};

ExportMap.for = function (context) {
  const path = context.path;


  const cacheKey = (0, _hash.hashObject)(context).digest('hex');
  let exportMap = exportCache.get(cacheKey);

  // return cached ignore
  if (exportMap === null) return null;

  const stats = _fs2.default.statSync(path);
  if (exportMap != null) {
    // date equality check
    if (exportMap.mtime - stats.mtime === 0) {
      return exportMap;
    }
    // future: check content equality?
  }

  // check valid extensions first
  if (!(0, _ignore.hasValidExtension)(path, context)) {
    exportCache.set(cacheKey, null);
    return null;
  }

  const content = _fs2.default.readFileSync(path, { encoding: 'utf8' });

  // check for and cache ignore
  if ((0, _ignore2.default)(path, context) || !unambiguous.test(content)) {
    log('ignored path due to unambiguous regex or ignore settings:', path);
    exportCache.set(cacheKey, null);
    return null;
  }

  log('cache miss', cacheKey, 'for path', path);
  exportMap = ExportMap.parse(path, content, context);

  // ambiguous modules return null
  if (exportMap == null) return null;

  exportMap.mtime = stats.mtime;

  exportCache.set(cacheKey, exportMap);
  return exportMap;
};

ExportMap.parse = function (path, content, context) {
  var m = new ExportMap(path);

  try {
    var ast = (0, _parse2.default)(path, content, context);
  } catch (err) {
    log('parse error:', path, err);
    m.errors.push(err);
    return m; // can't continue
  }

  if (!unambiguous.isModule(ast)) return null;

  const docstyle = context.settings && context.settings['import/docstyle'] || ['jsdoc'];
  const docStyleParsers = {};
  docstyle.forEach(style => {
    docStyleParsers[style] = availableDocStyleParsers[style];
  });

  // attempt to collect module doc
  if (ast.comments) {
    ast.comments.some(c => {
      if (c.type !== 'Block') return false;
      try {
        const doc = _doctrine2.default.parse(c.value, { unwrap: true });
        if (doc.tags.some(t => t.title === 'module')) {
          m.doc = doc;
          return true;
        }
      } catch (err) {/* ignore */}
      return false;
    });
  }

  const namespaces = new Map();

  function remotePath(value) {
    return _resolve2.default.relative(value, path, context.settings);
  }

  function resolveImport(value) {
    const rp = remotePath(value);
    if (rp == null) return null;
    return ExportMap.for(childContext(rp, context));
  }

  function getNamespace(identifier) {
    if (!namespaces.has(identifier.name)) return;

    return function () {
      return resolveImport(namespaces.get(identifier.name));
    };
  }

  function addNamespace(object, identifier) {
    const nsfn = getNamespace(identifier);
    if (nsfn) {
      Object.defineProperty(object, 'namespace', { get: nsfn });
    }

    return object;
  }

  function captureDependency(declaration) {
    if (declaration.source == null) return null;
    const importedSpecifiers = new Set();
    const supportedTypes = new Set(['ImportDefaultSpecifier', 'ImportNamespaceSpecifier']);
    if (declaration.specifiers) {
      declaration.specifiers.forEach(specifier => {
        if (supportedTypes.has(specifier.type)) {
          importedSpecifiers.add(specifier.type);
        }
        if (specifier.type === 'ImportSpecifier') {
          importedSpecifiers.add(specifier.imported.name);
        }
      });
    }

    const p = remotePath(declaration.source.value);
    if (p == null) return null;
    const existing = m.imports.get(p);
    if (existing != null) return existing.getter;

    const getter = thunkFor(p, context);
    m.imports.set(p, {
      getter,
      source: { // capturing actual node reference holds full AST in memory!
        value: declaration.source.value,
        loc: declaration.source.loc
      },
      importedSpecifiers
    });
    return getter;
  }

  const source = makeSourceCode(content, ast);

  ast.body.forEach(function (n) {

    if (n.type === 'ExportDefaultDeclaration') {
      const exportMeta = captureDoc(source, docStyleParsers, n);
      if (n.declaration.type === 'Identifier') {
        addNamespace(exportMeta, n.declaration);
      }
      m.namespace.set('default', exportMeta);
      return;
    }

    if (n.type === 'ExportAllDeclaration') {
      const getter = captureDependency(n);
      if (getter) m.dependencies.add(getter);
      return;
    }

    // capture namespaces in case of later export
    if (n.type === 'ImportDeclaration') {
      captureDependency(n);
      let ns;
      if (n.specifiers.some(s => s.type === 'ImportNamespaceSpecifier' && (ns = s))) {
        namespaces.set(ns.local.name, n.source.value);
      }
      return;
    }

    if (n.type === 'ExportNamedDeclaration') {
      // capture declaration
      if (n.declaration != null) {
        switch (n.declaration.type) {
          case 'FunctionDeclaration':
          case 'ClassDeclaration':
          case 'TypeAlias': // flowtype with babel-eslint parser
          case 'InterfaceDeclaration':
          case 'DeclareFunction':
          case 'TSDeclareFunction':
          case 'TSEnumDeclaration':
          case 'TSTypeAliasDeclaration':
          case 'TSInterfaceDeclaration':
          case 'TSAbstractClassDeclaration':
          case 'TSModuleDeclaration':
            m.namespace.set(n.declaration.id.name, captureDoc(source, docStyleParsers, n));
            break;
          case 'VariableDeclaration':
            n.declaration.declarations.forEach(d => recursivePatternCapture(d.id, id => m.namespace.set(id.name, captureDoc(source, docStyleParsers, d, n))));
            break;
        }
      }

      const nsource = n.source && n.source.value;
      n.specifiers.forEach(s => {
        const exportMeta = {};
        let local;

        switch (s.type) {
          case 'ExportDefaultSpecifier':
            if (!n.source) return;
            local = 'default';
            break;
          case 'ExportNamespaceSpecifier':
            m.namespace.set(s.exported.name, Object.defineProperty(exportMeta, 'namespace', {
              get() {
                return resolveImport(nsource);
              }
            }));
            return;
          case 'ExportSpecifier':
            if (!n.source) {
              m.namespace.set(s.exported.name, addNamespace(exportMeta, s.local));
              return;
            }
          // else falls through
          default:
            local = s.local.name;
            break;
        }

        // todo: JSDoc
        m.reexports.set(s.exported.name, { local, getImport: () => resolveImport(nsource) });
      });
    }

    // This doesn't declare anything, but changes what's being exported.
    if (n.type === 'TSExportAssignment') {
      const moduleDecl = ast.body.find(bodyNode => bodyNode.type === 'TSModuleDeclaration' && bodyNode.id.name === n.expression.name);
      if (moduleDecl && moduleDecl.body && moduleDecl.body.body) {
        moduleDecl.body.body.forEach(moduleBlockNode => {
          // Export-assignment exports all members in the namespace, explicitly exported or not.
          const exportedDecl = moduleBlockNode.type === 'ExportNamedDeclaration' ? moduleBlockNode.declaration : moduleBlockNode;

          if (exportedDecl.type === 'VariableDeclaration') {
            exportedDecl.declarations.forEach(decl => recursivePatternCapture(decl.id, id => m.namespace.set(id.name, captureDoc(source, docStyleParsers, decl, exportedDecl, moduleBlockNode))));
          } else {
            m.namespace.set(exportedDecl.id.name, captureDoc(source, docStyleParsers, moduleBlockNode));
          }
        });
      }
    }
  });

  return m;
};

/**
 * The creation of this closure is isolated from other scopes
 * to avoid over-retention of unrelated variables, which has
 * caused memory leaks. See #1266.
 */
function thunkFor(p, context) {
  return () => ExportMap.for(childContext(p, context));
}

/**
 * Traverse a pattern/identifier node, calling 'callback'
 * for each leaf identifier.
 * @param  {node}   pattern
 * @param  {Function} callback
 * @return {void}
 */
function recursivePatternCapture(pattern, callback) {
  switch (pattern.type) {
    case 'Identifier':
      // base case
      callback(pattern);
      break;

    case 'ObjectPattern':
      pattern.properties.forEach(p => {
        recursivePatternCapture(p.value, callback);
      });
      break;

    case 'ArrayPattern':
      pattern.elements.forEach(element => {
        if (element == null) return;
        recursivePatternCapture(element, callback);
      });
      break;

    case 'AssignmentPattern':
      callback(pattern.left);
      break;
  }
}

/**
 * don't hold full context object in memory, just grab what we need.
 */
function childContext(path, context) {
  const settings = context.settings,
        parserOptions = context.parserOptions,
        parserPath = context.parserPath;

  return {
    settings,
    parserOptions,
    parserPath,
    path
  };
}

/**
 * sometimes legacy support isn't _that_ hard... right?
 */
function makeSourceCode(text, ast) {
  if (_eslint.SourceCode.length > 1) {
    // ESLint 3
    return new _eslint.SourceCode(text, ast);
  } else {
    // ESLint 4, 5
    return new _eslint.SourceCode({ text, ast });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV4cG9ydE1hcC5qcyJdLCJuYW1lcyI6WyJyZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZSIsInVuYW1iaWd1b3VzIiwibG9nIiwiZXhwb3J0Q2FjaGUiLCJNYXAiLCJFeHBvcnRNYXAiLCJjb25zdHJ1Y3RvciIsInBhdGgiLCJuYW1lc3BhY2UiLCJyZWV4cG9ydHMiLCJkZXBlbmRlbmNpZXMiLCJTZXQiLCJpbXBvcnRzIiwiZXJyb3JzIiwiaGFzRGVmYXVsdCIsImdldCIsInNpemUiLCJmb3JFYWNoIiwiZGVwIiwiZCIsImhhcyIsIm5hbWUiLCJpbm5lck1hcCIsImhhc0RlZXAiLCJmb3VuZCIsImltcG9ydGVkIiwiZ2V0SW1wb3J0IiwibG9jYWwiLCJkZWVwIiwidW5zaGlmdCIsImlubmVyVmFsdWUiLCJ1bmRlZmluZWQiLCJjYWxsYmFjayIsInRoaXNBcmciLCJ2IiwibiIsImNhbGwiLCJyZWV4cG9ydGVkIiwicmVwb3J0RXJyb3JzIiwiY29udGV4dCIsImRlY2xhcmF0aW9uIiwicmVwb3J0Iiwibm9kZSIsInNvdXJjZSIsIm1lc3NhZ2UiLCJ2YWx1ZSIsIm1hcCIsImUiLCJsaW5lTnVtYmVyIiwiY29sdW1uIiwiam9pbiIsImNhcHR1cmVEb2MiLCJkb2NTdHlsZVBhcnNlcnMiLCJtZXRhZGF0YSIsIm5vZGVzIiwic29tZSIsImxlYWRpbmdDb21tZW50cyIsInJhbmdlIiwiZ2V0Q29tbWVudHNCZWZvcmUiLCJsZW5ndGgiLCJkb2MiLCJlcnIiLCJhdmFpbGFibGVEb2NTdHlsZVBhcnNlcnMiLCJqc2RvYyIsImNhcHR1cmVKc0RvYyIsInRvbWRvYyIsImNhcHR1cmVUb21Eb2MiLCJjb21tZW50cyIsImNvbW1lbnQiLCJ0eXBlIiwiZG9jdHJpbmUiLCJwYXJzZSIsInVud3JhcCIsImxpbmVzIiwiaSIsIm1hdGNoIiwicHVzaCIsInRyaW0iLCJzdGF0dXNNYXRjaCIsImRlc2NyaXB0aW9uIiwidGFncyIsInRpdGxlIiwidG9Mb3dlckNhc2UiLCJmb3IiLCJjaGlsZENvbnRleHQiLCJjYWNoZUtleSIsImRpZ2VzdCIsImV4cG9ydE1hcCIsInN0YXRzIiwiZnMiLCJzdGF0U3luYyIsIm10aW1lIiwic2V0IiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidGVzdCIsIm0iLCJhc3QiLCJpc01vZHVsZSIsImRvY3N0eWxlIiwic2V0dGluZ3MiLCJzdHlsZSIsImMiLCJ0IiwibmFtZXNwYWNlcyIsInJlbW90ZVBhdGgiLCJyZXNvbHZlIiwicmVsYXRpdmUiLCJyZXNvbHZlSW1wb3J0IiwicnAiLCJnZXROYW1lc3BhY2UiLCJpZGVudGlmaWVyIiwiYWRkTmFtZXNwYWNlIiwib2JqZWN0IiwibnNmbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiY2FwdHVyZURlcGVuZGVuY3kiLCJpbXBvcnRlZFNwZWNpZmllcnMiLCJzdXBwb3J0ZWRUeXBlcyIsInNwZWNpZmllcnMiLCJzcGVjaWZpZXIiLCJhZGQiLCJwIiwiZXhpc3RpbmciLCJnZXR0ZXIiLCJ0aHVua0ZvciIsImxvYyIsIm1ha2VTb3VyY2VDb2RlIiwiYm9keSIsImV4cG9ydE1ldGEiLCJucyIsInMiLCJpZCIsImRlY2xhcmF0aW9ucyIsIm5zb3VyY2UiLCJleHBvcnRlZCIsIm1vZHVsZURlY2wiLCJmaW5kIiwiYm9keU5vZGUiLCJleHByZXNzaW9uIiwibW9kdWxlQmxvY2tOb2RlIiwiZXhwb3J0ZWREZWNsIiwiZGVjbCIsInBhdHRlcm4iLCJwcm9wZXJ0aWVzIiwiZWxlbWVudHMiLCJlbGVtZW50IiwibGVmdCIsInBhcnNlck9wdGlvbnMiLCJwYXJzZXJQYXRoIiwidGV4dCIsIlNvdXJjZUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7O1FBbWpCZ0JBLHVCLEdBQUFBLHVCOztBQW5qQmhCOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztJQUFZQyxXOzs7Ozs7QUFFWixNQUFNQyxNQUFNLHFCQUFNLGdDQUFOLENBQVo7O0FBRUEsTUFB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O0FBR0EsU0FBUzBILGNBQVQsQ0FBd0J1QixJQUF4QixFQUE4QnRELEdBQTlCLEVBQW1DO0FBQ2pDLE1BQUl1RCxtQkFBVzlGLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekI7QUFDQSxXQUFPLElBQUk4RixrQkFBSixDQUFlRCxJQUFmLEVBQXFCdEQsR0FBckIsQ0FBUDtBQUNELEdBSEQsTUFHTztBQUNMO0FBQ0EsV0FBTyxJQUFJdUQsa0JBQUosQ0FBZSxFQUFFRCxJQUFGLEVBQVF0RCxHQUFSLEVBQWYsQ0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiRXhwb3J0TWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuXG5pbXBvcnQgZG9jdHJpbmUgZnJvbSAnZG9jdHJpbmUnXG5cbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1ZydcblxuaW1wb3J0IHsgU291cmNlQ29kZSB9IGZyb20gJ2VzbGludCdcblxuaW1wb3J0IHBhcnNlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcGFyc2UnXG5pbXBvcnQgcmVzb2x2ZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3Jlc29sdmUnXG5pbXBvcnQgaXNJZ25vcmVkLCB7IGhhc1ZhbGlkRXh0ZW5zaW9uIH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9pZ25vcmUnXG5cbmltcG9ydCB7IGhhc2hPYmplY3QgfSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL2hhc2gnXG5pbXBvcnQgKiBhcyB1bmFtYmlndW91cyBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3VuYW1iaWd1b3VzJ1xuXG5jb25zdCBsb2cgPSBkZWJ1ZygnZXNsaW50LXBsdWdpbi1pbXBvcnQ6RXhwb3J0TWFwJylcblxuY29uc3QgZXhwb3J0Q2FjaGUgPSBuZXcgTWFwKClcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwb3J0TWFwIHtcbiAgY29uc3RydWN0b3IocGF0aCkge1xuICAgIHRoaXMucGF0aCA9IHBhdGhcbiAgICB0aGlzLm5hbWVzcGFjZSA9IG5ldyBNYXAoKVxuICAgIC8vIHRvZG86IHJlc3RydWN0dXJlIHRvIGtleSBvbiBwYXRoLCB2YWx1ZSBpcyByZXNvbHZlciArIG1hcCBvZiBuYW1lc1xuICAgIHRoaXMucmVleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgLyoqXG4gICAgICogc3Rhci1leHBvcnRzXG4gICAgICogQHR5cGUge1NldH0gb2YgKCkgPT4gRXhwb3J0TWFwXG4gICAgICovXG4gICAgdGhpcy5kZXBlbmRlbmNpZXMgPSBuZXcgU2V0KClcbiAgICAvKipcbiAgICAgKiBkZXBlbmRlbmNpZXMgb2YgdGhpcyBtb2R1bGUgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgcmUtZXhwb3J0ZWRcbiAgICAgKiBAdHlwZSB7TWFwfSBmcm9tIHBhdGggPSAoKSA9PiBFeHBvcnRNYXBcbiAgICAgKi9cbiAgICB0aGlzLmltcG9ydHMgPSBuZXcgTWFwKClcbiAgICB0aGlzLmVycm9ycyA9IFtdXG4gIH1cblxuICBnZXQgaGFzRGVmYXVsdCgpIHsgcmV0dXJuIHRoaXMuZ2V0KCdkZWZhdWx0JykgIT0gbnVsbCB9IC8vIHN0cm9uZ2VyIHRoYW4gdGhpcy5oYXNcblxuICBnZXQgc2l6ZSgpIHtcbiAgICBsZXQgc2l6ZSA9IHRoaXMubmFtZXNwYWNlLnNpemUgKyB0aGlzLnJlZXhwb3J0cy5zaXplXG4gICAgdGhpcy5kZXBlbmRlbmNpZXMuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgY29uc3QgZCA9IGRlcCgpXG4gICAgICAvLyBDSlMgLyBpZ25vcmVkIGRlcGVuZGVuY2llcyB3b24ndCBleGlzdCAoIzcxNylcbiAgICAgIGlmIChkID09IG51bGwpIHJldHVyblxuICAgICAgc2l6ZSArPSBkLnNpemVcbiAgICB9KVxuICAgIHJldHVybiBzaXplXG4gIH1cblxuICAvKipcbiAgICogTm90ZSB0aGF0IHRoaXMgZG9lcyBub3QgY2hlY2sgZXhwbGljaXRseSByZS1leHBvcnRlZCBuYW1lcyBmb3IgZXhpc3RlbmNlXG4gICAqIGluIHRoZSBiYXNlIG5hbWVzcGFjZSwgYnV0IGl0IHdpbGwgZXhwYW5kIGFsbCBgZXhwb3J0ICogZnJvbSAnLi4uJ2AgZXhwb3J0c1xuICAgKiBpZiBub3QgZm91bmQgaW4gdGhlIGV4cGxpY2l0IG5hbWVzcGFjZS5cbiAgICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGBuYW1lYCBpcyBleHBvcnRlZCBieSB0aGlzIG1vZHVsZS5cbiAgICovXG4gIGhhcyhuYW1lKSB7XG4gICAgaWYgKHRoaXMubmFtZXNwYWNlLmhhcyhuYW1lKSkgcmV0dXJuIHRydWVcbiAgICBpZiAodGhpcy5yZWV4cG9ydHMuaGFzKG5hbWUpKSByZXR1cm4gdHJ1ZVxuXG4gICAgLy8gZGVmYXVsdCBleHBvcnRzIG11c3QgYmUgZXhwbGljaXRseSByZS1leHBvcnRlZCAoIzMyOClcbiAgICBpZiAobmFtZSAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICBmb3IgKGxldCBkZXAgb2YgdGhpcy5kZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgbGV0IGlubmVyTWFwID0gZGVwKClcblxuICAgICAgICAvLyB0b2RvOiByZXBvcnQgYXMgdW5yZXNvbHZlZD9cbiAgICAgICAgaWYgKCFpbm5lck1hcCkgY29udGludWVcblxuICAgICAgICBpZiAoaW5uZXJNYXAuaGFzKG5hbWUpKSByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIGVuc3VyZSB0aGF0IGltcG9ydGVkIG5hbWUgZnVsbHkgcmVzb2x2ZXMuXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIG5hbWUgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGhhc0RlZXAobmFtZSkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZS5oYXMobmFtZSkpIHJldHVybiB7IGZvdW5kOiB0cnVlLCBwYXRoOiBbdGhpc10gfVxuXG4gICAgaWYgKHRoaXMucmVleHBvcnRzLmhhcyhuYW1lKSkge1xuICAgICAgY29uc3QgcmVleHBvcnRzID0gdGhpcy5yZWV4cG9ydHMuZ2V0KG5hbWUpXG4gICAgICAgICAgLCBpbXBvcnRlZCA9IHJlZXhwb3J0cy5nZXRJbXBvcnQoKVxuXG4gICAgICAvLyBpZiBpbXBvcnQgaXMgaWdub3JlZCwgcmV0dXJuIGV4cGxpY2l0ICdudWxsJ1xuICAgICAgaWYgKGltcG9ydGVkID09IG51bGwpIHJldHVybiB7IGZvdW5kOiB0cnVlLCBwYXRoOiBbdGhpc10gfVxuXG4gICAgICAvLyBzYWZlZ3VhcmQgYWdhaW5zdCBjeWNsZXMsIG9ubHkgaWYgbmFtZSBtYXRjaGVzXG4gICAgICBpZiAoaW1wb3J0ZWQucGF0aCA9PT0gdGhpcy5wYXRoICYmIHJlZXhwb3J0cy5sb2NhbCA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4geyBmb3VuZDogZmFsc2UsIHBhdGg6IFt0aGlzXSB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlZXAgPSBpbXBvcnRlZC5oYXNEZWVwKHJlZXhwb3J0cy5sb2NhbClcbiAgICAgIGRlZXAucGF0aC51bnNoaWZ0KHRoaXMpXG5cbiAgICAgIHJldHVybiBkZWVwXG4gICAgfVxuXG5cbiAgICAvLyBkZWZhdWx0IGV4cG9ydHMgbXVzdCBiZSBleHBsaWNpdGx5IHJlLWV4cG9ydGVkICgjMzI4KVxuICAgIGlmIChuYW1lICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIGZvciAobGV0IGRlcCBvZiB0aGlzLmRlcGVuZGVuY2llcykge1xuICAgICAgICBsZXQgaW5uZXJNYXAgPSBkZXAoKVxuICAgICAgICAvLyB0b2RvOiByZXBvcnQgYXMgdW5yZXNvbHZlZD9cbiAgICAgICAgaWYgKCFpbm5lck1hcCkgY29udGludWVcblxuICAgICAgICAvLyBzYWZlZ3VhcmQgYWdhaW5zdCBjeWNsZXNcbiAgICAgICAgaWYgKGlubmVyTWFwLnBhdGggPT09IHRoaXMucGF0aCkgY29udGludWVcblxuICAgICAgICBsZXQgaW5uZXJWYWx1ZSA9IGlubmVyTWFwLmhhc0RlZXAobmFtZSlcbiAgICAgICAgaWYgKGlubmVyVmFsdWUuZm91bmQpIHtcbiAgICAgICAgICBpbm5lclZhbHVlLnBhdGgudW5zaGlmdCh0aGlzKVxuICAgICAgICAgIHJldHVybiBpbm5lclZhbHVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBmb3VuZDogZmFsc2UsIHBhdGg6IFt0aGlzXSB9XG4gIH1cblxuICBnZXQobmFtZSkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZS5oYXMobmFtZSkpIHJldHVybiB0aGlzLm5hbWVzcGFjZS5nZXQobmFtZSlcblxuICAgIGlmICh0aGlzLnJlZXhwb3J0cy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHJlZXhwb3J0cyA9IHRoaXMucmVleHBvcnRzLmdldChuYW1lKVxuICAgICAgICAgICwgaW1wb3J0ZWQgPSByZWV4cG9ydHMuZ2V0SW1wb3J0KClcblxuICAgICAgLy8gaWYgaW1wb3J0IGlzIGlnbm9yZWQsIHJldHVybiBleHBsaWNpdCAnbnVsbCdcbiAgICAgIGlmIChpbXBvcnRlZCA9PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gICAgICAvLyBzYWZlZ3VhcmQgYWdhaW5zdCBjeWNsZXMsIG9ubHkgaWYgbmFtZSBtYXRjaGVzXG4gICAgICBpZiAoaW1wb3J0ZWQucGF0aCA9PT0gdGhpcy5wYXRoICYmIHJlZXhwb3J0cy5sb2NhbCA9PT0gbmFtZSkgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgICByZXR1cm4gaW1wb3J0ZWQuZ2V0KHJlZXhwb3J0cy5sb2NhbClcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0IGV4cG9ydHMgbXVzdCBiZSBleHBsaWNpdGx5IHJlLWV4cG9ydGVkICgjMzI4KVxuICAgIGlmIChuYW1lICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgIGZvciAobGV0IGRlcCBvZiB0aGlzLmRlcGVuZGVuY2llcykge1xuICAgICAgICBsZXQgaW5uZXJNYXAgPSBkZXAoKVxuICAgICAgICAvLyB0b2RvOiByZXBvcnQgYXMgdW5yZXNvbHZlZD9cbiAgICAgICAgaWYgKCFpbm5lck1hcCkgY29udGludWVcblxuICAgICAgICAvLyBzYWZlZ3VhcmQgYWdhaW5zdCBjeWNsZXNcbiAgICAgICAgaWYgKGlubmVyTWFwLnBhdGggPT09IHRoaXMucGF0aCkgY29udGludWVcblxuICAgICAgICBsZXQgaW5uZXJWYWx1ZSA9IGlubmVyTWFwLmdldChuYW1lKVxuICAgICAgICBpZiAoaW5uZXJWYWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gaW5uZXJWYWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB0aGlzLm5hbWVzcGFjZS5mb3JFYWNoKCh2LCBuKSA9PlxuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2LCBuLCB0aGlzKSlcblxuICAgIHRoaXMucmVleHBvcnRzLmZvckVhY2goKHJlZXhwb3J0cywgbmFtZSkgPT4ge1xuICAgICAgY29uc3QgcmVleHBvcnRlZCA9IHJlZXhwb3J0cy5nZXRJbXBvcnQoKVxuICAgICAgLy8gY2FuJ3QgbG9vayB1cCBtZXRhIGZvciBpZ25vcmVkIHJlLWV4cG9ydHMgKCMzNDgpXG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHJlZXhwb3J0ZWQgJiYgcmVleHBvcnRlZC5nZXQocmVleHBvcnRzLmxvY2FsKSwgbmFtZSwgdGhpcylcbiAgICB9KVxuXG4gICAgdGhpcy5kZXBlbmRlbmNpZXMuZm9yRWFjaChkZXAgPT4ge1xuICAgICAgY29uc3QgZCA9IGRlcCgpXG4gICAgICAvLyBDSlMgLyBpZ25vcmVkIGRlcGVuZGVuY2llcyB3b24ndCBleGlzdCAoIzcxNylcbiAgICAgIGlmIChkID09IG51bGwpIHJldHVyblxuXG4gICAgICBkLmZvckVhY2goKHYsIG4pID0+XG4gICAgICAgIG4gIT09ICdkZWZhdWx0JyAmJiBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHYsIG4sIHRoaXMpKVxuICAgIH0pXG4gIH1cblxuICAvLyB0b2RvOiBrZXlzLCB2YWx1ZXMsIGVudHJpZXM/XG5cbiAgcmVwb3J0RXJyb3JzKGNvbnRleHQsIGRlY2xhcmF0aW9uKSB7XG4gICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgbm9kZTogZGVjbGFyYXRpb24uc291cmNlLFxuICAgICAgbWVzc2FnZTogYFBhcnNlIGVycm9ycyBpbiBpbXBvcnRlZCBtb2R1bGUgJyR7ZGVjbGFyYXRpb24uc291cmNlLnZhbHVlfSc6IGAgK1xuICAgICAgICAgICAgICAgICAgYCR7dGhpcy5lcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZSA9PiBgJHtlLm1lc3NhZ2V9ICgke2UubGluZU51bWJlcn06JHtlLmNvbHVtbn0pYClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcsICcpfWAsXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIHBhcnNlIGRvY3MgZnJvbSB0aGUgZmlyc3Qgbm9kZSB0aGF0IGhhcyBsZWFkaW5nIGNvbW1lbnRzXG4gKi9cbmZ1bmN0aW9uIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIC4uLm5vZGVzKSB7XG4gIGNvbnN0IG1ldGFkYXRhID0ge31cblxuICAvLyAnc29tZScgc2hvcnQtY2lyY3VpdHMgb24gZmlyc3QgJ3RydWUnXG4gIG5vZGVzLnNvbWUobiA9PiB7XG4gICAgdHJ5IHtcblxuICAgICAgbGV0IGxlYWRpbmdDb21tZW50c1xuXG4gICAgICAvLyBuLmxlYWRpbmdDb21tZW50cyBpcyBsZWdhY3kgYGF0dGFjaENvbW1lbnRzYCBiZWhhdmlvclxuICAgICAgaWYgKCdsZWFkaW5nQ29tbWVudHMnIGluIG4pIHtcbiAgICAgICAgbGVhZGluZ0NvbW1lbnRzID0gbi5sZWFkaW5nQ29tbWVudHNcbiAgICAgIH0gZWxzZSBpZiAobi5yYW5nZSkge1xuICAgICAgICBsZWFkaW5nQ29tbWVudHMgPSBzb3VyY2UuZ2V0Q29tbWVudHNCZWZvcmUobilcbiAgICAgIH1cblxuICAgICAgaWYgKCFsZWFkaW5nQ29tbWVudHMgfHwgbGVhZGluZ0NvbW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGZvciAobGV0IG5hbWUgaW4gZG9jU3R5bGVQYXJzZXJzKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRvY1N0eWxlUGFyc2Vyc1tuYW1lXShsZWFkaW5nQ29tbWVudHMpXG4gICAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgICBtZXRhZGF0YS5kb2MgPSBkb2NcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBtZXRhZGF0YVxufVxuXG5jb25zdCBhdmFpbGFibGVEb2NTdHlsZVBhcnNlcnMgPSB7XG4gIGpzZG9jOiBjYXB0dXJlSnNEb2MsXG4gIHRvbWRvYzogY2FwdHVyZVRvbURvYyxcbn1cblxuLyoqXG4gKiBwYXJzZSBKU0RvYyBmcm9tIGxlYWRpbmcgY29tbWVudHNcbiAqIEBwYXJhbSAgey4uLlt0eXBlXX0gY29tbWVudHMgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7e2RvYzogb2JqZWN0fX1cbiAqL1xuZnVuY3Rpb24gY2FwdHVyZUpzRG9jKGNvbW1lbnRzKSB7XG4gIGxldCBkb2NcblxuICAvLyBjYXB0dXJlIFhTRG9jXG4gIGNvbW1lbnRzLmZvckVhY2goY29tbWVudCA9PiB7XG4gICAgLy8gc2tpcCBub24tYmxvY2sgY29tbWVudHNcbiAgICBpZiAoY29tbWVudC50eXBlICE9PSAnQmxvY2snKSByZXR1cm5cbiAgICB0cnkge1xuICAgICAgZG9jID0gZG9jdHJpbmUucGFyc2UoY29tbWVudC52YWx1ZSwgeyB1bndyYXA6IHRydWUgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8qIGRvbid0IGNhcmUsIGZvciBub3c/IG1heWJlIGFkZCB0byBgZXJyb3JzP2AgKi9cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGRvY1xufVxuXG4vKipcbiAgKiBwYXJzZSBUb21Eb2Mgc2VjdGlvbiBmcm9tIGNvbW1lbnRzXG4gICovXG5mdW5jdGlvbiBjYXB0dXJlVG9tRG9jKGNvbW1lbnRzKSB7XG4gIC8vIGNvbGxlY3QgbGluZXMgdXAgdG8gZmlyc3QgcGFyYWdyYXBoIGJyZWFrXG4gIGNvbnN0IGxpbmVzID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50c1tpXVxuICAgIGlmIChjb21tZW50LnZhbHVlLm1hdGNoKC9eXFxzKiQvKSkgYnJlYWtcbiAgICBsaW5lcy5wdXNoKGNvbW1lbnQudmFsdWUudHJpbSgpKVxuICB9XG5cbiAgLy8gcmV0dXJuIGRvY3RyaW5lLWxpa2Ugb2JqZWN0XG4gIGNvbnN0IHN0YXR1c01hdGNoID0gbGluZXMuam9pbignICcpLm1hdGNoKC9eKFB1YmxpY3xJbnRlcm5hbHxEZXByZWNhdGVkKTpcXHMqKC4rKS8pXG4gIGlmIChzdGF0dXNNYXRjaCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNjcmlwdGlvbjogc3RhdHVzTWF0Y2hbMl0sXG4gICAgICB0YWdzOiBbe1xuICAgICAgICB0aXRsZTogc3RhdHVzTWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0YXR1c01hdGNoWzJdLFxuICAgICAgfV0sXG4gICAgfVxuICB9XG59XG5cbkV4cG9ydE1hcC5nZXQgPSBmdW5jdGlvbiAoc291cmNlLCBjb250ZXh0KSB7XG4gIGNvbnN0IHBhdGggPSByZXNvbHZlKHNvdXJjZSwgY29udGV4dClcbiAgaWYgKHBhdGggPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gRXhwb3J0TWFwLmZvcihjaGlsZENvbnRleHQocGF0aCwgY29udGV4dCkpXG59XG5cbkV4cG9ydE1hcC5mb3IgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICBjb25zdCB7IHBhdGggfSA9IGNvbnRleHRcblxuICBjb25zdCBjYWNoZUtleSA9IGhhc2hPYmplY3QoY29udGV4dCkuZGlnZXN0KCdoZXgnKVxuICBsZXQgZXhwb3J0TWFwID0gZXhwb3J0Q2FjaGUuZ2V0KGNhY2hlS2V5KVxuXG4gIC8vIHJldHVybiBjYWNoZWQgaWdub3JlXG4gIGlmIChleHBvcnRNYXAgPT09IG51bGwpIHJldHVybiBudWxsXG5cbiAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyhwYXRoKVxuICBpZiAoZXhwb3J0TWFwICE9IG51bGwpIHtcbiAgICAvLyBkYXRlIGVxdWFsaXR5IGNoZWNrXG4gICAgaWYgKGV4cG9ydE1hcC5tdGltZSAtIHN0YXRzLm10aW1lID09PSAwKSB7XG4gICAgICByZXR1cm4gZXhwb3J0TWFwXG4gICAgfVxuICAgIC8vIGZ1dHVyZTogY2hlY2sgY29udGVudCBlcXVhbGl0eT9cbiAgfVxuXG4gIC8vIGNoZWNrIHZhbGlkIGV4dGVuc2lvbnMgZmlyc3RcbiAgaWYgKCFoYXNWYWxpZEV4dGVuc2lvbihwYXRoLCBjb250ZXh0KSkge1xuICAgIGV4cG9ydENhY2hlLnNldChjYWNoZUtleSwgbnVsbClcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcblxuICAvLyBjaGVjayBmb3IgYW5kIGNhY2hlIGlnbm9yZVxuICBpZiAoaXNJZ25vcmVkKHBhdGgsIGNvbnRleHQpIHx8ICF1bmFtYmlndW91cy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgbG9nKCdpZ25vcmVkIHBhdGggZHVlIHRvIHVuYW1iaWd1b3VzIHJlZ2V4IG9yIGlnbm9yZSBzZXR0aW5nczonLCBwYXRoKVxuICAgIGV4cG9ydENhY2hlLnNldChjYWNoZUtleSwgbnVsbClcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgbG9nKCdjYWNoZSBtaXNzJywgY2FjaGVLZXksICdmb3IgcGF0aCcsIHBhdGgpXG4gIGV4cG9ydE1hcCA9IEV4cG9ydE1hcC5wYXJzZShwYXRoLCBjb250ZW50LCBjb250ZXh0KVxuXG4gIC8vIGFtYmlndW91cyBtb2R1bGVzIHJldHVybiBudWxsXG4gIGlmIChleHBvcnRNYXAgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICBleHBvcnRNYXAubXRpbWUgPSBzdGF0cy5tdGltZVxuXG4gIGV4cG9ydENhY2hlLnNldChjYWNoZUtleSwgZXhwb3J0TWFwKVxuICByZXR1cm4gZXhwb3J0TWFwXG59XG5cblxuRXhwb3J0TWFwLnBhcnNlID0gZnVuY3Rpb24gKHBhdGgsIGNvbnRlbnQsIGNvbnRleHQpIHtcbiAgdmFyIG0gPSBuZXcgRXhwb3J0TWFwKHBhdGgpXG5cbiAgdHJ5IHtcbiAgICB2YXIgYXN0ID0gcGFyc2UocGF0aCwgY29udGVudCwgY29udGV4dClcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nKCdwYXJzZSBlcnJvcjonLCBwYXRoLCBlcnIpXG4gICAgbS5lcnJvcnMucHVzaChlcnIpXG4gICAgcmV0dXJuIG0gLy8gY2FuJ3QgY29udGludWVcbiAgfVxuXG4gIGlmICghdW5hbWJpZ3VvdXMuaXNNb2R1bGUoYXN0KSkgcmV0dXJuIG51bGxcblxuICBjb25zdCBkb2NzdHlsZSA9IChjb250ZXh0LnNldHRpbmdzICYmIGNvbnRleHQuc2V0dGluZ3NbJ2ltcG9ydC9kb2NzdHlsZSddKSB8fCBbJ2pzZG9jJ11cbiAgY29uc3QgZG9jU3R5bGVQYXJzZXJzID0ge31cbiAgZG9jc3R5bGUuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgZG9jU3R5bGVQYXJzZXJzW3N0eWxlXSA9IGF2YWlsYWJsZURvY1N0eWxlUGFyc2Vyc1tzdHlsZV1cbiAgfSlcblxuICAvLyBhdHRlbXB0IHRvIGNvbGxlY3QgbW9kdWxlIGRvY1xuICBpZiAoYXN0LmNvbW1lbnRzKSB7XG4gICAgYXN0LmNvbW1lbnRzLnNvbWUoYyA9PiB7XG4gICAgICBpZiAoYy50eXBlICE9PSAnQmxvY2snKSByZXR1cm4gZmFsc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRvY3RyaW5lLnBhcnNlKGMudmFsdWUsIHsgdW53cmFwOiB0cnVlIH0pXG4gICAgICAgIGlmIChkb2MudGFncy5zb21lKHQgPT4gdC50aXRsZSA9PT0gJ21vZHVsZScpKSB7XG4gICAgICAgICAgbS5kb2MgPSBkb2NcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHsgLyogaWdub3JlICovIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBuYW1lc3BhY2VzID0gbmV3IE1hcCgpXG5cbiAgZnVuY3Rpb24gcmVtb3RlUGF0aCh2YWx1ZSkge1xuICAgIHJldHVybiByZXNvbHZlLnJlbGF0aXZlKHZhbHVlLCBwYXRoLCBjb250ZXh0LnNldHRpbmdzKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUltcG9ydCh2YWx1ZSkge1xuICAgIGNvbnN0IHJwID0gcmVtb3RlUGF0aCh2YWx1ZSlcbiAgICBpZiAocnAgPT0gbnVsbCkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gRXhwb3J0TWFwLmZvcihjaGlsZENvbnRleHQocnAsIGNvbnRleHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlKGlkZW50aWZpZXIpIHtcbiAgICBpZiAoIW5hbWVzcGFjZXMuaGFzKGlkZW50aWZpZXIubmFtZSkpIHJldHVyblxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXNvbHZlSW1wb3J0KG5hbWVzcGFjZXMuZ2V0KGlkZW50aWZpZXIubmFtZSkpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkTmFtZXNwYWNlKG9iamVjdCwgaWRlbnRpZmllcikge1xuICAgIGNvbnN0IG5zZm4gPSBnZXROYW1lc3BhY2UoaWRlbnRpZmllcilcbiAgICBpZiAobnNmbikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgJ25hbWVzcGFjZScsIHsgZ2V0OiBuc2ZuIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFxuICB9XG5cbiAgZnVuY3Rpb24gY2FwdHVyZURlcGVuZGVuY3koZGVjbGFyYXRpb24pIHtcbiAgICBpZiAoZGVjbGFyYXRpb24uc291cmNlID09IG51bGwpIHJldHVybiBudWxsXG4gICAgY29uc3QgaW1wb3J0ZWRTcGVjaWZpZXJzID0gbmV3IFNldCgpXG4gICAgY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBuZXcgU2V0KFsnSW1wb3J0RGVmYXVsdFNwZWNpZmllcicsICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInXSlcbiAgICBpZiAoZGVjbGFyYXRpb24uc3BlY2lmaWVycykge1xuICAgICAgZGVjbGFyYXRpb24uc3BlY2lmaWVycy5mb3JFYWNoKHNwZWNpZmllciA9PiB7XG4gICAgICAgIGlmIChzdXBwb3J0ZWRUeXBlcy5oYXMoc3BlY2lmaWVyLnR5cGUpKSB7XG4gICAgICAgICAgaW1wb3J0ZWRTcGVjaWZpZXJzLmFkZChzcGVjaWZpZXIudHlwZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BlY2lmaWVyLnR5cGUgPT09ICdJbXBvcnRTcGVjaWZpZXInKSB7XG4gICAgICAgICAgaW1wb3J0ZWRTcGVjaWZpZXJzLmFkZChzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBwID0gcmVtb3RlUGF0aChkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUpXG4gICAgaWYgKHAgPT0gbnVsbCkgcmV0dXJuIG51bGxcbiAgICBjb25zdCBleGlzdGluZyA9IG0uaW1wb3J0cy5nZXQocClcbiAgICBpZiAoZXhpc3RpbmcgIT0gbnVsbCkgcmV0dXJuIGV4aXN0aW5nLmdldHRlclxuXG4gICAgY29uc3QgZ2V0dGVyID0gdGh1bmtGb3IocCwgY29udGV4dClcbiAgICBtLmltcG9ydHMuc2V0KHAsIHtcbiAgICAgIGdldHRlcixcbiAgICAgIHNvdXJjZTogeyAgLy8gY2FwdHVyaW5nIGFjdHVhbCBub2RlIHJlZmVyZW5jZSBob2xkcyBmdWxsIEFTVCBpbiBtZW1vcnkhXG4gICAgICAgIHZhbHVlOiBkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsXG4gICAgICAgIGxvYzogZGVjbGFyYXRpb24uc291cmNlLmxvYyxcbiAgICAgIH0sXG4gICAgICBpbXBvcnRlZFNwZWNpZmllcnMsXG4gICAgfSlcbiAgICByZXR1cm4gZ2V0dGVyXG4gIH1cblxuICBjb25zdCBzb3VyY2UgPSBtYWtlU291cmNlQ29kZShjb250ZW50LCBhc3QpXG5cbiAgYXN0LmJvZHkuZm9yRWFjaChmdW5jdGlvbiAobikge1xuXG4gICAgaWYgKG4udHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcbiAgICAgIGNvbnN0IGV4cG9ydE1ldGEgPSBjYXB0dXJlRG9jKHNvdXJjZSwgZG9jU3R5bGVQYXJzZXJzLCBuKVxuICAgICAgaWYgKG4uZGVjbGFyYXRpb24udHlwZSA9PT0gJ0lkZW50aWZpZXInKSB7XG4gICAgICAgIGFkZE5hbWVzcGFjZShleHBvcnRNZXRhLCBuLmRlY2xhcmF0aW9uKVxuICAgICAgfVxuICAgICAgbS5uYW1lc3BhY2Uuc2V0KCdkZWZhdWx0JywgZXhwb3J0TWV0YSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChuLnR5cGUgPT09ICdFeHBvcnRBbGxEZWNsYXJhdGlvbicpIHtcbiAgICAgIGNvbnN0IGdldHRlciA9IGNhcHR1cmVEZXBlbmRlbmN5KG4pXG4gICAgICBpZiAoZ2V0dGVyKSBtLmRlcGVuZGVuY2llcy5hZGQoZ2V0dGVyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY2FwdHVyZSBuYW1lc3BhY2VzIGluIGNhc2Ugb2YgbGF0ZXIgZXhwb3J0XG4gICAgaWYgKG4udHlwZSA9PT0gJ0ltcG9ydERlY2xhcmF0aW9uJykge1xuICAgICAgY2FwdHVyZURlcGVuZGVuY3kobilcbiAgICAgIGxldCBuc1xuICAgICAgaWYgKG4uc3BlY2lmaWVycy5zb21lKHMgPT4gcy50eXBlID09PSAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJyAmJiAobnMgPSBzKSkpIHtcbiAgICAgICAgbmFtZXNwYWNlcy5zZXQobnMubG9jYWwubmFtZSwgbi5zb3VyY2UudmFsdWUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAobi50eXBlID09PSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicpIHtcbiAgICAgIC8vIGNhcHR1cmUgZGVjbGFyYXRpb25cbiAgICAgIGlmIChuLmRlY2xhcmF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChuLmRlY2xhcmF0aW9uLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdGdW5jdGlvbkRlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdDbGFzc0RlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdUeXBlQWxpYXMnOiAvLyBmbG93dHlwZSB3aXRoIGJhYmVsLWVzbGludCBwYXJzZXJcbiAgICAgICAgICBjYXNlICdJbnRlcmZhY2VEZWNsYXJhdGlvbic6XG4gICAgICAgICAgY2FzZSAnRGVjbGFyZUZ1bmN0aW9uJzpcbiAgICAgICAgICBjYXNlICdUU0RlY2xhcmVGdW5jdGlvbic6XG4gICAgICAgICAgY2FzZSAnVFNFbnVtRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTVHlwZUFsaWFzRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTSW50ZXJmYWNlRGVjbGFyYXRpb24nOlxuICAgICAgICAgIGNhc2UgJ1RTQWJzdHJhY3RDbGFzc0RlY2xhcmF0aW9uJzpcbiAgICAgICAgICBjYXNlICdUU01vZHVsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgIG0ubmFtZXNwYWNlLnNldChuLmRlY2xhcmF0aW9uLmlkLm5hbWUsIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIG4pKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlICdWYXJpYWJsZURlY2xhcmF0aW9uJzpcbiAgICAgICAgICAgIG4uZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zLmZvckVhY2goKGQpID0+XG4gICAgICAgICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKGQuaWQsXG4gICAgICAgICAgICAgICAgaWQgPT4gbS5uYW1lc3BhY2Uuc2V0KGlkLm5hbWUsIGNhcHR1cmVEb2Moc291cmNlLCBkb2NTdHlsZVBhcnNlcnMsIGQsIG4pKSkpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5zb3VyY2UgPSBuLnNvdXJjZSAmJiBuLnNvdXJjZS52YWx1ZVxuICAgICAgbi5zcGVjaWZpZXJzLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgY29uc3QgZXhwb3J0TWV0YSA9IHt9XG4gICAgICAgIGxldCBsb2NhbFxuXG4gICAgICAgIHN3aXRjaCAocy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnRXhwb3J0RGVmYXVsdFNwZWNpZmllcic6XG4gICAgICAgICAgICBpZiAoIW4uc291cmNlKSByZXR1cm5cbiAgICAgICAgICAgIGxvY2FsID0gJ2RlZmF1bHQnXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgJ0V4cG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgICAgICAgICBtLm5hbWVzcGFjZS5zZXQocy5leHBvcnRlZC5uYW1lLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0TWV0YSwgJ25hbWVzcGFjZScsIHtcbiAgICAgICAgICAgICAgZ2V0KCkgeyByZXR1cm4gcmVzb2x2ZUltcG9ydChuc291cmNlKSB9LFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICBjYXNlICdFeHBvcnRTcGVjaWZpZXInOlxuICAgICAgICAgICAgaWYgKCFuLnNvdXJjZSkge1xuICAgICAgICAgICAgICBtLm5hbWVzcGFjZS5zZXQocy5leHBvcnRlZC5uYW1lLCBhZGROYW1lc3BhY2UoZXhwb3J0TWV0YSwgcy5sb2NhbCkpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZSBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGxvY2FsID0gcy5sb2NhbC5uYW1lXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9kbzogSlNEb2NcbiAgICAgICAgbS5yZWV4cG9ydHMuc2V0KHMuZXhwb3J0ZWQubmFtZSwgeyBsb2NhbCwgZ2V0SW1wb3J0OiAoKSA9PiByZXNvbHZlSW1wb3J0KG5zb3VyY2UpIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFRoaXMgZG9lc24ndCBkZWNsYXJlIGFueXRoaW5nLCBidXQgY2hhbmdlcyB3aGF0J3MgYmVpbmcgZXhwb3J0ZWQuXG4gICAgaWYgKG4udHlwZSA9PT0gJ1RTRXhwb3J0QXNzaWdubWVudCcpIHtcbiAgICAgIGNvbnN0IG1vZHVsZURlY2wgPSBhc3QuYm9keS5maW5kKChib2R5Tm9kZSkgPT5cbiAgICAgICAgYm9keU5vZGUudHlwZSA9PT0gJ1RTTW9kdWxlRGVjbGFyYXRpb24nICYmIGJvZHlOb2RlLmlkLm5hbWUgPT09IG4uZXhwcmVzc2lvbi5uYW1lXG4gICAgICApXG4gICAgICBpZiAobW9kdWxlRGVjbCAmJiBtb2R1bGVEZWNsLmJvZHkgJiYgbW9kdWxlRGVjbC5ib2R5LmJvZHkpIHtcbiAgICAgICAgbW9kdWxlRGVjbC5ib2R5LmJvZHkuZm9yRWFjaCgobW9kdWxlQmxvY2tOb2RlKSA9PiB7XG4gICAgICAgICAgLy8gRXhwb3J0LWFzc2lnbm1lbnQgZXhwb3J0cyBhbGwgbWVtYmVycyBpbiB0aGUgbmFtZXNwYWNlLCBleHBsaWNpdGx5IGV4cG9ydGVkIG9yIG5vdC5cbiAgICAgICAgICBjb25zdCBleHBvcnRlZERlY2wgPSBtb2R1bGVCbG9ja05vZGUudHlwZSA9PT0gJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nID9cbiAgICAgICAgICAgIG1vZHVsZUJsb2NrTm9kZS5kZWNsYXJhdGlvbiA6XG4gICAgICAgICAgICBtb2R1bGVCbG9ja05vZGVcblxuICAgICAgICAgIGlmIChleHBvcnRlZERlY2wudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgICBleHBvcnRlZERlY2wuZGVjbGFyYXRpb25zLmZvckVhY2goKGRlY2wpID0+XG4gICAgICAgICAgICAgIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKGRlY2wuaWQsKGlkKSA9PiBtLm5hbWVzcGFjZS5zZXQoXG4gICAgICAgICAgICAgICAgaWQubmFtZSxcbiAgICAgICAgICAgICAgICBjYXB0dXJlRG9jKHNvdXJjZSwgZG9jU3R5bGVQYXJzZXJzLCBkZWNsLCBleHBvcnRlZERlY2wsIG1vZHVsZUJsb2NrTm9kZSkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbS5uYW1lc3BhY2Uuc2V0KFxuICAgICAgICAgICAgICBleHBvcnRlZERlY2wuaWQubmFtZSxcbiAgICAgICAgICAgICAgY2FwdHVyZURvYyhzb3VyY2UsIGRvY1N0eWxlUGFyc2VycywgbW9kdWxlQmxvY2tOb2RlKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBtXG59XG5cbi8qKlxuICogVGhlIGNyZWF0aW9uIG9mIHRoaXMgY2xvc3VyZSBpcyBpc29sYXRlZCBmcm9tIG90aGVyIHNjb3Blc1xuICogdG8gYXZvaWQgb3Zlci1yZXRlbnRpb24gb2YgdW5yZWxhdGVkIHZhcmlhYmxlcywgd2hpY2ggaGFzXG4gKiBjYXVzZWQgbWVtb3J5IGxlYWtzLiBTZWUgIzEyNjYuXG4gKi9cbmZ1bmN0aW9uIHRodW5rRm9yKHAsIGNvbnRleHQpIHtcbiAgcmV0dXJuICgpID0+IEV4cG9ydE1hcC5mb3IoY2hpbGRDb250ZXh0KHAsIGNvbnRleHQpKVxufVxuXG5cbi8qKlxuICogVHJhdmVyc2UgYSBwYXR0ZXJuL2lkZW50aWZpZXIgbm9kZSwgY2FsbGluZyAnY2FsbGJhY2snXG4gKiBmb3IgZWFjaCBsZWFmIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0gIHtub2RlfSAgIHBhdHRlcm5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY3Vyc2l2ZVBhdHRlcm5DYXB0dXJlKHBhdHRlcm4sIGNhbGxiYWNrKSB7XG4gIHN3aXRjaCAocGF0dGVybi50eXBlKSB7XG4gICAgY2FzZSAnSWRlbnRpZmllcic6IC8vIGJhc2UgY2FzZVxuICAgICAgY2FsbGJhY2socGF0dGVybilcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdPYmplY3RQYXR0ZXJuJzpcbiAgICAgIHBhdHRlcm4ucHJvcGVydGllcy5mb3JFYWNoKHAgPT4ge1xuICAgICAgICByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShwLnZhbHVlLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQXJyYXlQYXR0ZXJuJzpcbiAgICAgIHBhdHRlcm4uZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgcmVjdXJzaXZlUGF0dGVybkNhcHR1cmUoZWxlbWVudCwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ0Fzc2lnbm1lbnRQYXR0ZXJuJzpcbiAgICAgIGNhbGxiYWNrKHBhdHRlcm4ubGVmdClcbiAgICAgIGJyZWFrXG4gIH1cbn1cblxuLyoqXG4gKiBkb24ndCBob2xkIGZ1bGwgY29udGV4dCBvYmplY3QgaW4gbWVtb3J5LCBqdXN0IGdyYWIgd2hhdCB3ZSBuZWVkLlxuICovXG5mdW5jdGlvbiBjaGlsZENvbnRleHQocGF0aCwgY29udGV4dCkge1xuICBjb25zdCB7IHNldHRpbmdzLCBwYXJzZXJPcHRpb25zLCBwYXJzZXJQYXRoIH0gPSBjb250ZXh0XG4gIHJldHVybiB7XG4gICAgc2V0dGluZ3MsXG4gICAgcGFyc2VyT3B0aW9ucyxcbiAgICBwYXJzZXJQYXRoLFxuICAgIHBhdGgsXG4gIH1cbn1cblxuXG4vKipcbiAqIHNvbWV0aW1lcyBsZWdhY3kgc3VwcG9ydCBpc24ndCBfdGhhdF8gaGFyZC4uLiByaWdodD9cbiAqL1xuZnVuY3Rpb24gbWFrZVNvdXJjZUNvZGUodGV4dCwgYXN0KSB7XG4gIGlmIChTb3VyY2VDb2RlLmxlbmd0aCA+IDEpIHtcbiAgICAvLyBFU0xpbnQgM1xuICAgIHJldHVybiBuZXcgU291cmNlQ29kZSh0ZXh0LCBhc3QpXG4gIH0gZWxzZSB7XG4gICAgLy8gRVNMaW50IDQsIDVcbiAgICByZXR1cm4gbmV3IFNvdXJjZUNvZGUoeyB0ZXh0LCBhc3QgfSlcbiAgfVxufVxuIl19