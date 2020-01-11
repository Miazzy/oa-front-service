import { createDecorator } from 'vue-class-component';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export var State = createBindingHelper('computed', mapState);
export var Getter = createBindingHelper('computed', mapGetters);
export var Action = createBindingHelper('methods', mapActions);
export var Mutation = createBindingHelper('methods', mapMutations);
export function namespace(namespace, helper) {
    function createNamespacedHelper(helper) {
        function namespacedHelper(a, b) {
            if (typeof b === 'string') {
                var key = b;
                var proto = a;
                return helper(key, { namespace: namespace })(proto, key);
            }
            var type = a;
            var options = merge(b || {}, { namespace: namespace });
            return helper(type, options);
        }
        return namespacedHelper;
    }
    if (helper) {
        console.warn('[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead.');
        return createNamespacedHelper(helper);
    }
    return {
        State: createNamespacedHelper(State),
        Getter: createNamespacedHelper(Getter),
        Mutation: createNamespacedHelper(Mutation),
        Action: createNamespacedHelper(Action)
    };
}
function createBindingHelper(bindTo, mapFn) {
    function makeDecorator(map, namespace) {
        return createDecorator(function (componentOptions, key) {
            if (!componentOptions[bindTo]) {
                componentOptions[bindTo] = {};
            }
            var mapObject = (_a = {}, _a[key] = map, _a);
            componentOptions[bindTo][key] = namespace !== undefined
                ? mapFn(namespace, mapObject)[key]
                : mapFn(mapObject)[key];
            var _a;
        });
    }
    function helper(a, b) {
        if (typeof b === 'string') {
            var key = b;
            var proto = a;
            return makeDecorator(key, undefined)(proto, key);
        }
        var namespace = extractNamespace(b);
        var type = a;
        return makeDecorator(type, namespace);
    }
    return helper;
}
function extractNamespace(options) {
    var n = options && options.namespace;
    if (typeof n !== 'string') {
        return undefined;
    }
    if (n[n.length - 1] !== '/') {
        return n + '/';
    }
    return n;
}
function merge(a, b) {
    var res = {};
    [a, b].forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            res[key] = obj[key];
        });
    });
    return res;
}
