/** vue-property-decorator verson 7.3.0 MIT LICENSE copyright 2018 kaorun343 */
import Vue, { PropOptions, WatchOptions } from 'vue';
import Component, { mixins } from 'vue-class-component';
import { InjectKey } from 'vue/types/options';
export declare type Constructor = {
    new (...args: any[]): any;
};
export { Component, Vue, mixins as Mixins };
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
export declare function Inject(options?: {
    from?: InjectKey;
    default?: any;
} | InjectKey): PropertyDecorator;
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
export declare function Provide(key?: string | symbol): PropertyDecorator;
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
export declare function Model(event?: string, options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export declare function Prop(options?: (PropOptions | Constructor[] | Constructor)): PropertyDecorator;
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export declare function Watch(path: string, options?: WatchOptions): MethodDecorator;
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
export declare function Emit(event?: string): MethodDecorator;
