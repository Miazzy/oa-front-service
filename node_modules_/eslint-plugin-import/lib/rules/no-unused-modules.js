'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                 * @fileOverview Ensures that modules contain exports and/or all
                                                                                                                                                                                                 * modules are consumed within other modules.
                                                                                                                                                                                                 * @author René Fermann
                                                                                                                                                                                                 */

// eslint/lib/util/glob-util has been moved to eslint/lib/util/glob-utils with version 5.3
// and has been moved to eslint/lib/cli-engine/file-enumerator in version 6
let listFilesToProcess;
try {
  var FileEnumerator = require('eslint/lib/cli-engine/file-enumerator').FileEnumerator;
  listFilesToProcess = function (src) {
    var e = new FileEnumerator();
    return Array.from(e.iterateFiles(src));
  };
} catch (e1) {
  try {
    listFilesToProcess = require('eslint/lib/util/glob-utils').listFilesToProcess;
  } catch (e2) {
    listFilesToProcess = require('eslint/lib/util/glob-util').listFilesToProcess;
  }
}

const EXPORT_DEFAULT_DECLARATION = 'ExportDefaultDeclaration';
const EXPORT_NAMED_DECLARATION = 'ExportNamedDeclaration';
const EXPORT_ALL_DECLARATION = 'ExportAllDeclaration';
const IMPORT_DECLARATION = 'ImportDeclaration';
const IMPORT_NAMESPACE_SPECIFIER = 'ImportNamespaceSpecifier';
const IMPORT_DEFAULT_SPECIFIER = 'ImportDefaultSpecifier';
const VARIABLE_DECLARATION = 'VariableDeclaration';
const FUNCTION_DECLARATION = 'FunctionDeclaration';
const DEFAULT = 'default';

let preparationDone = false;
const importList = new Map();
const exportList = new Map();
const ignoredFiles = new Set();

const isNodeModule = path => {
  return (/\/(node_modules)\//.test(path)
  );
};

/**
 * read all files matching the patterns in src and ignoreExports
 *
 * return all files matching src pattern, which are not matching the ignoreExports pattern
 */
const resolveFiles = (src, ignoreExports) => {
  const srcFiles = new Set();
  const srcFileList = listFilesToProcess(src);

  // prepare list of ignored files
  const ignoredFilesList = listFilesToProcess(ignoreExports);
  ignoredFilesList.forEach((_ref) => {
    let filename = _ref.filename;
    return ignoredFiles.add(filename);
  });

  // prepare list of source files, don't consider files from node_modules
  srcFileList.filter((_ref2) => {
    let filename = _ref2.filename;
    return !isNodeModule(filename);
  }).forEach((_ref3) => {
    let filename = _ref3.filename;

    srcFiles.add(filename);
  });
  return srcFiles;
};

/**
 * parse all source files and build up 2 maps containing the existing imports and exports
 */
const prepareImportsAndExports = (srcFiles, context) => {
  const exportAll = new Map();
  srcFiles.forEach(file => {
    const exports = new Map();
    const imports = new Map();
    const currentExports = _ExportMap2.default.get(file, context);
    if (currentExports) {
      const dependencies = currentExports.dependencies,
            reexports = currentExports.reexports,
            localImportList = currentExports.imports,
            namespace = currentExports.namespace;

      // dependencies === export * from 

      const currentExportAll = new Set();
      dependencies.forEach(value => {
        currentExportAll.add(value().path);
      });
      exportAll.set(file, currentExportAll);

      reexports.forEach((value, key) => {
        if (key === DEFAULT) {
          exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed: new Set() });
        } else {
          exports.set(key, { whereUsed: new Set() });
        }
        const reexport = value.getImport();
        if (!reexport) {
          return;
        }
        let localImport = imports.get(reexport.path);
        let currentValue;
        if (value.local === DEFAULT) {
          currentValue = IMPORT_DEFAULT_SPECIFIER;
        } else {
          currentValue = value.local;
        }
        if (typeof localImport !== 'undefined') {
          localImport = new Set([].concat(_toConsumableArray(localImport), [currentValue]));
        } else {
          localImport = new Set([currentValue]);
        }
        imports.set(reexport.path, localImport);
      });

      localImportList.forEach((value, key) => {
        if (isNodeModule(key)) {
          return;
        }
        imports.set(key, value.importedSpecifiers);
      });
      importList.set(file, imports);

      // build up export list only, if file is not ignored
      if (ignoredFiles.has(file)) {
        return;
      }
      namespace.forEach((value, key) => {
        if (key === DEFAULT) {
          exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed: new Set() });
        } else {
          exports.set(key, { whereUsed: new Set() });
        }
      });
    }
    exports.set(EXPORT_ALL_DECLARATION, { whereUsed: new Set() });
    exports.set(IMPORT_NAMESPACE_SPECIFIER, { whereUsed: new Set() });
    exportList.set(file, exports);
  });
  exportAll.forEach((value, key) => {
    value.forEach(val => {
      const currentExports = exportList.get(val);
      const currentExport = currentExports.get(EXPORT_ALL_DECLARATION);
      currentExport.whereUsed.add(key);
    });
  });
};

/**
 * traverse through all imports and add the respective path to the whereUsed-list 
 * of the corresponding export
 */
const determineUsage = () => {
  importList.forEach((listValue, listKey) => {
    listValue.forEach((value, key) => {
      const exports = exportList.get(key);
      if (typeof exports !== 'undefined') {
        value.forEach(currentImport => {
          let specifier;
          if (currentImport === IMPORT_NAMESPACE_SPECIFIER) {
            specifier = IMPORT_NAMESPACE_SPECIFIER;
          } else if (currentImport === IMPORT_DEFAULT_SPECIFIER) {
            specifier = IMPORT_DEFAULT_SPECIFIER;
          } else {
            specifier = currentImport;
          }
          if (typeof specifier !== 'undefined') {
            const exportStatement = exports.get(specifier);
            if (typeof exportStatement !== 'undefined') {
              const whereUsed = exportStatement.whereUsed;

              whereUsed.add(listKey);
              exports.set(specifier, { whereUsed });
            }
          }
        });
      }
    });
  });
};

const getSrc = src => {
  if (src) {
    return src;
  }
  return [process.cwd()];
};

/**
 * prepare the lists of existing imports and exports - should only be executed once at
 * the start of a new eslint run
 */
const doPreparation = (src, ignoreExports, context) => {
  const srcFiles = resolveFiles(getSrc(src), ignoreExports);
  prepareImportsAndExports(srcFiles, context);
  determineUsage();
  preparationDone = true;
};

const newNamespaceImportExists = specifiers => specifiers.some((_ref4) => {
  let type = _ref4.type;
  return type === IMPORT_NAMESPACE_SPECIFIER;
});

const newDefaultImportExists = specifiers => specifiers.some((_ref5) => {
  let type = _ref5.type;
  return type === IMPORT_DEFAULT_SPECIFIER;
});

