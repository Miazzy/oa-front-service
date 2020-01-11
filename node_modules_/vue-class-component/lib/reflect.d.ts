import Vue, { VueConstructor } from 'vue';
import { VueClass } from './declarations';
export declare const reflectionIsSupported: false | typeof Reflect.defineMetadata;
export declare function copyReflectionMetadata(to: VueConstructor, from: VueClass<Vue>): void;
