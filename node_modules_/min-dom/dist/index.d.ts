/**
 * Set attribute `name` to `val`, or get attr `name`.
 *
 * @param {Element} el
 * @param {String} name
 * @param {String} [val]
 * @api public
 */
export function attr<T extends Element>(el: T, name: string): string;
export function attr<T extends Element>(el: T, name: string, val: null): void;
export function attr<T extends Element>(el: T, name: string, val: string): T;
export function attr<T extends Element>(el: T, name: string, val?: string | null): void | string | T;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */
export function classes<T extends Element>(el: T): ClassList<T>;

export class ClassList<T extends Element> {
  public list: T["classList"];
  public el: T;
  constructor(el: T);

  add(name: string): this;
  remove(name: string | RegExp): this;

  removeMatching(re: RegExp): this;

  toggle(name: string, force?: boolean): this;

  array(): string[];

  has(name: string): boolean;
  contains(name: string): boolean;
}

/**
 * Remove all children from the given element.
 */
export function clear<T extends Element>(el: T): T;

export type CSSSelector = string;
export function closest(element: Element, selector: CSSSelector, checkYoSelf?: boolean): Element;

export namespace delegate {
  export function bind<T extends EventTarget>(el: T, selector: CSSSelector, type: string, callback: (el: T, e: Event) => void, capture?: boolean): Function;
  export function unbind<T extends EventTarget>(el: T, type: string, callback: (el: T, e: Event) => void, capture?: boolean): void;
}

export function domify(dom: string, doc?: HTMLDocument): HTMLElement;

export namespace event {
  export function bind<CType extends Function>(el: EventTarget, type: string, fn: CType, capture?: boolean): CType;
  export function unbind<CType extends Function>(el: EventTarget , type: string, fn: CType, capture?: boolean): CType;
}

export function matches<K extends keyof HTMLElementTagNameMap>(el: HTMLElementTagNameMap[K], selector: K): el is HTMLElementTagNameMap[K];
export function matches(el: HTMLElement, selector: CSSSelector): boolean;

export function query<K extends keyof HTMLElementTagNameMap>(selectors: K, el?: HTMLElement): HTMLElementTagNameMap[K] | null;
export function query<K extends keyof SVGElementTagNameMap>(selectors: K, el?: HTMLElement): SVGElementTagNameMap[K] | null;
export function query<E extends Element = Element>(selectors: string, el?: HTMLElement): E | null;

export function queryAll<K extends keyof HTMLElementTagNameMap>(selectors: K, el?: HTMLElement): NodeListOf<HTMLElementTagNameMap[K]>;
export function queryAll<K extends keyof SVGElementTagNameMap>(selectors: K, el?: HTMLElement): NodeListOf<SVGElementTagNameMap[K]>;
export function queryAll<E extends Element = Element>(selectors: string, el?: HTMLElement): NodeListOf<E>;

export function remove(el: Element): void;
