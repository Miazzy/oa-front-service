import Vue from 'vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export declare type VuexDecorator = <V extends Vue>(proto: V, key: string) => void;
export declare type StateTransformer = (state: any, getters: any) => any;
export declare type MapHelper = typeof mapState | typeof mapGetters | typeof mapActions | typeof mapMutations;
export interface BindingOptions {
    namespace?: string;
}
export interface BindingHelper {
    <V extends Vue>(proto: V, key: string): void;
    (type: string, options?: BindingOptions): VuexDecorator;
}
export interface StateBindingHelper extends BindingHelper {
    (type: StateTransformer, options?: BindingOptions): VuexDecorator;
}
export interface BindingHelpers {
    State: StateBindingHelper;
    Getter: BindingHelper;
    Mutation: BindingHelper;
    Action: BindingHelper;
}
export declare const State: StateBindingHelper;
export declare const Getter: BindingHelper;
export declare const Action: BindingHelper;
export declare const Mutation: BindingHelper;
export declare function namespace(namespace: string): BindingHelpers;
export declare function namespace<T extends BindingHelper>(namespace: string, helper: T): T;