module.exports = {
  meta: {
    docs: { url: (0, _docsUrl2.default)('no-unused-modules') },
    schema: [{
      properties: {
        src: {
          description: 'files/paths to be analyzed (only for unused exports)',
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 1
          }
        },
        ignoreExports: {
          description: 'files/paths for which unused exports will not be reported (e.g module entry points)',
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
            minLength: 1
          }
        },
        missingExports: {
          description: 'report modules without any exports',
          type: 'boolean'
        },
        unusedExports: {
          description: 'report exports without any usage',
          type: 'boolean'
        }
      },
      not: {
        properties: {
          unusedExports: { enum: [false] },
          missingExports: { enum: [false] }
        }
      },
      anyOf: [{
        not: {
          properties: {
            unusedExports: { enum: [true] }
          }
        },
        required: ['missingExports']
      }, {
        not: {
          properties: {
            missingExports: { enum: [true] }
          }
        },
        required: ['unusedExports']
      }, {
        properties: {
          unusedExports: { enum: [true] }
        },
        required: ['unusedExports']
      }, {
        properties: {
          missingExports: { enum: [true] }
        },
        required: ['missingExports']
      }]
    }]
  },

  create: context => {
    var _ref6 = context.options[0] || {};

    const src = _ref6.src;
    var _ref6$ignoreExports = _ref6.ignoreExports;
    const ignoreExports = _ref6$ignoreExports === undefined ? [] : _ref6$ignoreExports,
          missingExports = _ref6.missingExports,
          unusedExports = _ref6.unusedExports;


    if (unusedExports && !preparationDone) {
      doPreparation(src, ignoreExports, context);
    }

    const file = context.getFilename();

    const checkExportPresence = node => {
      if (!missingExports) {
        return;
      }

      if (ignoredFiles.has(file)) {
        return;
      }

      const exportCount = exportList.get(file);
      const exportAll = exportCount.get(EXPORT_ALL_DECLARATION);
      const namespaceImports = exportCount.get(IMPORT_NAMESPACE_SPECIFIER);

      exportCount.delete(EXPORT_ALL_DECLARATION);
      exportCount.delete(IMPORT_NAMESPACE_SPECIFIER);
      if (missingExports && exportCount.size < 1) {
        // node.body[0] === 'undefined' only happens, if everything is commented out in the file
        // being linted
        context.report(node.body[0] ? node.body[0] : node, 'No exports found');
      }
      exportCount.set(EXPORT_ALL_DECLARATION, exportAll);
      exportCount.set(IMPORT_NAMESPACE_SPECIFIER, namespaceImports);
    };

    const checkUsage = (node, exportedValue) => {
      if (!unusedExports) {
        return;
      }

      if (ignoredFiles.has(file)) {
        return;
      }

      // refresh list of source files
      const srcFiles = resolveFiles(getSrc(src), ignoreExports);

      // make sure file to be linted is included in source files
      if (!srcFiles.has(file)) {
        return;
      }

      exports = exportList.get(file);

      // special case: export * from 
      const exportAll = exports.get(EXPORT_ALL_DECLARATION);
      if (typeof exportAll !== 'undefined' && exportedValue !== IMPORT_DEFAULT_SPECIFIER) {
        if (exportAll.whereUsed.size > 0) {
          return;
        }
      }

      // special case: namespace import
      const namespaceImports = exports.get(IMPORT_NAMESPACE_SPECIFIER);
      if (typeof namespaceImports !== 'undefined') {
        if (namespaceImports.whereUsed.size > 0) {
          return;
        }
      }

      const exportStatement = exports.get(exportedValue);

      const value = exportedValue === IMPORT_DEFAULT_SPECIFIER ? DEFAULT : exportedValue;

      if (typeof exportStatement !== 'undefined') {
        if (exportStatement.whereUsed.size < 1) {
          context.report(node, `exported declaration '${value}' not used within other modules`);
        }
      } else {
        context.report(node, `exported declaration '${value}' not used within other modules`);
      }
    };

    /**
     * only useful for tools like vscode-eslint
     * 
     * update lists of existing exports during runtime
     */
    const updateExportUsage = node => {
      if (ignoredFiles.has(file)) {
        return;
      }

      let exports = exportList.get(file);

      // new module has been created during runtime
      // include it in further processing
      if (typeof exports === 'undefined') {
        exports = new Map();
      }

      const newExports = new Map();
      const newExportIdentifiers = new Set();

      node.body.forEach((_ref7) => {
        let type = _ref7.type,
            declaration = _ref7.declaration,
            specifiers = _ref7.specifiers;

        if (type === EXPORT_DEFAULT_DECLARATION) {
          newExportIdentifiers.add(IMPORT_DEFAULT_SPECIFIER);
        }
        if (type === EXPORT_NAMED_DECLARATION) {
          if (specifiers.length > 0) {
            specifiers.forEach(specifier => {
              if (specifier.exported) {
                newExportIdentifiers.add(specifier.exported.name);
              }
            });
          }
          if (declaration) {
            if (declaration.type === FUNCTION_DECLARATION) {
              newExportIdentifiers.add(declaration.id.name);
            }
            if (declaration.type === VARIABLE_DECLARATION) {
              declaration.declarations.forEach((_ref8) => {
                let id = _ref8.id;

                newExportIdentifiers.add(id.name);
              });
            }
          }
        }
      });

      // old exports exist within list of new exports identifiers: add to map of new exports
      exports.forEach((value, key) => {
        if (newExportIdentifiers.has(key)) {
          newExports.set(key, value);
        }
      });

      // new export identifiers added: add to map of new exports
      newExportIdentifiers.forEach(key => {
        if (!exports.has(key)) {
          newExports.set(key, { whereUsed: new Set() });
        }
      });

      // preserve information about namespace imports
      let exportAll = exports.get(EXPORT_ALL_DECLARATION);
      let namespaceImports = exports.get(IMPORT_NAMESPACE_SPECIFIER);

      if (typeof namespaceImports === 'undefined') {
        namespaceImports = { whereUsed: new Set() };
      }

      newExports.set(EXPORT_ALL_DECLARATION, exportAll);
      newExports.set(IMPORT_NAMESPACE_SPECIFIER, namespaceImports);
      exportList.set(file, newExports);
    };

    /**
     * only useful for tools like vscode-eslint
     * 
     * update lists of existing imports during runtime
     */
    const updateImportUsage = node => {
      if (!unusedExports) {
        return;
      }

      let oldImportPaths = importList.get(file);
      if (typeof oldImportPaths === 'undefined') {
        oldImportPaths = new Map();
      }

      const oldNamespaceImports = new Set();
      const newNamespaceImports = new Set();

      const oldExportAll = new Set();
      const newExportAll = new Set();

      const oldDefaultImports = new Set();
      const newDefaultImports = new Set();

      const oldImports = new Map();
      const newImports = new Map();
      oldImportPaths.forEach((value, key) => {
        if (value.has(EXPORT_ALL_DECLARATION)) {
          oldExportAll.add(key);
        }
        if (value.has(IMPORT_NAMESPACE_SPECIFIER)) {
          oldNamespaceImports.add(key);
        }
        if (value.has(IMPORT_DEFAULT_SPECIFIER)) {
          oldDefaultImports.add(key);
        }
        value.forEach(val => {
          if (val !== IMPORT_NAMESPACE_SPECIFIER && val !== IMPORT_DEFAULT_SPECIFIER) {
            oldImports.set(val, key);
          }
        });
      });

      node.body.forEach(astNode => {
        let resolvedPath;

        // support for export { value } from 'module'
        if (astNode.type === EXPORT_NAMED_DECLARATION) {
          if (astNode.source) {
            resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
            astNode.specifiers.forEach(specifier => {
              let name;
              if (specifier.exported.name === DEFAULT) {
                name = IMPORT_DEFAULT_SPECIFIER;
              } else {
                name = specifier.local.name;
              }
              newImports.set(name, resolvedPath);
            });
          }
        }

        if (astNode.type === EXPORT_ALL_DECLARATION) {
          resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
          newExportAll.add(resolvedPath);
        }

        if (astNode.type === IMPORT_DECLARATION) {
          resolvedPath = (0, _resolve2.default)(astNode.source.raw.replace(/('|")/g, ''), context);
          if (!resolvedPath) {
            return;
          }

          if (isNodeModule(resolvedPath)) {
            return;
          }

          if (newNamespaceImportExists(astNode.specifiers)) {
            newNamespaceImports.add(resolvedPath);
          }

          if (newDefaultImportExists(astNode.specifiers)) {
            newDefaultImports.add(resolvedPath);
          }

          astNode.specifiers.forEach(specifier => {
            if (specifier.type === IMPORT_DEFAULT_SPECIFIER || specifier.type === IMPORT_NAMESPACE_SPECIFIER) {
              return;
            }
            newImports.set(specifier.imported.name, resolvedPath);
          });
        }
      });

      newExportAll.forEach(value => {
        if (!oldExportAll.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(EXPORT_ALL_DECLARATION);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(EXPORT_ALL_DECLARATION);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(EXPORT_ALL_DECLARATION, { whereUsed });
          }
        }
      });

      oldExportAll.forEach(value => {
        if (!newExportAll.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(EXPORT_ALL_DECLARATION);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(EXPORT_ALL_DECLARATION);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newDefaultImports.forEach(value => {
        if (!oldDefaultImports.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(IMPORT_DEFAULT_SPECIFIER);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(IMPORT_DEFAULT_SPECIFIER);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(IMPORT_DEFAULT_SPECIFIER, { whereUsed });
          }
        }
      });

      oldDefaultImports.forEach(value => {
        if (!newDefaultImports.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(IMPORT_DEFAULT_SPECIFIER);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(IMPORT_DEFAULT_SPECIFIER);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newNamespaceImports.forEach(value => {
        if (!oldNamespaceImports.has(value)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(IMPORT_NAMESPACE_SPECIFIER);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(IMPORT_NAMESPACE_SPECIFIER);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(IMPORT_NAMESPACE_SPECIFIER, { whereUsed });
          }
        }
      });

      oldNamespaceImports.forEach(value => {
        if (!newNamespaceImports.has(value)) {
          const imports = oldImportPaths.get(value);
          imports.delete(IMPORT_NAMESPACE_SPECIFIER);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(IMPORT_NAMESPACE_SPECIFIER);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });

      newImports.forEach((value, key) => {
        if (!oldImports.has(key)) {
          let imports = oldImportPaths.get(value);
          if (typeof imports === 'undefined') {
            imports = new Set();
          }
          imports.add(key);
          oldImportPaths.set(value, imports);

          let exports = exportList.get(value);
          let currentExport;
          if (typeof exports !== 'undefined') {
            currentExport = exports.get(key);
          } else {
            exports = new Map();
            exportList.set(value, exports);
          }

          if (typeof currentExport !== 'undefined') {
            currentExport.whereUsed.add(file);
          } else {
            const whereUsed = new Set();
            whereUsed.add(file);
            exports.set(key, { whereUsed });
          }
        }
      });

      oldImports.forEach((value, key) => {
        if (!newImports.has(key)) {
          const imports = oldImportPaths.get(value);
          imports.delete(key);

          const exports = exportList.get(value);
          if (typeof exports !== 'undefined') {
            const currentExport = exports.get(key);
            if (typeof currentExport !== 'undefined') {
              currentExport.whereUsed.delete(file);
            }
          }
        }
      });
    };

    return {
      'Program:exit': node => {
        updateExportUsage(node);
        updateImportUsage(node);
        checkExportPresence(node);
      },
      'ExportDefaultDeclaration': node => {
        checkUsage(node, IMPORT_DEFAULT_SPECIFIER);
      },
      'ExportNamedDeclaration': node => {
        node.specifiers.forEach(specifier => {
          checkUsage(node, specifier.exported.name);
        });
        if (node.declaration) {
          if (node.declaration.type === FUNCTION_DECLARATION) {
            checkUsage(node, node.declaration.id.name);
          }
          if (node.declaration.type === VARIABLE_DECLARATION) {
            node.declaration.declarations.forEach(declaration => {
              checkUsage(node, declaration.id.name);
            });
          }
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25vLXVudXNlZC1tb2R1bGVzLmpzIl0sIm5hbWVzIjpbImxpc3RGaWxlc1RvUHJvY2VzcyIsIkZpbGVFbnVtZXJhdG9yIiwicmVxdWlyZSIsInNyYyIsImUiLCJBcnJheSIsImZyb20iLCJpdGVyYXRlRmlsZXMiLCJlMSIsImUyIiwiRVhQT1JUX0RFRkFVTFRfREVDTEFSQVRJT04iLCJFWFBPUlRfTkFNRURfREVDTEFSQVRJT04iLCJFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OIiwiSU1QT1JUX0RFQ0xBUkFUSU9OIiwiSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIiLCJJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIiLCJWQVJJQUJMRV9ERUNMQVJBVElPTiIsIkZVTkNUSU9OX0RFQ0xBUkFUSU9OIiwiREVGQVVMVCIsInByZXBhcmF0aW9uRG9uZSIsImltcG9ydExpc3QiLCJNYXAiLCJleHBvcnRMaXN0IiwiaWdub3JlZEZpbGVzIiwiU2V0IiwiaXNOb2RlTW9kdWxlIiwicGF0aCIsInRlc3QiLCJyZXNvbHZlRmlsZXMiLCJpZ25vcmVFeHBvcnRzIiwic3JjRmlsZXMiLCJzcmNGaWxlTGlzdCIsImlnbm9yZWRGaWxlc0xpc3QiLCJmb3JFYWNoIiwiZmlsZW5hbWUiLCJhZGQiLCJmaWx0ZXIiLCJwcmVwYXJlSW1wb3J0c0FuZEV4cG9ydHMiLCJjb250ZXh0IiwiZXhwb3J0QWxsIiwiZmlsZSIsImV4cG9ydHMiLCJpbXBvcnRzIiwiY3VycmVudEV4cG9ydHMiLCJFeHBvcnRzIiwiZ2V0IiwiZGVwZW5kZW5jaWVzIiwicmVleHBvcnRzIiwibG9jYWxJbXBvcnRMaXN0IiwibmFtZXNwYWNlIiwiY3VycmVudEV4cG9ydEFsbCIsInZhbHVlIiwic2V0Iiwia2V5Iiwid2hlcmVVc2VkIiwicmVleHBvcnQiLCJnZXRJbXBvcnQiLCJsb2NhbEltcG9ydCIsImN1cnJlbnRWYWx1ZSIsImxvY2FsIiwiaW1wb3J0ZWRTcGVjaWZpZXJzIiwiaGFzIiwidmFsIiwiY3VycmVudEV4cG9ydCIsImRldGVybWluZVVzYWdlIiwibGlzdFZhbHVlIiwibGlzdEtleSIsImN1cnJlbnRJbXBvcnQiLCJzcGVjaWZpZXIiLCJleHBvcnRTdGF0ZW1lbnQiLCJnZXRTcmMiLCJwcm9jZXNzIiwiY3dkIiwiZG9QcmVwYXJhdGlvbiIsIm5ld05hbWVzcGFjZUltcG9ydEV4aXN0cyIsInNwZWNpZmllcnMiLCJzb21lIiwidHlwZSIsIm5ld0RlZmF1bHRJbXBvcnRFeGlzdHMiLCJtb2R1bGUiLCJtZXRhIiwiZG9jcyIsInVybCIsInNjaGVtYSIsInByb3BlcnRpZXMiLCJkZXNjcmlwdGlvbiIsIm1pbkl0ZW1zIiwiaXRlbXMiLCJtaW5MZW5ndGgiLCJtaXNzaW5nRXhwb3J0cyIsInVudXNlZEV4cG9ydHMiLCJub3QiLCJlbnVtIiwiYW55T2YiLCJyZXF1aXJlZCIsImNyZWF0ZSIsIm9wdGlvbnMiLCJnZXRGaWxlbmFtZSIsImNoZWNrRXhwb3J0UHJlc2VuY2UiLCJub2RlIiwiZXhwb3J0Q291bnQiLCJuYW1lc3BhY2VJbXBvcnRzIiwiZGVsZXRlIiwic2l6ZSIsInJlcG9ydCIsImJvZHkiLCJjaGVja1VzYWdlIiwiZXhwb3J0ZWRWYWx1ZSIsInVwZGF0ZUV4cG9ydFVzYWdlIiwibmV3RXhwb3J0cyIsIm5ld0V4cG9ydElkZW50aWZpZXJzIiwiZGVjbGFyYXRpb24iLCJsZW5ndGgiLCJleHBvcnRlZCIsIm5hbWUiLCJpZCIsImRlY2xhcmF0aW9ucyIsInVwZGF0ZUltcG9ydFVzYWdlIiwib2xkSW1wb3J0UGF0aHMiLCJvbGROYW1lc3BhY2VJbXBvcnRzIiwibmV3TmFtZXNwYWNlSW1wb3J0cyIsIm9sZEV4cG9ydEFsbCIsIm5ld0V4cG9ydEFsbCIsIm9sZERlZmF1bHRJbXBvcnRzIiwibmV3RGVmYXVsdEltcG9ydHMiLCJvbGRJbXBvcnRzIiwibmV3SW1wb3J0cyIsImFzdE5vZGUiLCJyZXNvbHZlZFBhdGgiLCJzb3VyY2UiLCJyYXciLCJyZXBsYWNlIiwiaW1wb3J0ZWQiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Z01BUkE7Ozs7OztBQVVBO0FBQ0E7QUFDQSxJQUFJQSxrQkFBSjtBQUNBLElBQUk7QUFDRixNQUFJQyxpQkFBaUJDLFFBQVEsdUNBQVIsRUFBaURELGNBQXRFO0FBQ0FELHVCQUFxQixVQUFVRyxHQUFWLEVBQWU7QUFDbEMsUUFBSUMsSUFBSSxJQUFJSCxjQUFKLEVBQVI7QUFDQSxXQUFPSSxNQUFNQyxJQUFOLENBQVdGLEVBQUVHLFlBQUYsQ0FBZUosR0FBZixDQUFYLENBQVA7QUFDRCxHQUhEO0FBSUQsQ0FORCxDQU1FLE9BQU9LLEVBQVAsRUFBVztBQUNYLE1BQUk7QUFDRlIseUJBQXFCRSxRQUFRLDRCQUFSLEVBQXNDRixrQkFBM0Q7QUFDRCxHQUZELENBRUUsT0FBT1MsRUFBUCxFQUFXO0FBQ1hULHlCQUFxQkUsUUFBUSwyQkFBUixFQUFxQ0Ysa0JBQTFEO0FBQ0Q7QUFDRjs7QUFFRCxNQUFNVSw2QkFBNkIsMEJBQW5DO0FBQ0EsTUFBTUMsMkJBQTJCLHdCQUFqQztBQUNBLE1BQU1DLHlCQUF5QixzQkFBL0I7QUFDQSxNQUFNQyxxQkFBcUIsbUJBQTNCO0FBQ0EsTUFBTUMsNkJBQTZCLDBCQUFuQztBQUNBLE1BQU1DLDJCQUEyQix3QkFBakM7QUFDQSxNQUFNQyx1QkFBdUIscUJBQTdCO0FBQ0EsTUFBTUMsdUJBQXVCLHFCQUE3QjtBQUNBLE1BQU1DLFVBQVUsU0FBaEI7O0FBRUEsSUFBSUMsa0JBQWtCLEtBQXRCO0FBQ0EsTUFBTUMsYUFBYSxJQUFJQyxHQUFKLEVBQW5CO0FBQ0EsTUFBTUMsYUFBYSxJQUFJRCxHQUFKLEVBQW5CO0FBQ0EsTUFBTUUsZUFBZSxJQUFJQyxHQUFKLEVBQXJCOztBQUVBLE1BQU1DLGVBQWVDLFFBQVE7QUFDM0IsU0FBTyxzQkFBcUJDLElBQXJCLENBQTBCRCxJQUExQjtBQUFQO0FBQ0QsQ0FGRDs7QUFJQTs7Ozs7QUFLQSxNQUFNRSxlQUFlLENBQUN6QixHQUFELEVBQU0wQixhQUFOLEtBQXdCO0FBQzNDLFFBQU1DLFdBQVcsSUFBSU4sR0FBSixFQUFqQjtBQUNBLFFBQU1PLGNBQWMvQixtQkFBbUJHLEdBQW5CLENBQXBCOztBQUVBO0FBQ0EsUUFBTTZCLG1CQUFvQmhDLG1CQUFtQjZCLGFBQW5CLENBQTFCO0FBQ0FHLG1CQUFpQkMsT0FBakIsQ0FBeUI7QUFBQSxRQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxXQUFrQlgsYUFBYVksR0FBYixDQUFpQkQsUUFBakIsQ0FBbEI7QUFBQSxHQUF6Qjs7QUFFQTtBQUNBSCxjQUFZSyxNQUFaLENBQW1CO0FBQUEsUUFBR0YsUUFBSCxTQUFHQSxRQUFIO0FBQUEsV0FBa0IsQ0FBQ1QsYUFBYVMsUUFBYixDQUFuQjtBQUFBLEdBQW5CLEVBQThERCxPQUE5RCxDQUFzRSxXQUFrQjtBQUFBLFFBQWZDLFFBQWUsU0FBZkEsUUFBZTs7QUFDdEZKLGFBQVNLLEdBQVQsQ0FBYUQsUUFBYjtBQUNELEdBRkQ7QUFHQSxTQUFPSixRQUFQO0FBQ0QsQ0FiRDs7QUFlQTs7O0FBR0EsTUFBTU8sMkJBQTJCLENBQUNQLFFBQUQsRUFBV1EsT0FBWCxLQUF1QjtBQUN0RCxRQUFNQyxZQUFZLElBQUlsQixHQUFKLEVBQWxCO0FBQ0FTLFdBQVNHLE9BQVQsQ0FBaUJPLFFBQVE7QUFDdkIsVUFBTUMsVUFBVSxJQUFJcEIsR0FBSixFQUFoQjtBQUNBLFVBQU1xQixVQUFVLElBQUlyQixHQUFKLEVBQWhCO0FBQ0EsVUFBTXNCLGlCQUFpQkMsb0JBQVFDLEdBQVIsQ0FBWUwsSUFBWixFQUFrQkYsT0FBbEIsQ0FBdkI7QUFDQSxRQUFJSyxjQUFKLEVBQW9CO0FBQUEsWUFDVkcsWUFEVSxHQUN3REgsY0FEeEQsQ0FDVkcsWUFEVTtBQUFBLFlBQ0lDLFNBREosR0FDd0RKLGNBRHhELENBQ0lJLFNBREo7QUFBQSxZQUN3QkMsZUFEeEIsR0FDd0RMLGNBRHhELENBQ2VELE9BRGY7QUFBQSxZQUN5Q08sU0FEekMsR0FDd0ROLGNBRHhELENBQ3lDTSxTQUR6Qzs7QUFHbEI7O0FBQ0EsWUFBTUMsbUJBQW1CLElBQUkxQixHQUFKLEVBQXpCO0FBQ0FzQixtQkFBYWIsT0FBYixDQUFxQmtCLFNBQVM7QUFDNUJELHlCQUFpQmYsR0FBakIsQ0FBcUJnQixRQUFRekIsSUFBN0I7QUFDRCxPQUZEO0FBR0FhLGdCQUFVYSxHQUFWLENBQWNaLElBQWQsRUFBb0JVLGdCQUFwQjs7QUFFQUgsZ0JBQVVkLE9BQVYsQ0FBa0IsQ0FBQ2tCLEtBQUQsRUFBUUUsR0FBUixLQUFnQjtBQUNoQyxZQUFJQSxRQUFRbkMsT0FBWixFQUFxQjtBQUNuQnVCLGtCQUFRVyxHQUFSLENBQVlyQyx3QkFBWixFQUFzQyxFQUFFdUMsV0FBVyxJQUFJOUIsR0FBSixFQUFiLEVBQXRDO0FBQ0QsU0FGRCxNQUVPO0FBQ0xpQixrQkFBUVcsR0FBUixDQUFZQyxHQUFaLEVBQWlCLEVBQUVDLFdBQVcsSUFBSTlCLEdBQUosRUFBYixFQUFqQjtBQUNEO0FBQ0QsY0FBTStCLFdBQVlKLE1BQU1LLFNBQU4sRUFBbEI7QUFDQSxZQUFJLENBQUNELFFBQUwsRUFBZTtBQUNiO0FBQ0Q7QUFDRCxZQUFJRSxjQUFjZixRQUFRRyxHQUFSLENBQVlVLFNBQVM3QixJQUFyQixDQUFsQjtBQUNBLFlBQUlnQyxZQUFKO0FBQ0EsWUFBSVAsTUFBTVEsS0FBTixLQUFnQnpDLE9BQXBCLEVBQTZCO0FBQzNCd0MseUJBQWUzQyx3QkFBZjtBQUNELFNBRkQsTUFFTztBQUNMMkMseUJBQWVQLE1BQU1RLEtBQXJCO0FBQ0Q7QUFDRCxZQUFJLE9BQU9GLFdBQVAsS0FBdUIsV0FBM0IsRUFBd0M7QUFDdENBLHdCQUFjLElBQUlqQyxHQUFKLDhCQUFZaUMsV0FBWixJQUF5QkMsWUFBekIsR0FBZDtBQUNELFNBRkQsTUFFTztBQUNMRCx3QkFBYyxJQUFJakMsR0FBSixDQUFRLENBQUNrQyxZQUFELENBQVIsQ0FBZDtBQUNEO0FBQ0RoQixnQkFBUVUsR0FBUixDQUFZRyxTQUFTN0IsSUFBckIsRUFBMkIrQixXQUEzQjtBQUNELE9BdkJEOztBQXlCQVQsc0JBQWdCZixPQUFoQixDQUF3QixDQUFDa0IsS0FBRCxFQUFRRSxHQUFSLEtBQWdCO0FBQ3RDLFlBQUk1QixhQUFhNEIsR0FBYixDQUFKLEVBQXVCO0FBQ3JCO0FBQ0Q7QUFDRFgsZ0JBQVFVLEdBQVIsQ0FBWUMsR0FBWixFQUFpQkYsTUFBTVMsa0JBQXZCO0FBQ0QsT0FMRDtBQU1BeEMsaUJBQVdnQyxHQUFYLENBQWVaLElBQWYsRUFBcUJFLE9BQXJCOztBQUVBO0FBQ0EsVUFBSW5CLGFBQWFzQyxHQUFiLENBQWlCckIsSUFBakIsQ0FBSixFQUE0QjtBQUMxQjtBQUNEO0FBQ0RTLGdCQUFVaEIsT0FBVixDQUFrQixDQUFDa0IsS0FBRCxFQUFRRSxHQUFSLEtBQWdCO0FBQ2hDLFlBQUlBLFFBQVFuQyxPQUFaLEVBQXFCO0FBQ25CdUIsa0JBQVFXLEdBQVIsQ0FBWXJDLHdCQUFaLEVBQXNDLEVBQUV1QyxXQUFXLElBQUk5QixHQUFKLEVBQWIsRUFBdEM7QUFDRCxTQUZELE1BRU87QUFDTGlCLGtCQUFRVyxHQUFSLENBQVlDLEdBQVosRUFBaUIsRUFBRUMsV0FBVyxJQUFJOUIsR0FBSixFQUFiLEVBQWpCO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7QUFDRGlCLFlBQVFXLEdBQVIsQ0FBWXhDLHNCQUFaLEVBQW9DLEVBQUUwQyxXQUFXLElBQUk5QixHQUFKLEVBQWIsRUFBcEM7QUFDQWlCLFlBQVFXLEdBQVIsQ0FBWXRDLDBCQUFaLEVBQXdDLEVBQUV3QyxXQUFXLElBQUk5QixHQUFKLEVBQWIsRUFBeEM7QUFDQUYsZUFBVzhCLEdBQVgsQ0FBZVosSUFBZixFQUFxQkMsT0FBckI7QUFDRCxHQTlERDtBQStEQUYsWUFBVU4sT0FBVixDQUFrQixDQUFDa0IsS0FBRCxFQUFRRSxHQUFSLEtBQWdCO0FBQ2hDRixVQUFNbEIsT0FBTixDQUFjNkIsT0FBTztBQUNuQixZQUFNbkIsaUJBQWlCckIsV0FBV3VCLEdBQVgsQ0FBZWlCLEdBQWYsQ0FBdkI7QUFDQSxZQUFNQyxnQkFBZ0JwQixlQUFlRSxHQUFmLENBQW1CakMsc0JBQW5CLENBQXRCO0FBQ0FtRCxvQkFBY1QsU0FBZCxDQUF3Qm5CLEdBQXhCLENBQTRCa0IsR0FBNUI7QUFDRCxLQUpEO0FBS0QsR0FORDtBQU9ELENBeEVEOztBQTBFQTs7OztBQUlBLE1BQU1XLGlCQUFpQixNQUFNO0FBQzNCNUMsYUFBV2EsT0FBWCxDQUFtQixDQUFDZ0MsU0FBRCxFQUFZQyxPQUFaLEtBQXdCO0FBQ3pDRCxjQUFVaEMsT0FBVixDQUFrQixDQUFDa0IsS0FBRCxFQUFRRSxHQUFSLEtBQWdCO0FBQ2hDLFlBQU1aLFVBQVVuQixXQUFXdUIsR0FBWCxDQUFlUSxHQUFmLENBQWhCO0FBQ0EsVUFBSSxPQUFPWixPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2xDVSxjQUFNbEIsT0FBTixDQUFja0MsaUJBQWlCO0FBQzdCLGNBQUlDLFNBQUo7QUFDQSxjQUFJRCxrQkFBa0JyRCwwQkFBdEIsRUFBa0Q7QUFDaERzRCx3QkFBWXRELDBCQUFaO0FBQ0QsV0FGRCxNQUVPLElBQUlxRCxrQkFBa0JwRCx3QkFBdEIsRUFBZ0Q7QUFDckRxRCx3QkFBWXJELHdCQUFaO0FBQ0QsV0FGTSxNQUVBO0FBQ0xxRCx3QkFBWUQsYUFBWjtBQUNEO0FBQ0QsY0FBSSxPQUFPQyxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQ3BDLGtCQUFNQyxrQkFBa0I1QixRQUFRSSxHQUFSLENBQVl1QixTQUFaLENBQXhCO0FBQ0EsZ0JBQUksT0FBT0MsZUFBUCxLQUEyQixXQUEvQixFQUE0QztBQUFBLG9CQUNsQ2YsU0FEa0MsR0FDcEJlLGVBRG9CLENBQ2xDZixTQURrQzs7QUFFMUNBLHdCQUFVbkIsR0FBVixDQUFjK0IsT0FBZDtBQUNBekIsc0JBQVFXLEdBQVIsQ0FBWWdCLFNBQVosRUFBdUIsRUFBRWQsU0FBRixFQUF2QjtBQUNEO0FBQ0Y7QUFDRixTQWpCRDtBQWtCRDtBQUNGLEtBdEJEO0FBdUJELEdBeEJEO0FBeUJELENBMUJEOztBQTRCQSxNQUFNZ0IsU0FBU25FLE9BQU87QUFDcEIsTUFBSUEsR0FBSixFQUFTO0FBQ1AsV0FBT0EsR0FBUDtBQUNEO0FBQ0QsU0FBTyxDQUFDb0UsUUFBUUMsR0FBUixFQUFELENBQVA7QUFDRCxDQUxEOztBQU9BOzs7O0FBSUEsTUFBTUMsZ0JBQWdCLENBQUN0RSxHQUFELEVBQU0wQixhQUFOLEVBQXFCUyxPQUFyQixLQUFpQztBQUNyRCxRQUFNUixXQUFXRixhQUFhMEMsT0FBT25FLEdBQVAsQ0FBYixFQUEwQjBCLGFBQTFCLENBQWpCO0FBQ0FRLDJCQUF5QlAsUUFBekIsRUFBbUNRLE9BQW5DO0FBQ0EwQjtBQUNBN0Msb0JBQWtCLElBQWxCO0FBQ0QsQ0FMRDs7QUFPQSxNQUFNdUQsMkJBQTJCQyxjQUMvQkEsV0FBV0MsSUFBWCxDQUFnQjtBQUFBLE1BQUdDLElBQUgsU0FBR0EsSUFBSDtBQUFBLFNBQWNBLFNBQVMvRCwwQkFBdkI7QUFBQSxDQUFoQixDQURGOztBQUdBLE1BQU1nRSx5QkFBeUJILGNBQzdCQSxXQUFXQyxJQUFYLENBQWdCO0FBQUEsTUFBR0MsSUFBSCxTQUFHQSxJQUFIO0FBQUEsU0FBY0EsU0FBUzlELHdCQUF2QjtBQUFBLENBQWhCLENBREY7O0FBR0FnRSxPQUFPdEMsT0FBUCxHQUFpQjtBQUNmdUMsUUFBTTtBQUNKQyxVQUFNLEVBQUVDLEtBQUssdUJBQVEsbUJBQVIsQ0FBUCxFQURGO0FBRUpDLFlBQVEsQ0FBQztBQUNQQyxrQkFBWTtBQUNWakYsYUFBSztBQUNIa0YsdUJBQWEsc0RBRFY7QUFFSFIsZ0JBQU0sT0FGSDtBQUdIUyxvQkFBVSxDQUhQO0FBSUhDLGlCQUFPO0FBQ0xWLGtCQUFNLFFBREQ7QUFFTFcsdUJBQVc7QUFGTjtBQUpKLFNBREs7QUFVVjNELHVCQUFlO0FBQ2J3RCx1QkFDRSxxRkFGVztBQUdiUixnQkFBTSxPQUhPO0FBSWJTLG9CQUFVLENBSkc7QUFLYkMsaUJBQU87QUFDTFYsa0JBQU0sUUFERDtBQUVMVyx1QkFBVztBQUZOO0FBTE0sU0FWTDtBQW9CVkMsd0JBQWdCO0FBQ2RKLHVCQUFhLG9DQURDO0FBRWRSLGdCQUFNO0FBRlEsU0FwQk47QUF3QlZhLHVCQUFlO0FBQ2JMLHVCQUFhLGtDQURBO0FBRWJSLGdCQUFNO0FBRk87QUF4QkwsT0FETDtBQThCUGMsV0FBSztBQUNIUCxvQkFBWTtBQUNWTSx5QkFBZSxFQUFFRSxNQUFNLENBQUMsS0FBRCxDQUFSLEVBREw7QUFFVkgsMEJBQWdCLEVBQUVHLE1BQU0sQ0FBQyxLQUFELENBQVI7QUFGTjtBQURULE9BOUJFO0FBb0NQQyxhQUFNLENBQUM7QUFDTEYsYUFBSztBQUNIUCxzQkFBWTtBQUNWTSwyQkFBZSxFQUFFRSxNQUFNLENBQUMsSUFBRCxDQUFSO0FBREw7QUFEVCxTQURBO0FBTUxFLGtCQUFVLENBQUMsZ0JBQUQ7QUFOTCxPQUFELEVBT0g7QUFDREgsYUFBSztBQUNIUCxzQkFBWTtBQUNWSyw0QkFBZ0IsRUFBRUcsTUFBTSxDQUFDLElBQUQsQ0FBUjtBQUROO0FBRFQsU0FESjtBQU1ERSxrQkFBVSxDQUFDLGVBQUQ7QUFOVCxPQVBHLEVBY0g7QUFDRFYsb0JBQVk7QUFDVk0seUJBQWUsRUFBRUUsTUFBTSxDQUFDLElBQUQsQ0FBUjtBQURMLFNBRFg7QUFJREUsa0JBQVUsQ0FBQyxlQUFEO0FBSlQsT0FkRyxFQW1CSDtBQUNEVixvQkFBWTtBQUNWSywwQkFBZ0IsRUFBRUcsTUFBTSxDQUFDLElBQUQsQ0FBUjtBQUROLFNBRFg7QUFJREUsa0JBQVUsQ0FBQyxnQkFBRDtBQUpULE9BbkJHO0FBcENDLEtBQUQ7QUFGSixHQURTOztBQW1FZkMsVUFBUXpELFdBQVc7QUFBQSxnQkFNYkEsUUFBUTBELE9BQVIsQ0FBZ0IsQ0FBaEIsS0FBc0IsRUFOVDs7QUFBQSxVQUVmN0YsR0FGZSxTQUVmQSxHQUZlO0FBQUEsb0NBR2YwQixhQUhlO0FBQUEsVUFHZkEsYUFIZSx1Q0FHQyxFQUhEO0FBQUEsVUFJZjRELGNBSmUsU0FJZkEsY0FKZTtBQUFBLFVBS2ZDLGFBTGUsU0FLZkEsYUFMZTs7O0FBUWpCLFFBQUlBLGlCQUFpQixDQUFDdkUsZUFBdEIsRUFBdUM7QUFDckNzRCxvQkFBY3RFLEdBQWQsRUFBbUIwQixhQUFuQixFQUFrQ1MsT0FBbEM7QUFDRDs7QUFFRCxVQUFNRSxPQUFPRixRQUFRMkQsV0FBUixFQUFiOztBQUVBLFVBQU1DLHNCQUFzQkMsUUFBUTtBQUNsQyxVQUFJLENBQUNWLGNBQUwsRUFBcUI7QUFDbkI7QUFDRDs7QUFFRCxVQUFJbEUsYUFBYXNDLEdBQWIsQ0FBaUJyQixJQUFqQixDQUFKLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsWUFBTTRELGNBQWM5RSxXQUFXdUIsR0FBWCxDQUFlTCxJQUFmLENBQXBCO0FBQ0EsWUFBTUQsWUFBWTZELFlBQVl2RCxHQUFaLENBQWdCakMsc0JBQWhCLENBQWxCO0FBQ0EsWUFBTXlGLG1CQUFtQkQsWUFBWXZELEdBQVosQ0FBZ0IvQiwwQkFBaEIsQ0FBekI7O0FBRUFzRixrQkFBWUUsTUFBWixDQUFtQjFGLHNCQUFuQjtBQUNBd0Ysa0JBQVlFLE1BQVosQ0FBbUJ4RiwwQkFBbkI7QUFDQSxVQUFJMkUsa0JBQWtCVyxZQUFZRyxJQUFaLEdBQW1CLENBQXpDLEVBQTRDO0FBQzFDO0FBQ0E7QUFDQWpFLGdCQUFRa0UsTUFBUixDQUFlTCxLQUFLTSxJQUFMLENBQVUsQ0FBVixJQUFlTixLQUFLTSxJQUFMLENBQVUsQ0FBVixDQUFmLEdBQThCTixJQUE3QyxFQUFtRCxrQkFBbkQ7QUFDRDtBQUNEQyxrQkFBWWhELEdBQVosQ0FBZ0J4QyxzQkFBaEIsRUFBd0MyQixTQUF4QztBQUNBNkQsa0JBQVloRCxHQUFaLENBQWdCdEMsMEJBQWhCLEVBQTRDdUYsZ0JBQTVDO0FBQ0QsS0F0QkQ7O0FBd0JBLFVBQU1LLGFBQWEsQ0FBQ1AsSUFBRCxFQUFPUSxhQUFQLEtBQXlCO0FBQzFDLFVBQUksQ0FBQ2pCLGFBQUwsRUFBb0I7QUFDbEI7QUFDRDs7QUFFRCxVQUFJbkUsYUFBYXNDLEdBQWIsQ0FBaUJyQixJQUFqQixDQUFKLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFNVixXQUFXRixhQUFhMEMsT0FBT25FLEdBQVAsQ0FBYixFQUEwQjBCLGFBQTFCLENBQWpCOztBQUVBO0FBQ0EsVUFBSSxDQUFDQyxTQUFTK0IsR0FBVCxDQUFhckIsSUFBYixDQUFMLEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRURDLGdCQUFVbkIsV0FBV3VCLEdBQVgsQ0FBZUwsSUFBZixDQUFWOztBQUVBO0FBQ0EsWUFBTUQsWUFBWUUsUUFBUUksR0FBUixDQUFZakMsc0JBQVosQ0FBbEI7QUFDQSxVQUFJLE9BQU8yQixTQUFQLEtBQXFCLFdBQXJCLElBQW9Db0Usa0JBQWtCNUYsd0JBQTFELEVBQW9GO0FBQ2xGLFlBQUl3QixVQUFVZSxTQUFWLENBQW9CaUQsSUFBcEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDaEM7QUFDRDtBQUNGOztBQUVEO0FBQ0EsWUFBTUYsbUJBQW1CNUQsUUFBUUksR0FBUixDQUFZL0IsMEJBQVosQ0FBekI7QUFDQSxVQUFJLE9BQU91RixnQkFBUCxLQUE0QixXQUFoQyxFQUE2QztBQUMzQyxZQUFJQSxpQkFBaUIvQyxTQUFqQixDQUEyQmlELElBQTNCLEdBQWtDLENBQXRDLEVBQXlDO0FBQ3ZDO0FBQ0Q7QUFDRjs7QUFFRCxZQUFNbEMsa0JBQWtCNUIsUUFBUUksR0FBUixDQUFZOEQsYUFBWixDQUF4Qjs7QUFFQSxZQUFNeEQsUUFBUXdELGtCQUFrQjVGLHdCQUFsQixHQUE2Q0csT0FBN0MsR0FBdUR5RixhQUFyRTs7QUFFQSxVQUFJLE9BQU90QyxlQUFQLEtBQTJCLFdBQS9CLEVBQTJDO0FBQ3pDLFlBQUlBLGdCQUFnQmYsU0FBaEIsQ0FBMEJpRCxJQUExQixHQUFpQyxDQUFyQyxFQUF3QztBQUN0Q2pFLGtCQUFRa0UsTUFBUixDQUNFTCxJQURGLEVBRUcseUJBQXdCaEQsS0FBTSxpQ0FGakM7QUFJRDtBQUNGLE9BUEQsTUFPTztBQUNMYixnQkFBUWtFLE1BQVIsQ0FDRUwsSUFERixFQUVHLHlCQUF3QmhELEtBQU0saUNBRmpDO0FBSUQ7QUFDRixLQXBERDs7QUFzREE7Ozs7O0FBS0EsVUFBTXlELG9CQUFvQlQsUUFBUTtBQUNoQyxVQUFJNUUsYUFBYXNDLEdBQWIsQ0FBaUJyQixJQUFqQixDQUFKLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsVUFBSUMsVUFBVW5CLFdBQVd1QixHQUFYLENBQWVMLElBQWYsQ0FBZDs7QUFFQTtBQUNBO0FBQ0EsVUFBSSxPQUFPQyxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2xDQSxrQkFBVSxJQUFJcEIsR0FBSixFQUFWO0FBQ0Q7O0FBRUQsWUFBTXdGLGFBQWEsSUFBSXhGLEdBQUosRUFBbkI7QUFDQSxZQUFNeUYsdUJBQXVCLElBQUl0RixHQUFKLEVBQTdCOztBQUVBMkUsV0FBS00sSUFBTCxDQUFVeEUsT0FBVixDQUFrQixXQUF1QztBQUFBLFlBQXBDNEMsSUFBb0MsU0FBcENBLElBQW9DO0FBQUEsWUFBOUJrQyxXQUE4QixTQUE5QkEsV0FBOEI7QUFBQSxZQUFqQnBDLFVBQWlCLFNBQWpCQSxVQUFpQjs7QUFDdkQsWUFBSUUsU0FBU25FLDBCQUFiLEVBQXlDO0FBQ3ZDb0csK0JBQXFCM0UsR0FBckIsQ0FBeUJwQix3QkFBekI7QUFDRDtBQUNELFlBQUk4RCxTQUFTbEUsd0JBQWIsRUFBdUM7QUFDckMsY0FBSWdFLFdBQVdxQyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCckMsdUJBQVcxQyxPQUFYLENBQW1CbUMsYUFBYTtBQUM5QixrQkFBSUEsVUFBVTZDLFFBQWQsRUFBd0I7QUFDdEJILHFDQUFxQjNFLEdBQXJCLENBQXlCaUMsVUFBVTZDLFFBQVYsQ0FBbUJDLElBQTVDO0FBQ0Q7QUFDRixhQUpEO0FBS0Q7QUFDRCxjQUFJSCxXQUFKLEVBQWlCO0FBQ2YsZ0JBQUlBLFlBQVlsQyxJQUFaLEtBQXFCNUQsb0JBQXpCLEVBQStDO0FBQzdDNkYsbUNBQXFCM0UsR0FBckIsQ0FBeUI0RSxZQUFZSSxFQUFaLENBQWVELElBQXhDO0FBQ0Q7QUFDRCxnQkFBSUgsWUFBWWxDLElBQVosS0FBcUI3RCxvQkFBekIsRUFBK0M7QUFDN0MrRiwwQkFBWUssWUFBWixDQUF5Qm5GLE9BQXpCLENBQWlDLFdBQVk7QUFBQSxvQkFBVGtGLEVBQVMsU0FBVEEsRUFBUzs7QUFDM0NMLHFDQUFxQjNFLEdBQXJCLENBQXlCZ0YsR0FBR0QsSUFBNUI7QUFDRCxlQUZEO0FBR0Q7QUFDRjtBQUNGO0FBQ0YsT0F2QkQ7O0FBeUJBO0FBQ0F6RSxjQUFRUixPQUFSLENBQWdCLENBQUNrQixLQUFELEVBQVFFLEdBQVIsS0FBZ0I7QUFDOUIsWUFBSXlELHFCQUFxQmpELEdBQXJCLENBQXlCUixHQUF6QixDQUFKLEVBQW1DO0FBQ2pDd0QscUJBQVd6RCxHQUFYLENBQWVDLEdBQWYsRUFBb0JGLEtBQXBCO0FBQ0Q7QUFDRixPQUpEOztBQU1BO0FBQ0EyRCwyQkFBcUI3RSxPQUFyQixDQUE2Qm9CLE9BQU87QUFDbEMsWUFBSSxDQUFDWixRQUFRb0IsR0FBUixDQUFZUixHQUFaLENBQUwsRUFBdUI7QUFDckJ3RCxxQkFBV3pELEdBQVgsQ0FBZUMsR0FBZixFQUFvQixFQUFFQyxXQUFXLElBQUk5QixHQUFKLEVBQWIsRUFBcEI7QUFDRDtBQUNGLE9BSkQ7O0FBTUE7QUFDQSxVQUFJZSxZQUFZRSxRQUFRSSxHQUFSLENBQVlqQyxzQkFBWixDQUFoQjtBQUNBLFVBQUl5RixtQkFBbUI1RCxRQUFRSSxHQUFSLENBQVkvQiwwQkFBWixDQUF2Qjs7QUFFQSxVQUFJLE9BQU91RixnQkFBUCxLQUE0QixXQUFoQyxFQUE2QztBQUMzQ0EsMkJBQW1CLEVBQUUvQyxXQUFXLElBQUk5QixHQUFKLEVBQWIsRUFBbkI7QUFDRDs7QUFFRHFGLGlCQUFXekQsR0FBWCxDQUFleEMsc0JBQWYsRUFBdUMyQixTQUF2QztBQUNBc0UsaUJBQVd6RCxHQUFYLENBQWV0QywwQkFBZixFQUEyQ3VGLGdCQUEzQztBQUNBL0UsaUJBQVc4QixHQUFYLENBQWVaLElBQWYsRUFBcUJxRSxVQUFyQjtBQUNELEtBbEVEOztBQW9FQTs7Ozs7QUFLQSxVQUFNUSxvQkFBb0JsQixRQUFRO0FBQ2hDLFVBQUksQ0FBQ1QsYUFBTCxFQUFvQjtBQUNsQjtBQUNEOztBQUVELFVBQUk0QixpQkFBaUJsRyxXQUFXeUIsR0FBWCxDQUFlTCxJQUFmLENBQXJCO0FBQ0EsVUFBSSxPQUFPOEUsY0FBUCxLQUEwQixXQUE5QixFQUEyQztBQUN6Q0EseUJBQWlCLElBQUlqRyxHQUFKLEVBQWpCO0FBQ0Q7O0FBRUQsWUFBTWtHLHNCQUFzQixJQUFJL0YsR0FBSixFQUE1QjtBQUNBLFlBQU1nRyxzQkFBc0IsSUFBSWhHLEdBQUosRUFBNUI7O0FBRUEsWUFBTWlHLGVBQWUsSUFBSWpHLEdBQUosRUFBckI7QUFDQSxZQUFNa0csZUFBZSxJQUFJbEcsR0FBSixFQUFyQjs7QUFFQSxZQUFNbUcsb0JBQW9CLElBQUluRyxHQUFKLEVBQTFCO0FBQ0EsWUFBTW9HLG9CQUFvQixJQUFJcEcsR0FBSixFQUExQjs7QUFFQSxZQUFNcUcsYUFBYSxJQUFJeEcsR0FBSixFQUFuQjtBQUNBLFlBQU15RyxhQUFhLElBQUl6RyxHQUFKLEVBQW5CO0FBQ0FpRyxxQkFBZXJGLE9BQWYsQ0FBdUIsQ0FBQ2tCLEtBQUQsRUFBUUUsR0FBUixLQUFnQjtBQUNyQyxZQUFJRixNQUFNVSxHQUFOLENBQVVqRCxzQkFBVixDQUFKLEVBQXVDO0FBQ3JDNkcsdUJBQWF0RixHQUFiLENBQWlCa0IsR0FBakI7QUFDRDtBQUNELFlBQUlGLE1BQU1VLEdBQU4sQ0FBVS9DLDBCQUFWLENBQUosRUFBMkM7QUFDekN5Ryw4QkFBb0JwRixHQUFwQixDQUF3QmtCLEdBQXhCO0FBQ0Q7QUFDRCxZQUFJRixNQUFNVSxHQUFOLENBQVU5Qyx3QkFBVixDQUFKLEVBQXlDO0FBQ3ZDNEcsNEJBQWtCeEYsR0FBbEIsQ0FBc0JrQixHQUF0QjtBQUNEO0FBQ0RGLGNBQU1sQixPQUFOLENBQWM2QixPQUFPO0FBQ25CLGNBQUlBLFFBQVFoRCwwQkFBUixJQUNBZ0QsUUFBUS9DLHdCQURaLEVBQ3NDO0FBQ2pDOEcsdUJBQVd6RSxHQUFYLENBQWVVLEdBQWYsRUFBb0JULEdBQXBCO0FBQ0Q7QUFDTCxTQUxEO0FBTUQsT0FoQkQ7O0FBa0JBOEMsV0FBS00sSUFBTCxDQUFVeEUsT0FBVixDQUFrQjhGLFdBQVc7QUFDM0IsWUFBSUMsWUFBSjs7QUFFQTtBQUNBLFlBQUlELFFBQVFsRCxJQUFSLEtBQWlCbEUsd0JBQXJCLEVBQStDO0FBQzdDLGNBQUlvSCxRQUFRRSxNQUFaLEVBQW9CO0FBQ2xCRCwyQkFBZSx1QkFBUUQsUUFBUUUsTUFBUixDQUFlQyxHQUFmLENBQW1CQyxPQUFuQixDQUEyQixRQUEzQixFQUFxQyxFQUFyQyxDQUFSLEVBQWtEN0YsT0FBbEQsQ0FBZjtBQUNBeUYsb0JBQVFwRCxVQUFSLENBQW1CMUMsT0FBbkIsQ0FBMkJtQyxhQUFhO0FBQ3RDLGtCQUFJOEMsSUFBSjtBQUNBLGtCQUFJOUMsVUFBVTZDLFFBQVYsQ0FBbUJDLElBQW5CLEtBQTRCaEcsT0FBaEMsRUFBeUM7QUFDdkNnRyx1QkFBT25HLHdCQUFQO0FBQ0QsZUFGRCxNQUVPO0FBQ0xtRyx1QkFBTzlDLFVBQVVULEtBQVYsQ0FBZ0J1RCxJQUF2QjtBQUNEO0FBQ0RZLHlCQUFXMUUsR0FBWCxDQUFlOEQsSUFBZixFQUFxQmMsWUFBckI7QUFDRCxhQVJEO0FBU0Q7QUFDRjs7QUFFRCxZQUFJRCxRQUFRbEQsSUFBUixLQUFpQmpFLHNCQUFyQixFQUE2QztBQUMzQ29ILHlCQUFlLHVCQUFRRCxRQUFRRSxNQUFSLENBQWVDLEdBQWYsQ0FBbUJDLE9BQW5CLENBQTJCLFFBQTNCLEVBQXFDLEVBQXJDLENBQVIsRUFBa0Q3RixPQUFsRCxDQUFmO0FBQ0FvRix1QkFBYXZGLEdBQWIsQ0FBaUI2RixZQUFqQjtBQUNEOztBQUVELFlBQUlELFFBQVFsRCxJQUFSLEtBQWlCaEUsa0JBQXJCLEVBQXlDO0FBQ3ZDbUgseUJBQWUsdUJBQVFELFFBQVFFLE1BQVIsQ0FBZUMsR0FBZixDQUFtQkMsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsRUFBckMsQ0FBUixFQUFrRDdGLE9BQWxELENBQWY7QUFDQSxjQUFJLENBQUMwRixZQUFMLEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBRUQsY0FBSXZHLGFBQWF1RyxZQUFiLENBQUosRUFBZ0M7QUFDOUI7QUFDRDs7QUFFRCxjQUFJdEQseUJBQXlCcUQsUUFBUXBELFVBQWpDLENBQUosRUFBa0Q7QUFDaEQ2QyxnQ0FBb0JyRixHQUFwQixDQUF3QjZGLFlBQXhCO0FBQ0Q7O0FBRUQsY0FBSWxELHVCQUF1QmlELFFBQVFwRCxVQUEvQixDQUFKLEVBQWdEO0FBQzlDaUQsOEJBQWtCekYsR0FBbEIsQ0FBc0I2RixZQUF0QjtBQUNEOztBQUVERCxrQkFBUXBELFVBQVIsQ0FBbUIxQyxPQUFuQixDQUEyQm1DLGFBQWE7QUFDdEMsZ0JBQUlBLFVBQVVTLElBQVYsS0FBbUI5RCx3QkFBbkIsSUFDQXFELFVBQVVTLElBQVYsS0FBbUIvRCwwQkFEdkIsRUFDbUQ7QUFDakQ7QUFDRDtBQUNEZ0gsdUJBQVcxRSxHQUFYLENBQWVnQixVQUFVZ0UsUUFBVixDQUFtQmxCLElBQWxDLEVBQXdDYyxZQUF4QztBQUNELFdBTkQ7QUFPRDtBQUNGLE9BbEREOztBQW9EQU4sbUJBQWF6RixPQUFiLENBQXFCa0IsU0FBUztBQUM1QixZQUFJLENBQUNzRSxhQUFhNUQsR0FBYixDQUFpQlYsS0FBakIsQ0FBTCxFQUE4QjtBQUM1QixjQUFJVCxVQUFVNEUsZUFBZXpFLEdBQWYsQ0FBbUJNLEtBQW5CLENBQWQ7QUFDQSxjQUFJLE9BQU9ULE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENBLHNCQUFVLElBQUlsQixHQUFKLEVBQVY7QUFDRDtBQUNEa0Isa0JBQVFQLEdBQVIsQ0FBWXZCLHNCQUFaO0FBQ0EwRyx5QkFBZWxFLEdBQWYsQ0FBbUJELEtBQW5CLEVBQTBCVCxPQUExQjs7QUFFQSxjQUFJRCxVQUFVbkIsV0FBV3VCLEdBQVgsQ0FBZU0sS0FBZixDQUFkO0FBQ0EsY0FBSVksYUFBSjtBQUNBLGNBQUksT0FBT3RCLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENzQiw0QkFBZ0J0QixRQUFRSSxHQUFSLENBQVlqQyxzQkFBWixDQUFoQjtBQUNELFdBRkQsTUFFTztBQUNMNkIsc0JBQVUsSUFBSXBCLEdBQUosRUFBVjtBQUNBQyx1QkFBVzhCLEdBQVgsQ0FBZUQsS0FBZixFQUFzQlYsT0FBdEI7QUFDRDs7QUFFRCxjQUFJLE9BQU9zQixhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDQSwwQkFBY1QsU0FBZCxDQUF3Qm5CLEdBQXhCLENBQTRCSyxJQUE1QjtBQUNELFdBRkQsTUFFTztBQUNMLGtCQUFNYyxZQUFZLElBQUk5QixHQUFKLEVBQWxCO0FBQ0E4QixzQkFBVW5CLEdBQVYsQ0FBY0ssSUFBZDtBQUNBQyxvQkFBUVcsR0FBUixDQUFZeEMsc0JBQVosRUFBb0MsRUFBRTBDLFNBQUYsRUFBcEM7QUFDRDtBQUNGO0FBQ0YsT0ExQkQ7O0FBNEJBbUUsbUJBQWF4RixPQUFiLENBQXFCa0IsU0FBUztBQUM1QixZQUFJLENBQUN1RSxhQUFhN0QsR0FBYixDQUFpQlYsS0FBakIsQ0FBTCxFQUE4QjtBQUM1QixnQkFBTVQsVUFBVTRFLGVBQWV6RSxHQUFmLENBQW1CTSxLQUFuQixDQUFoQjtBQUNBVCxrQkFBUTRELE1BQVIsQ0FBZTFGLHNCQUFmOztBQUVBLGdCQUFNNkIsVUFBVW5CLFdBQVd1QixHQUFYLENBQWVNLEtBQWYsQ0FBaEI7QUFDQSxjQUFJLE9BQU9WLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsa0JBQU1zQixnQkFBZ0J0QixRQUFRSSxHQUFSLENBQVlqQyxzQkFBWixDQUF0QjtBQUNBLGdCQUFJLE9BQU9tRCxhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDQSw0QkFBY1QsU0FBZCxDQUF3QmdELE1BQXhCLENBQStCOUQsSUFBL0I7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQWJEOztBQWVBb0Ysd0JBQWtCM0YsT0FBbEIsQ0FBMEJrQixTQUFTO0FBQ2pDLFlBQUksQ0FBQ3dFLGtCQUFrQjlELEdBQWxCLENBQXNCVixLQUF0QixDQUFMLEVBQW1DO0FBQ2pDLGNBQUlULFVBQVU0RSxlQUFlekUsR0FBZixDQUFtQk0sS0FBbkIsQ0FBZDtBQUNBLGNBQUksT0FBT1QsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQ0Esc0JBQVUsSUFBSWxCLEdBQUosRUFBVjtBQUNEO0FBQ0RrQixrQkFBUVAsR0FBUixDQUFZcEIsd0JBQVo7QUFDQXVHLHlCQUFlbEUsR0FBZixDQUFtQkQsS0FBbkIsRUFBMEJULE9BQTFCOztBQUVBLGNBQUlELFVBQVVuQixXQUFXdUIsR0FBWCxDQUFlTSxLQUFmLENBQWQ7QUFDQSxjQUFJWSxhQUFKO0FBQ0EsY0FBSSxPQUFPdEIsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQ3NCLDRCQUFnQnRCLFFBQVFJLEdBQVIsQ0FBWTlCLHdCQUFaLENBQWhCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wwQixzQkFBVSxJQUFJcEIsR0FBSixFQUFWO0FBQ0FDLHVCQUFXOEIsR0FBWCxDQUFlRCxLQUFmLEVBQXNCVixPQUF0QjtBQUNEOztBQUVELGNBQUksT0FBT3NCLGFBQVAsS0FBeUIsV0FBN0IsRUFBMEM7QUFDeENBLDBCQUFjVCxTQUFkLENBQXdCbkIsR0FBeEIsQ0FBNEJLLElBQTVCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsa0JBQU1jLFlBQVksSUFBSTlCLEdBQUosRUFBbEI7QUFDQThCLHNCQUFVbkIsR0FBVixDQUFjSyxJQUFkO0FBQ0FDLG9CQUFRVyxHQUFSLENBQVlyQyx3QkFBWixFQUFzQyxFQUFFdUMsU0FBRixFQUF0QztBQUNEO0FBQ0Y7QUFDRixPQTFCRDs7QUE0QkFxRSx3QkFBa0IxRixPQUFsQixDQUEwQmtCLFNBQVM7QUFDakMsWUFBSSxDQUFDeUUsa0JBQWtCL0QsR0FBbEIsQ0FBc0JWLEtBQXRCLENBQUwsRUFBbUM7QUFDakMsZ0JBQU1ULFVBQVU0RSxlQUFlekUsR0FBZixDQUFtQk0sS0FBbkIsQ0FBaEI7QUFDQVQsa0JBQVE0RCxNQUFSLENBQWV2Rix3QkFBZjs7QUFFQSxnQkFBTTBCLFVBQVVuQixXQUFXdUIsR0FBWCxDQUFlTSxLQUFmLENBQWhCO0FBQ0EsY0FBSSxPQUFPVixPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2xDLGtCQUFNc0IsZ0JBQWdCdEIsUUFBUUksR0FBUixDQUFZOUIsd0JBQVosQ0FBdEI7QUFDQSxnQkFBSSxPQUFPZ0QsYUFBUCxLQUF5QixXQUE3QixFQUEwQztBQUN4Q0EsNEJBQWNULFNBQWQsQ0FBd0JnRCxNQUF4QixDQUErQjlELElBQS9CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FiRDs7QUFlQWdGLDBCQUFvQnZGLE9BQXBCLENBQTRCa0IsU0FBUztBQUNuQyxZQUFJLENBQUNvRSxvQkFBb0IxRCxHQUFwQixDQUF3QlYsS0FBeEIsQ0FBTCxFQUFxQztBQUNuQyxjQUFJVCxVQUFVNEUsZUFBZXpFLEdBQWYsQ0FBbUJNLEtBQW5CLENBQWQ7QUFDQSxjQUFJLE9BQU9ULE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENBLHNCQUFVLElBQUlsQixHQUFKLEVBQVY7QUFDRDtBQUNEa0Isa0JBQVFQLEdBQVIsQ0FBWXJCLDBCQUFaO0FBQ0F3Ryx5QkFBZWxFLEdBQWYsQ0FBbUJELEtBQW5CLEVBQTBCVCxPQUExQjs7QUFFQSxjQUFJRCxVQUFVbkIsV0FBV3VCLEdBQVgsQ0FBZU0sS0FBZixDQUFkO0FBQ0EsY0FBSVksYUFBSjtBQUNBLGNBQUksT0FBT3RCLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENzQiw0QkFBZ0J0QixRQUFRSSxHQUFSLENBQVkvQiwwQkFBWixDQUFoQjtBQUNELFdBRkQsTUFFTztBQUNMMkIsc0JBQVUsSUFBSXBCLEdBQUosRUFBVjtBQUNBQyx1QkFBVzhCLEdBQVgsQ0FBZUQsS0FBZixFQUFzQlYsT0FBdEI7QUFDRDs7QUFFRCxjQUFJLE9BQU9zQixhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDQSwwQkFBY1QsU0FBZCxDQUF3Qm5CLEdBQXhCLENBQTRCSyxJQUE1QjtBQUNELFdBRkQsTUFFTztBQUNMLGtCQUFNYyxZQUFZLElBQUk5QixHQUFKLEVBQWxCO0FBQ0E4QixzQkFBVW5CLEdBQVYsQ0FBY0ssSUFBZDtBQUNBQyxvQkFBUVcsR0FBUixDQUFZdEMsMEJBQVosRUFBd0MsRUFBRXdDLFNBQUYsRUFBeEM7QUFDRDtBQUNGO0FBQ0YsT0ExQkQ7O0FBNEJBaUUsMEJBQW9CdEYsT0FBcEIsQ0FBNEJrQixTQUFTO0FBQ25DLFlBQUksQ0FBQ3FFLG9CQUFvQjNELEdBQXBCLENBQXdCVixLQUF4QixDQUFMLEVBQXFDO0FBQ25DLGdCQUFNVCxVQUFVNEUsZUFBZXpFLEdBQWYsQ0FBbUJNLEtBQW5CLENBQWhCO0FBQ0FULGtCQUFRNEQsTUFBUixDQUFleEYsMEJBQWY7O0FBRUEsZ0JBQU0yQixVQUFVbkIsV0FBV3VCLEdBQVgsQ0FBZU0sS0FBZixDQUFoQjtBQUNBLGNBQUksT0FBT1YsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQyxrQkFBTXNCLGdCQUFnQnRCLFFBQVFJLEdBQVIsQ0FBWS9CLDBCQUFaLENBQXRCO0FBQ0EsZ0JBQUksT0FBT2lELGFBQVAsS0FBeUIsV0FBN0IsRUFBMEM7QUFDeENBLDRCQUFjVCxTQUFkLENBQXdCZ0QsTUFBeEIsQ0FBK0I5RCxJQUEvQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BYkQ7O0FBZUFzRixpQkFBVzdGLE9BQVgsQ0FBbUIsQ0FBQ2tCLEtBQUQsRUFBUUUsR0FBUixLQUFnQjtBQUNqQyxZQUFJLENBQUN3RSxXQUFXaEUsR0FBWCxDQUFlUixHQUFmLENBQUwsRUFBMEI7QUFDeEIsY0FBSVgsVUFBVTRFLGVBQWV6RSxHQUFmLENBQW1CTSxLQUFuQixDQUFkO0FBQ0EsY0FBSSxPQUFPVCxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ2xDQSxzQkFBVSxJQUFJbEIsR0FBSixFQUFWO0FBQ0Q7QUFDRGtCLGtCQUFRUCxHQUFSLENBQVlrQixHQUFaO0FBQ0FpRSx5QkFBZWxFLEdBQWYsQ0FBbUJELEtBQW5CLEVBQTBCVCxPQUExQjs7QUFFQSxjQUFJRCxVQUFVbkIsV0FBV3VCLEdBQVgsQ0FBZU0sS0FBZixDQUFkO0FBQ0EsY0FBSVksYUFBSjtBQUNBLGNBQUksT0FBT3RCLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENzQiw0QkFBZ0J0QixRQUFRSSxHQUFSLENBQVlRLEdBQVosQ0FBaEI7QUFDRCxXQUZELE1BRU87QUFDTFosc0JBQVUsSUFBSXBCLEdBQUosRUFBVjtBQUNBQyx1QkFBVzhCLEdBQVgsQ0FBZUQsS0FBZixFQUFzQlYsT0FBdEI7QUFDRDs7QUFFRCxjQUFJLE9BQU9zQixhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDQSwwQkFBY1QsU0FBZCxDQUF3Qm5CLEdBQXhCLENBQTRCSyxJQUE1QjtBQUNELFdBRkQsTUFFTztBQUNMLGtCQUFNYyxZQUFZLElBQUk5QixHQUFKLEVBQWxCO0FBQ0E4QixzQkFBVW5CLEdBQVYsQ0FBY0ssSUFBZDtBQUNBQyxvQkFBUVcsR0FBUixDQUFZQyxHQUFaLEVBQWlCLEVBQUVDLFNBQUYsRUFBakI7QUFDRDtBQUNGO0FBQ0YsT0ExQkQ7O0FBNEJBdUUsaUJBQVc1RixPQUFYLENBQW1CLENBQUNrQixLQUFELEVBQVFFLEdBQVIsS0FBZ0I7QUFDakMsWUFBSSxDQUFDeUUsV0FBV2pFLEdBQVgsQ0FBZVIsR0FBZixDQUFMLEVBQTBCO0FBQ3hCLGdCQUFNWCxVQUFVNEUsZUFBZXpFLEdBQWYsQ0FBbUJNLEtBQW5CLENBQWhCO0FBQ0FULGtCQUFRNEQsTUFBUixDQUFlakQsR0FBZjs7QUFFQSxnQkFBTVosVUFBVW5CLFdBQVd1QixHQUFYLENBQWVNLEtBQWYsQ0FBaEI7QUFDQSxjQUFJLE9BQU9WLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsa0JBQU1zQixnQkFBZ0J0QixRQUFRSSxHQUFSLENBQVlRLEdBQVosQ0FBdEI7QUFDQSxnQkFBSSxPQUFPVSxhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDQSw0QkFBY1QsU0FBZCxDQUF3QmdELE1BQXhCLENBQStCOUQsSUFBL0I7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQWJEO0FBY0QsS0F0UUQ7O0FBd1FBLFdBQU87QUFDTCxzQkFBZ0IyRCxRQUFRO0FBQ3RCUywwQkFBa0JULElBQWxCO0FBQ0FrQiwwQkFBa0JsQixJQUFsQjtBQUNBRCw0QkFBb0JDLElBQXBCO0FBQ0QsT0FMSTtBQU1MLGtDQUE0QkEsUUFBUTtBQUNsQ08sbUJBQVdQLElBQVgsRUFBaUJwRix3QkFBakI7QUFDRCxPQVJJO0FBU0wsZ0NBQTBCb0YsUUFBUTtBQUNoQ0EsYUFBS3hCLFVBQUwsQ0FBZ0IxQyxPQUFoQixDQUF3Qm1DLGFBQWE7QUFDakNzQyxxQkFBV1AsSUFBWCxFQUFpQi9CLFVBQVU2QyxRQUFWLENBQW1CQyxJQUFwQztBQUNILFNBRkQ7QUFHQSxZQUFJZixLQUFLWSxXQUFULEVBQXNCO0FBQ3BCLGNBQUlaLEtBQUtZLFdBQUwsQ0FBaUJsQyxJQUFqQixLQUEwQjVELG9CQUE5QixFQUFvRDtBQUNsRHlGLHVCQUFXUCxJQUFYLEVBQWlCQSxLQUFLWSxXQUFMLENBQWlCSSxFQUFqQixDQUFvQkQsSUFBckM7QUFDRDtBQUNELGNBQUlmLEtBQUtZLFdBQUwsQ0FBaUJsQyxJQUFqQixLQUEwQjdELG9CQUE5QixFQUFvRDtBQUNsRG1GLGlCQUFLWSxXQUFMLENBQWlCSyxZQUFqQixDQUE4Qm5GLE9BQTlCLENBQXNDOEUsZUFBZTtBQUNuREwseUJBQVdQLElBQVgsRUFBaUJZLFlBQVlJLEVBQVosQ0FBZUQsSUFBaEM7QUFDRCxhQUZEO0FBR0Q7QUFDRjtBQUNGO0FBdkJJLEtBQVA7QUF5QkQ7QUE5Z0JjLENBQWpCIiwiZmlsZSI6InJ1bGVzL25vLXVudXNlZC1tb2R1bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IEVuc3VyZXMgdGhhdCBtb2R1bGVzIGNvbnRhaW4gZXhwb3J0cyBhbmQvb3IgYWxsXG4gKiBtb2R1bGVzIGFyZSBjb25zdW1lZCB3aXRoaW4gb3RoZXIgbW9kdWxlcy5cbiAqIEBhdXRob3IgUmVuw6kgRmVybWFublxuICovXG5cbmltcG9ydCBFeHBvcnRzIGZyb20gJy4uL0V4cG9ydE1hcCdcbmltcG9ydCByZXNvbHZlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvcmVzb2x2ZSdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8vIGVzbGludC9saWIvdXRpbC9nbG9iLXV0aWwgaGFzIGJlZW4gbW92ZWQgdG8gZXNsaW50L2xpYi91dGlsL2dsb2ItdXRpbHMgd2l0aCB2ZXJzaW9uIDUuM1xuLy8gYW5kIGhhcyBiZWVuIG1vdmVkIHRvIGVzbGludC9saWIvY2xpLWVuZ2luZS9maWxlLWVudW1lcmF0b3IgaW4gdmVyc2lvbiA2XG5sZXQgbGlzdEZpbGVzVG9Qcm9jZXNzXG50cnkge1xuICB2YXIgRmlsZUVudW1lcmF0b3IgPSByZXF1aXJlKCdlc2xpbnQvbGliL2NsaS1lbmdpbmUvZmlsZS1lbnVtZXJhdG9yJykuRmlsZUVudW1lcmF0b3JcbiAgbGlzdEZpbGVzVG9Qcm9jZXNzID0gZnVuY3Rpb24gKHNyYykge1xuICAgIHZhciBlID0gbmV3IEZpbGVFbnVtZXJhdG9yKClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShlLml0ZXJhdGVGaWxlcyhzcmMpKVxuICB9XG59IGNhdGNoIChlMSkge1xuICB0cnkge1xuICAgIGxpc3RGaWxlc1RvUHJvY2VzcyA9IHJlcXVpcmUoJ2VzbGludC9saWIvdXRpbC9nbG9iLXV0aWxzJykubGlzdEZpbGVzVG9Qcm9jZXNzXG4gIH0gY2F0Y2ggKGUyKSB7XG4gICAgbGlzdEZpbGVzVG9Qcm9jZXNzID0gcmVxdWlyZSgnZXNsaW50L2xpYi91dGlsL2dsb2ItdXRpbCcpLmxpc3RGaWxlc1RvUHJvY2Vzc1xuICB9XG59XG5cbmNvbnN0IEVYUE9SVF9ERUZBVUxUX0RFQ0xBUkFUSU9OID0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbidcbmNvbnN0IEVYUE9SVF9OQU1FRF9ERUNMQVJBVElPTiA9ICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJ1xuY29uc3QgRVhQT1JUX0FMTF9ERUNMQVJBVElPTiA9ICdFeHBvcnRBbGxEZWNsYXJhdGlvbidcbmNvbnN0IElNUE9SVF9ERUNMQVJBVElPTiA9ICdJbXBvcnREZWNsYXJhdGlvbidcbmNvbnN0IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSID0gJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcidcbmNvbnN0IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUiA9ICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJ1xuY29uc3QgVkFSSUFCTEVfREVDTEFSQVRJT04gPSAnVmFyaWFibGVEZWNsYXJhdGlvbidcbmNvbnN0IEZVTkNUSU9OX0RFQ0xBUkFUSU9OID0gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nXG5jb25zdCBERUZBVUxUID0gJ2RlZmF1bHQnXG5cbmxldCBwcmVwYXJhdGlvbkRvbmUgPSBmYWxzZVxuY29uc3QgaW1wb3J0TGlzdCA9IG5ldyBNYXAoKVxuY29uc3QgZXhwb3J0TGlzdCA9IG5ldyBNYXAoKVxuY29uc3QgaWdub3JlZEZpbGVzID0gbmV3IFNldCgpXG5cbmNvbnN0IGlzTm9kZU1vZHVsZSA9IHBhdGggPT4ge1xuICByZXR1cm4gL1xcLyhub2RlX21vZHVsZXMpXFwvLy50ZXN0KHBhdGgpXG59XG5cbi8qKlxuICogcmVhZCBhbGwgZmlsZXMgbWF0Y2hpbmcgdGhlIHBhdHRlcm5zIGluIHNyYyBhbmQgaWdub3JlRXhwb3J0c1xuICpcbiAqIHJldHVybiBhbGwgZmlsZXMgbWF0Y2hpbmcgc3JjIHBhdHRlcm4sIHdoaWNoIGFyZSBub3QgbWF0Y2hpbmcgdGhlIGlnbm9yZUV4cG9ydHMgcGF0dGVyblxuICovXG5jb25zdCByZXNvbHZlRmlsZXMgPSAoc3JjLCBpZ25vcmVFeHBvcnRzKSA9PiB7XG4gIGNvbnN0IHNyY0ZpbGVzID0gbmV3IFNldCgpXG4gIGNvbnN0IHNyY0ZpbGVMaXN0ID0gbGlzdEZpbGVzVG9Qcm9jZXNzKHNyYylcblxuICAvLyBwcmVwYXJlIGxpc3Qgb2YgaWdub3JlZCBmaWxlc1xuICBjb25zdCBpZ25vcmVkRmlsZXNMaXN0ID0gIGxpc3RGaWxlc1RvUHJvY2VzcyhpZ25vcmVFeHBvcnRzKVxuICBpZ25vcmVkRmlsZXNMaXN0LmZvckVhY2goKHsgZmlsZW5hbWUgfSkgPT4gaWdub3JlZEZpbGVzLmFkZChmaWxlbmFtZSkpXG5cbiAgLy8gcHJlcGFyZSBsaXN0IG9mIHNvdXJjZSBmaWxlcywgZG9uJ3QgY29uc2lkZXIgZmlsZXMgZnJvbSBub2RlX21vZHVsZXNcbiAgc3JjRmlsZUxpc3QuZmlsdGVyKCh7IGZpbGVuYW1lIH0pID0+ICFpc05vZGVNb2R1bGUoZmlsZW5hbWUpKS5mb3JFYWNoKCh7IGZpbGVuYW1lIH0pID0+IHtcbiAgICBzcmNGaWxlcy5hZGQoZmlsZW5hbWUpXG4gIH0pXG4gIHJldHVybiBzcmNGaWxlc1xufVxuXG4vKipcbiAqIHBhcnNlIGFsbCBzb3VyY2UgZmlsZXMgYW5kIGJ1aWxkIHVwIDIgbWFwcyBjb250YWluaW5nIHRoZSBleGlzdGluZyBpbXBvcnRzIGFuZCBleHBvcnRzXG4gKi9cbmNvbnN0IHByZXBhcmVJbXBvcnRzQW5kRXhwb3J0cyA9IChzcmNGaWxlcywgY29udGV4dCkgPT4ge1xuICBjb25zdCBleHBvcnRBbGwgPSBuZXcgTWFwKClcbiAgc3JjRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBjb25zdCBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgY29uc3QgaW1wb3J0cyA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGN1cnJlbnRFeHBvcnRzID0gRXhwb3J0cy5nZXQoZmlsZSwgY29udGV4dClcbiAgICBpZiAoY3VycmVudEV4cG9ydHMpIHtcbiAgICAgIGNvbnN0IHsgZGVwZW5kZW5jaWVzLCByZWV4cG9ydHMsIGltcG9ydHM6IGxvY2FsSW1wb3J0TGlzdCwgbmFtZXNwYWNlICB9ID0gY3VycmVudEV4cG9ydHNcblxuICAgICAgLy8gZGVwZW5kZW5jaWVzID09PSBleHBvcnQgKiBmcm9tIFxuICAgICAgY29uc3QgY3VycmVudEV4cG9ydEFsbCA9IG5ldyBTZXQoKVxuICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBjdXJyZW50RXhwb3J0QWxsLmFkZCh2YWx1ZSgpLnBhdGgpXG4gICAgICB9KVxuICAgICAgZXhwb3J0QWxsLnNldChmaWxlLCBjdXJyZW50RXhwb3J0QWxsKVxuXG4gICAgICByZWV4cG9ydHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBERUZBVUxUKSB7XG4gICAgICAgICAgZXhwb3J0cy5zZXQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSLCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwb3J0cy5zZXQoa2V5LCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVleHBvcnQgPSAgdmFsdWUuZ2V0SW1wb3J0KClcbiAgICAgICAgaWYgKCFyZWV4cG9ydCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBsb2NhbEltcG9ydCA9IGltcG9ydHMuZ2V0KHJlZXhwb3J0LnBhdGgpXG4gICAgICAgIGxldCBjdXJyZW50VmFsdWVcbiAgICAgICAgaWYgKHZhbHVlLmxvY2FsID09PSBERUZBVUxUKSB7XG4gICAgICAgICAgY3VycmVudFZhbHVlID0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VycmVudFZhbHVlID0gdmFsdWUubG9jYWxcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxvY2FsSW1wb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGxvY2FsSW1wb3J0ID0gbmV3IFNldChbLi4ubG9jYWxJbXBvcnQsIGN1cnJlbnRWYWx1ZV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYWxJbXBvcnQgPSBuZXcgU2V0KFtjdXJyZW50VmFsdWVdKVxuICAgICAgICB9XG4gICAgICAgIGltcG9ydHMuc2V0KHJlZXhwb3J0LnBhdGgsIGxvY2FsSW1wb3J0KVxuICAgICAgfSlcblxuICAgICAgbG9jYWxJbXBvcnRMaXN0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGlzTm9kZU1vZHVsZShrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaW1wb3J0cy5zZXQoa2V5LCB2YWx1ZS5pbXBvcnRlZFNwZWNpZmllcnMpXG4gICAgICB9KVxuICAgICAgaW1wb3J0TGlzdC5zZXQoZmlsZSwgaW1wb3J0cylcblxuICAgICAgLy8gYnVpbGQgdXAgZXhwb3J0IGxpc3Qgb25seSwgaWYgZmlsZSBpcyBub3QgaWdub3JlZFxuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBuYW1lc3BhY2UuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSBERUZBVUxUKSB7XG4gICAgICAgICAgZXhwb3J0cy5zZXQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSLCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwb3J0cy5zZXQoa2V5LCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGV4cG9ydHMuc2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04sIHsgd2hlcmVVc2VkOiBuZXcgU2V0KCkgfSlcbiAgICBleHBvcnRzLnNldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUiwgeyB3aGVyZVVzZWQ6IG5ldyBTZXQoKSB9KVxuICAgIGV4cG9ydExpc3Quc2V0KGZpbGUsIGV4cG9ydHMpXG4gIH0pXG4gIGV4cG9ydEFsbC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgdmFsdWUuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEV4cG9ydHMgPSBleHBvcnRMaXN0LmdldCh2YWwpXG4gICAgICBjb25zdCBjdXJyZW50RXhwb3J0ID0gY3VycmVudEV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICBjdXJyZW50RXhwb3J0LndoZXJlVXNlZC5hZGQoa2V5KVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICogdHJhdmVyc2UgdGhyb3VnaCBhbGwgaW1wb3J0cyBhbmQgYWRkIHRoZSByZXNwZWN0aXZlIHBhdGggdG8gdGhlIHdoZXJlVXNlZC1saXN0IFxuICogb2YgdGhlIGNvcnJlc3BvbmRpbmcgZXhwb3J0XG4gKi9cbmNvbnN0IGRldGVybWluZVVzYWdlID0gKCkgPT4ge1xuICBpbXBvcnRMaXN0LmZvckVhY2goKGxpc3RWYWx1ZSwgbGlzdEtleSkgPT4ge1xuICAgIGxpc3RWYWx1ZS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQoa2V5KVxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGN1cnJlbnRJbXBvcnQgPT4ge1xuICAgICAgICAgIGxldCBzcGVjaWZpZXJcbiAgICAgICAgICBpZiAoY3VycmVudEltcG9ydCA9PT0gSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgIHNwZWNpZmllciA9IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSXG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW1wb3J0ID09PSBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgIHNwZWNpZmllciA9IElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUlxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzcGVjaWZpZXIgPSBjdXJyZW50SW1wb3J0XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2Ygc3BlY2lmaWVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgZXhwb3J0U3RhdGVtZW50ID0gZXhwb3J0cy5nZXQoc3BlY2lmaWVyKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRTdGF0ZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgd2hlcmVVc2VkIH0gPSBleHBvcnRTdGF0ZW1lbnRcbiAgICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChsaXN0S2V5KVxuICAgICAgICAgICAgICBleHBvcnRzLnNldChzcGVjaWZpZXIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IGdldFNyYyA9IHNyYyA9PiB7XG4gIGlmIChzcmMpIHtcbiAgICByZXR1cm4gc3JjXG4gIH1cbiAgcmV0dXJuIFtwcm9jZXNzLmN3ZCgpXVxufVxuXG4vKipcbiAqIHByZXBhcmUgdGhlIGxpc3RzIG9mIGV4aXN0aW5nIGltcG9ydHMgYW5kIGV4cG9ydHMgLSBzaG91bGQgb25seSBiZSBleGVjdXRlZCBvbmNlIGF0XG4gKiB0aGUgc3RhcnQgb2YgYSBuZXcgZXNsaW50IHJ1blxuICovXG5jb25zdCBkb1ByZXBhcmF0aW9uID0gKHNyYywgaWdub3JlRXhwb3J0cywgY29udGV4dCkgPT4ge1xuICBjb25zdCBzcmNGaWxlcyA9IHJlc29sdmVGaWxlcyhnZXRTcmMoc3JjKSwgaWdub3JlRXhwb3J0cylcbiAgcHJlcGFyZUltcG9ydHNBbmRFeHBvcnRzKHNyY0ZpbGVzLCBjb250ZXh0KVxuICBkZXRlcm1pbmVVc2FnZSgpXG4gIHByZXBhcmF0aW9uRG9uZSA9IHRydWVcbn1cblxuY29uc3QgbmV3TmFtZXNwYWNlSW1wb3J0RXhpc3RzID0gc3BlY2lmaWVycyA9PlxuICBzcGVjaWZpZXJzLnNvbWUoKHsgdHlwZSB9KSA9PiB0eXBlID09PSBJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUilcblxuY29uc3QgbmV3RGVmYXVsdEltcG9ydEV4aXN0cyA9IHNwZWNpZmllcnMgPT5cbiAgc3BlY2lmaWVycy5zb21lKCh7IHR5cGUgfSkgPT4gdHlwZSA9PT0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHsgdXJsOiBkb2NzVXJsKCduby11bnVzZWQtbW9kdWxlcycpIH0sXG4gICAgc2NoZW1hOiBbe1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBzcmM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZpbGVzL3BhdGhzIHRvIGJlIGFuYWx5emVkIChvbmx5IGZvciB1bnVzZWQgZXhwb3J0cyknLFxuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgbWluSXRlbXM6IDEsXG4gICAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlnbm9yZUV4cG9ydHM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAgICdmaWxlcy9wYXRocyBmb3Igd2hpY2ggdW51c2VkIGV4cG9ydHMgd2lsbCBub3QgYmUgcmVwb3J0ZWQgKGUuZyBtb2R1bGUgZW50cnkgcG9pbnRzKScsXG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBtaW5JdGVtczogMSxcbiAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWlzc2luZ0V4cG9ydHM6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ3JlcG9ydCBtb2R1bGVzIHdpdGhvdXQgYW55IGV4cG9ydHMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgfSxcbiAgICAgICAgdW51c2VkRXhwb3J0czoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAncmVwb3J0IGV4cG9ydHMgd2l0aG91dCBhbnkgdXNhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBub3Q6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVudXNlZEV4cG9ydHM6IHsgZW51bTogW2ZhbHNlXSB9LFxuICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFtmYWxzZV0gfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhbnlPZjpbe1xuICAgICAgICBub3Q6IHtcbiAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICB1bnVzZWRFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ21pc3NpbmdFeHBvcnRzJ10sXG4gICAgICB9LCB7XG4gICAgICAgIG5vdDoge1xuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ3VudXNlZEV4cG9ydHMnXSxcbiAgICAgIH0sIHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHVudXNlZEV4cG9ydHM6IHsgZW51bTogW3RydWVdIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVpcmVkOiBbJ3VudXNlZEV4cG9ydHMnXSxcbiAgICAgIH0sIHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIG1pc3NpbmdFeHBvcnRzOiB7IGVudW06IFt0cnVlXSB9LFxuICAgICAgICB9LFxuICAgICAgICByZXF1aXJlZDogWydtaXNzaW5nRXhwb3J0cyddLFxuICAgICAgfV0sXG4gICAgfV0sXG4gIH0sXG5cbiAgY3JlYXRlOiBjb250ZXh0ID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzcmMsXG4gICAgICBpZ25vcmVFeHBvcnRzID0gW10sXG4gICAgICBtaXNzaW5nRXhwb3J0cyxcbiAgICAgIHVudXNlZEV4cG9ydHMsXG4gICAgfSA9IGNvbnRleHQub3B0aW9uc1swXSB8fCB7fVxuXG4gICAgaWYgKHVudXNlZEV4cG9ydHMgJiYgIXByZXBhcmF0aW9uRG9uZSkge1xuICAgICAgZG9QcmVwYXJhdGlvbihzcmMsIGlnbm9yZUV4cG9ydHMsIGNvbnRleHQpXG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IGNvbnRleHQuZ2V0RmlsZW5hbWUoKVxuXG4gICAgY29uc3QgY2hlY2tFeHBvcnRQcmVzZW5jZSA9IG5vZGUgPT4ge1xuICAgICAgaWYgKCFtaXNzaW5nRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cG9ydENvdW50ID0gZXhwb3J0TGlzdC5nZXQoZmlsZSlcbiAgICAgIGNvbnN0IGV4cG9ydEFsbCA9IGV4cG9ydENvdW50LmdldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKVxuICAgICAgY29uc3QgbmFtZXNwYWNlSW1wb3J0cyA9IGV4cG9ydENvdW50LmdldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUilcblxuICAgICAgZXhwb3J0Q291bnQuZGVsZXRlKEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICBleHBvcnRDb3VudC5kZWxldGUoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG4gICAgICBpZiAobWlzc2luZ0V4cG9ydHMgJiYgZXhwb3J0Q291bnQuc2l6ZSA8IDEpIHtcbiAgICAgICAgLy8gbm9kZS5ib2R5WzBdID09PSAndW5kZWZpbmVkJyBvbmx5IGhhcHBlbnMsIGlmIGV2ZXJ5dGhpbmcgaXMgY29tbWVudGVkIG91dCBpbiB0aGUgZmlsZVxuICAgICAgICAvLyBiZWluZyBsaW50ZWRcbiAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZS5ib2R5WzBdID8gbm9kZS5ib2R5WzBdIDogbm9kZSwgJ05vIGV4cG9ydHMgZm91bmQnKVxuICAgICAgfVxuICAgICAgZXhwb3J0Q291bnQuc2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04sIGV4cG9ydEFsbClcbiAgICAgIGV4cG9ydENvdW50LnNldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUiwgbmFtZXNwYWNlSW1wb3J0cylcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja1VzYWdlID0gKG5vZGUsIGV4cG9ydGVkVmFsdWUpID0+IHtcbiAgICAgIGlmICghdW51c2VkRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHJlZnJlc2ggbGlzdCBvZiBzb3VyY2UgZmlsZXNcbiAgICAgIGNvbnN0IHNyY0ZpbGVzID0gcmVzb2x2ZUZpbGVzKGdldFNyYyhzcmMpLCBpZ25vcmVFeHBvcnRzKVxuXG4gICAgICAvLyBtYWtlIHN1cmUgZmlsZSB0byBiZSBsaW50ZWQgaXMgaW5jbHVkZWQgaW4gc291cmNlIGZpbGVzXG4gICAgICBpZiAoIXNyY0ZpbGVzLmhhcyhmaWxlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KGZpbGUpXG5cbiAgICAgIC8vIHNwZWNpYWwgY2FzZTogZXhwb3J0ICogZnJvbSBcbiAgICAgIGNvbnN0IGV4cG9ydEFsbCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICBpZiAodHlwZW9mIGV4cG9ydEFsbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZXhwb3J0ZWRWYWx1ZSAhPT0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKSB7XG4gICAgICAgIGlmIChleHBvcnRBbGwud2hlcmVVc2VkLnNpemUgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc3BlY2lhbCBjYXNlOiBuYW1lc3BhY2UgaW1wb3J0XG4gICAgICBjb25zdCBuYW1lc3BhY2VJbXBvcnRzID0gZXhwb3J0cy5nZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG4gICAgICBpZiAodHlwZW9mIG5hbWVzcGFjZUltcG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChuYW1lc3BhY2VJbXBvcnRzLndoZXJlVXNlZC5zaXplID4gMCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cG9ydFN0YXRlbWVudCA9IGV4cG9ydHMuZ2V0KGV4cG9ydGVkVmFsdWUpXG5cbiAgICAgIGNvbnN0IHZhbHVlID0gZXhwb3J0ZWRWYWx1ZSA9PT0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSID8gREVGQVVMVCA6IGV4cG9ydGVkVmFsdWVcblxuICAgICAgaWYgKHR5cGVvZiBleHBvcnRTdGF0ZW1lbnQgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgaWYgKGV4cG9ydFN0YXRlbWVudC53aGVyZVVzZWQuc2l6ZSA8IDEpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBgZXhwb3J0ZWQgZGVjbGFyYXRpb24gJyR7dmFsdWV9JyBub3QgdXNlZCB3aXRoaW4gb3RoZXIgbW9kdWxlc2BcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgYGV4cG9ydGVkIGRlY2xhcmF0aW9uICcke3ZhbHVlfScgbm90IHVzZWQgd2l0aGluIG90aGVyIG1vZHVsZXNgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbmx5IHVzZWZ1bCBmb3IgdG9vbHMgbGlrZSB2c2NvZGUtZXNsaW50XG4gICAgICogXG4gICAgICogdXBkYXRlIGxpc3RzIG9mIGV4aXN0aW5nIGV4cG9ydHMgZHVyaW5nIHJ1bnRpbWVcbiAgICAgKi9cbiAgICBjb25zdCB1cGRhdGVFeHBvcnRVc2FnZSA9IG5vZGUgPT4ge1xuICAgICAgaWYgKGlnbm9yZWRGaWxlcy5oYXMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxldCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQoZmlsZSlcblxuICAgICAgLy8gbmV3IG1vZHVsZSBoYXMgYmVlbiBjcmVhdGVkIGR1cmluZyBydW50aW1lXG4gICAgICAvLyBpbmNsdWRlIGl0IGluIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld0V4cG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IG5ld0V4cG9ydElkZW50aWZpZXJzID0gbmV3IFNldCgpXG5cbiAgICAgIG5vZGUuYm9keS5mb3JFYWNoKCh7IHR5cGUsIGRlY2xhcmF0aW9uLCBzcGVjaWZpZXJzIH0pID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09IEVYUE9SVF9ERUZBVUxUX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgbmV3RXhwb3J0SWRlbnRpZmllcnMuYWRkKElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKHR5cGUgPT09IEVYUE9SVF9OQU1FRF9ERUNMQVJBVElPTikge1xuICAgICAgICAgIGlmIChzcGVjaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3BlY2lmaWVyLmV4cG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgbmV3RXhwb3J0SWRlbnRpZmllcnMuYWRkKHNwZWNpZmllci5leHBvcnRlZC5uYW1lKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi50eXBlID09PSBGVU5DVElPTl9ERUNMQVJBVElPTikge1xuICAgICAgICAgICAgICBuZXdFeHBvcnRJZGVudGlmaWVycy5hZGQoZGVjbGFyYXRpb24uaWQubmFtZSlcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi50eXBlID09PSBWQVJJQUJMRV9ERUNMQVJBVElPTikge1xuICAgICAgICAgICAgICBkZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuZm9yRWFjaCgoeyBpZCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3RXhwb3J0SWRlbnRpZmllcnMuYWRkKGlkLm5hbWUpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBvbGQgZXhwb3J0cyBleGlzdCB3aXRoaW4gbGlzdCBvZiBuZXcgZXhwb3J0cyBpZGVudGlmaWVyczogYWRkIHRvIG1hcCBvZiBuZXcgZXhwb3J0c1xuICAgICAgZXhwb3J0cy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmIChuZXdFeHBvcnRJZGVudGlmaWVycy5oYXMoa2V5KSkge1xuICAgICAgICAgIG5ld0V4cG9ydHMuc2V0KGtleSwgdmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIG5ldyBleHBvcnQgaWRlbnRpZmllcnMgYWRkZWQ6IGFkZCB0byBtYXAgb2YgbmV3IGV4cG9ydHNcbiAgICAgIG5ld0V4cG9ydElkZW50aWZpZXJzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKCFleHBvcnRzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgbmV3RXhwb3J0cy5zZXQoa2V5LCB7IHdoZXJlVXNlZDogbmV3IFNldCgpIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIHByZXNlcnZlIGluZm9ybWF0aW9uIGFib3V0IG5hbWVzcGFjZSBpbXBvcnRzXG4gICAgICBsZXQgZXhwb3J0QWxsID0gZXhwb3J0cy5nZXQoRVhQT1JUX0FMTF9ERUNMQVJBVElPTilcbiAgICAgIGxldCBuYW1lc3BhY2VJbXBvcnRzID0gZXhwb3J0cy5nZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG5cbiAgICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlSW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbmFtZXNwYWNlSW1wb3J0cyA9IHsgd2hlcmVVc2VkOiBuZXcgU2V0KCkgfVxuICAgICAgfVxuXG4gICAgICBuZXdFeHBvcnRzLnNldChFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OLCBleHBvcnRBbGwpXG4gICAgICBuZXdFeHBvcnRzLnNldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUiwgbmFtZXNwYWNlSW1wb3J0cylcbiAgICAgIGV4cG9ydExpc3Quc2V0KGZpbGUsIG5ld0V4cG9ydHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogb25seSB1c2VmdWwgZm9yIHRvb2xzIGxpa2UgdnNjb2RlLWVzbGludFxuICAgICAqIFxuICAgICAqIHVwZGF0ZSBsaXN0cyBvZiBleGlzdGluZyBpbXBvcnRzIGR1cmluZyBydW50aW1lXG4gICAgICovXG4gICAgY29uc3QgdXBkYXRlSW1wb3J0VXNhZ2UgPSBub2RlID0+IHtcbiAgICAgIGlmICghdW51c2VkRXhwb3J0cykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IG9sZEltcG9ydFBhdGhzID0gaW1wb3J0TGlzdC5nZXQoZmlsZSlcbiAgICAgIGlmICh0eXBlb2Ygb2xkSW1wb3J0UGF0aHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9sZEltcG9ydFBhdGhzID0gbmV3IE1hcCgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZE5hbWVzcGFjZUltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgIGNvbnN0IG5ld05hbWVzcGFjZUltcG9ydHMgPSBuZXcgU2V0KClcblxuICAgICAgY29uc3Qgb2xkRXhwb3J0QWxsID0gbmV3IFNldCgpXG4gICAgICBjb25zdCBuZXdFeHBvcnRBbGwgPSBuZXcgU2V0KClcblxuICAgICAgY29uc3Qgb2xkRGVmYXVsdEltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgIGNvbnN0IG5ld0RlZmF1bHRJbXBvcnRzID0gbmV3IFNldCgpXG5cbiAgICAgIGNvbnN0IG9sZEltcG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIGNvbnN0IG5ld0ltcG9ydHMgPSBuZXcgTWFwKClcbiAgICAgIG9sZEltcG9ydFBhdGhzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmhhcyhFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKSkge1xuICAgICAgICAgIG9sZEV4cG9ydEFsbC5hZGQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXMoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpKSB7XG4gICAgICAgICAgb2xkTmFtZXNwYWNlSW1wb3J0cy5hZGQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXMoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKSkge1xuICAgICAgICAgIG9sZERlZmF1bHRJbXBvcnRzLmFkZChrZXkpXG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUuZm9yRWFjaCh2YWwgPT4ge1xuICAgICAgICAgIGlmICh2YWwgIT09IElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSICYmXG4gICAgICAgICAgICAgIHZhbCAhPT0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKSB7XG4gICAgICAgICAgICAgICBvbGRJbXBvcnRzLnNldCh2YWwsIGtleSlcbiAgICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBub2RlLmJvZHkuZm9yRWFjaChhc3ROb2RlID0+IHtcbiAgICAgICAgbGV0IHJlc29sdmVkUGF0aFxuXG4gICAgICAgIC8vIHN1cHBvcnQgZm9yIGV4cG9ydCB7IHZhbHVlIH0gZnJvbSAnbW9kdWxlJ1xuICAgICAgICBpZiAoYXN0Tm9kZS50eXBlID09PSBFWFBPUlRfTkFNRURfREVDTEFSQVRJT04pIHtcbiAgICAgICAgICBpZiAoYXN0Tm9kZS5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJlc29sdmVkUGF0aCA9IHJlc29sdmUoYXN0Tm9kZS5zb3VyY2UucmF3LnJlcGxhY2UoLygnfFwiKS9nLCAnJyksIGNvbnRleHQpXG4gICAgICAgICAgICBhc3ROb2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgICBsZXQgbmFtZVxuICAgICAgICAgICAgICBpZiAoc3BlY2lmaWVyLmV4cG9ydGVkLm5hbWUgPT09IERFRkFVTFQpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IHNwZWNpZmllci5sb2NhbC5uYW1lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3SW1wb3J0cy5zZXQobmFtZSwgcmVzb2x2ZWRQYXRoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXN0Tm9kZS50eXBlID09PSBFWFBPUlRfQUxMX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZShhc3ROb2RlLnNvdXJjZS5yYXcucmVwbGFjZSgvKCd8XCIpL2csICcnKSwgY29udGV4dClcbiAgICAgICAgICBuZXdFeHBvcnRBbGwuYWRkKHJlc29sdmVkUGF0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhc3ROb2RlLnR5cGUgPT09IElNUE9SVF9ERUNMQVJBVElPTikge1xuICAgICAgICAgIHJlc29sdmVkUGF0aCA9IHJlc29sdmUoYXN0Tm9kZS5zb3VyY2UucmF3LnJlcGxhY2UoLygnfFwiKS9nLCAnJyksIGNvbnRleHQpXG4gICAgICAgICAgaWYgKCFyZXNvbHZlZFBhdGgpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc05vZGVNb2R1bGUocmVzb2x2ZWRQYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5ld05hbWVzcGFjZUltcG9ydEV4aXN0cyhhc3ROb2RlLnNwZWNpZmllcnMpKSB7XG4gICAgICAgICAgICBuZXdOYW1lc3BhY2VJbXBvcnRzLmFkZChyZXNvbHZlZFBhdGgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5ld0RlZmF1bHRJbXBvcnRFeGlzdHMoYXN0Tm9kZS5zcGVjaWZpZXJzKSkge1xuICAgICAgICAgICAgbmV3RGVmYXVsdEltcG9ydHMuYWRkKHJlc29sdmVkUGF0aClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhc3ROb2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHNwZWNpZmllci50eXBlID09PSBJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIgfHxcbiAgICAgICAgICAgICAgICBzcGVjaWZpZXIudHlwZSA9PT0gSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdJbXBvcnRzLnNldChzcGVjaWZpZXIuaW1wb3J0ZWQubmFtZSwgcmVzb2x2ZWRQYXRoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIG5ld0V4cG9ydEFsbC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFvbGRFeHBvcnRBbGwuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoRVhQT1JUX0FMTF9ERUNMQVJBVElPTilcbiAgICAgICAgICBvbGRJbXBvcnRQYXRocy5zZXQodmFsdWUsIGltcG9ydHMpXG5cbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGxldCBjdXJyZW50RXhwb3J0XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cG9ydHMgPSBuZXcgTWFwKClcbiAgICAgICAgICAgIGV4cG9ydExpc3Quc2V0KHZhbHVlLCBleHBvcnRzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEV4cG9ydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3aGVyZVVzZWQgPSBuZXcgU2V0KClcbiAgICAgICAgICAgIHdoZXJlVXNlZC5hZGQoZmlsZSlcbiAgICAgICAgICAgIGV4cG9ydHMuc2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04sIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGRFeHBvcnRBbGwuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghbmV3RXhwb3J0QWxsLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGltcG9ydHMuZGVsZXRlKEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KEVYUE9SVF9BTExfREVDTEFSQVRJT04pXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmRlbGV0ZShmaWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgbmV3RGVmYXVsdEltcG9ydHMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmICghb2xkRGVmYXVsdEltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKVxuICAgICAgICAgIG9sZEltcG9ydFBhdGhzLnNldCh2YWx1ZSwgaW1wb3J0cylcblxuICAgICAgICAgIGxldCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgbGV0IGN1cnJlbnRFeHBvcnRcbiAgICAgICAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50RXhwb3J0ID0gZXhwb3J0cy5nZXQoSU1QT1JUX0RFRkFVTFRfU1BFQ0lGSUVSKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRzID0gbmV3IE1hcCgpXG4gICAgICAgICAgICBleHBvcnRMaXN0LnNldCh2YWx1ZSwgZXhwb3J0cylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50RXhwb3J0LndoZXJlVXNlZC5hZGQoZmlsZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgd2hlcmVVc2VkID0gbmV3IFNldCgpXG4gICAgICAgICAgICB3aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgICBleHBvcnRzLnNldChJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGREZWZhdWx0SW1wb3J0cy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKCFuZXdEZWZhdWx0SW1wb3J0cy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgaW1wb3J0cyA9IG9sZEltcG9ydFBhdGhzLmdldCh2YWx1ZSlcbiAgICAgICAgICBpbXBvcnRzLmRlbGV0ZShJTVBPUlRfREVGQVVMVF9TUEVDSUZJRVIpXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEV4cG9ydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuZGVsZXRlKGZpbGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBuZXdOYW1lc3BhY2VJbXBvcnRzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBpZiAoIW9sZE5hbWVzcGFjZUltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGxldCBpbXBvcnRzID0gb2xkSW1wb3J0UGF0aHMuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgaW1wb3J0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGltcG9ydHMgPSBuZXcgU2V0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1wb3J0cy5hZGQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG4gICAgICAgICAgb2xkSW1wb3J0UGF0aHMuc2V0KHZhbHVlLCBpbXBvcnRzKVxuXG4gICAgICAgICAgbGV0IGV4cG9ydHMgPSBleHBvcnRMaXN0LmdldCh2YWx1ZSlcbiAgICAgICAgICBsZXQgY3VycmVudEV4cG9ydFxuICAgICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQgPSBleHBvcnRzLmdldChJTVBPUlRfTkFNRVNQQUNFX1NQRUNJRklFUilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cyA9IG5ldyBNYXAoKVxuICAgICAgICAgICAgZXhwb3J0TGlzdC5zZXQodmFsdWUsIGV4cG9ydHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdoZXJlVXNlZCA9IG5ldyBTZXQoKVxuICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgICAgZXhwb3J0cy5zZXQoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIsIHsgd2hlcmVVc2VkIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBvbGROYW1lc3BhY2VJbXBvcnRzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBpZiAoIW5ld05hbWVzcGFjZUltcG9ydHMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBvbGRJbXBvcnRQYXRocy5nZXQodmFsdWUpXG4gICAgICAgICAgaW1wb3J0cy5kZWxldGUoSU1QT1JUX05BTUVTUEFDRV9TUEVDSUZJRVIpXG5cbiAgICAgICAgICBjb25zdCBleHBvcnRzID0gZXhwb3J0TGlzdC5nZXQodmFsdWUpXG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KElNUE9SVF9OQU1FU1BBQ0VfU1BFQ0lGSUVSKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBjdXJyZW50RXhwb3J0LndoZXJlVXNlZC5kZWxldGUoZmlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIG5ld0ltcG9ydHMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIW9sZEltcG9ydHMuaGFzKGtleSkpIHtcbiAgICAgICAgICBsZXQgaW1wb3J0cyA9IG9sZEltcG9ydFBhdGhzLmdldCh2YWx1ZSlcbiAgICAgICAgICBpZiAodHlwZW9mIGltcG9ydHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpbXBvcnRzID0gbmV3IFNldCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGltcG9ydHMuYWRkKGtleSlcbiAgICAgICAgICBvbGRJbXBvcnRQYXRocy5zZXQodmFsdWUsIGltcG9ydHMpXG5cbiAgICAgICAgICBsZXQgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGxldCBjdXJyZW50RXhwb3J0XG4gICAgICAgICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydCA9IGV4cG9ydHMuZ2V0KGtleSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0cyA9IG5ldyBNYXAoKVxuICAgICAgICAgICAgZXhwb3J0TGlzdC5zZXQodmFsdWUsIGV4cG9ydHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50RXhwb3J0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgY3VycmVudEV4cG9ydC53aGVyZVVzZWQuYWRkKGZpbGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdoZXJlVXNlZCA9IG5ldyBTZXQoKVxuICAgICAgICAgICAgd2hlcmVVc2VkLmFkZChmaWxlKVxuICAgICAgICAgICAgZXhwb3J0cy5zZXQoa2V5LCB7IHdoZXJlVXNlZCB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgb2xkSW1wb3J0cy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGlmICghbmV3SW1wb3J0cy5oYXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBvbGRJbXBvcnRQYXRocy5nZXQodmFsdWUpXG4gICAgICAgICAgaW1wb3J0cy5kZWxldGUoa2V5KVxuXG4gICAgICAgICAgY29uc3QgZXhwb3J0cyA9IGV4cG9ydExpc3QuZ2V0KHZhbHVlKVxuICAgICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRFeHBvcnQgPSBleHBvcnRzLmdldChrZXkpXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRFeHBvcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRFeHBvcnQud2hlcmVVc2VkLmRlbGV0ZShmaWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJ1Byb2dyYW06ZXhpdCc6IG5vZGUgPT4ge1xuICAgICAgICB1cGRhdGVFeHBvcnRVc2FnZShub2RlKVxuICAgICAgICB1cGRhdGVJbXBvcnRVc2FnZShub2RlKVxuICAgICAgICBjaGVja0V4cG9ydFByZXNlbmNlKG5vZGUpXG4gICAgICB9LFxuICAgICAgJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbic6IG5vZGUgPT4ge1xuICAgICAgICBjaGVja1VzYWdlKG5vZGUsIElNUE9SVF9ERUZBVUxUX1NQRUNJRklFUilcbiAgICAgIH0sXG4gICAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IG5vZGUgPT4ge1xuICAgICAgICBub2RlLnNwZWNpZmllcnMuZm9yRWFjaChzcGVjaWZpZXIgPT4ge1xuICAgICAgICAgICAgY2hlY2tVc2FnZShub2RlLCBzcGVjaWZpZXIuZXhwb3J0ZWQubmFtZSlcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKG5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi50eXBlID09PSBGVU5DVElPTl9ERUNMQVJBVElPTikge1xuICAgICAgICAgICAgY2hlY2tVc2FnZShub2RlLCBub2RlLmRlY2xhcmF0aW9uLmlkLm5hbWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLmRlY2xhcmF0aW9uLnR5cGUgPT09IFZBUklBQkxFX0RFQ0xBUkFUSU9OKSB7XG4gICAgICAgICAgICBub2RlLmRlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucy5mb3JFYWNoKGRlY2xhcmF0aW9uID0+IHtcbiAgICAgICAgICAgICAgY2hlY2tVc2FnZShub2RlLCBkZWNsYXJhdGlvbi5pZC5uYW1lKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19