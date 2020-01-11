/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IEditor } from './components/Editor';
export declare const bindHandlers: (initEvent: Event, listeners: any, editor: any) => void;
export declare const bindModelHandlers: (ctx: IEditor, editor: any) => void;
export declare const initEditor: (initEvent: Event, ctx: IEditor, editor: any) => void;
export declare const uuid: (prefix: string) => string;
export declare const isTextarea: (element: Element | null) => element is HTMLTextAreaElement;
export declare const mergePlugins: (initPlugins: string | string[], inputPlugins?: string | string[] | undefined) => string[];
