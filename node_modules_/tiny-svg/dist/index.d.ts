/**
 * Append a node to an element
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the element
 */
export function append(element: Element, node: SVGElement): typeof element;

/**
 * Append a node to a target element and return the appended node.
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the appended node
 */
export function appendTo(element: Element, target: SVGElement): typeof element;

export interface KeyValue {
  [key: string]: any;
}

export function attr(node: SVGElement, name: string): string;
export function attr(node: SVGElement, name: string, value: number | string): typeof node;
export function attr(node: SVGElement, attrs: KeyValue): typeof node;
export function attr(node: SVGElement, name: string, value: number | string): typeof node | string;

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
* Removes all children from the given element
*
* @param  {DOMElement} element
* @return {DOMElement} the element (for chaining)
*/
export function clear<T extends Element>(element: T): T;

export function clone<T extends Node>(element: T): T;

/**
 * Create a specific type from name or SVG markup.
 *
 * @param {String} name the name or markup of the element
 * @param {Object} [attrs] attributes to set on the element
 *
 * @returns {SVGElement}
 */
export function create(name: "a"): SVGAElement;
export function create(name: "circle"): SVGCircleElement;
export function create(name: "clipPath"): SVGClipPathElement;
export function create(name: "componentTransferFunction"): SVGComponentTransferFunctionElement;
export function create(name: "defs"): SVGDefsElement;
export function create(name: "desc"): SVGDescElement;
export function create(name: "ellipse"): SVGEllipseElement;
export function create(name: "feBlend"): SVGFEBlendElement;
export function create(name: "feColorMatrix"): SVGFEColorMatrixElement;
export function create(name: "feComponentTransfer"): SVGFEComponentTransferElement;
export function create(name: "feComposite"): SVGFECompositeElement;
export function create(name: "feConvolveMatrix"): SVGFEConvolveMatrixElement;
export function create(name: "feDiffuseLighting"): SVGFEDiffuseLightingElement;
export function create(name: "feDisplacementMap"): SVGFEDisplacementMapElement;
export function create(name: "feDistantLight"): SVGFEDistantLightElement;
export function create(name: "feFlood"): SVGFEFloodElement;
export function create(name: "feFuncA"): SVGFEFuncAElement;
export function create(name: "feFuncB"): SVGFEFuncBElement;
export function create(name: "feFuncG"): SVGFEFuncGElement;
export function create(name: "feFuncR"): SVGFEFuncRElement;
export function create(name: "feGaussianBlur"): SVGFEGaussianBlurElement;
export function create(name: "feImage"): SVGFEImageElement;
export function create(name: "feMerge"): SVGFEMergeElement;
export function create(name: "feMergeNode"): SVGFEMergeNodeElement;
export function create(name: "feMorphology"): SVGFEMorphologyElement;
export function create(name: "feOffset"): SVGFEOffsetElement;
export function create(name: "fePointLight"): SVGFEPointLightElement;
export function create(name: "feSpecularLighting"): SVGFESpecularLightingElement;
export function create(name: "feSpotLight"): SVGFESpotLightElement;
export function create(name: "feTile"): SVGFETileElement;
export function create(name: "feTurbulence"): SVGFETurbulenceElement;
export function create(name: "filter"): SVGFilterElement;
export function create(name: "foreignObject"): SVGForeignObjectElement;
export function create(name: "g"): SVGGElement;
export function create(name: "image"): SVGImageElement;
export function create(name: "gradient"): SVGGradientElement;
export function create(name: "line"): SVGLineElement;
export function create(name: "linearGradient"): SVGLinearGradientElement;
export function create(name: "marker"): SVGMarkerElement;
export function create(name: "mask"): SVGMaskElement;
export function create(name: "path"): SVGPathElement;
export function create(name: "metadata"): SVGMetadataElement;
export function create(name: "pattern"): SVGPatternElement;
export function create(name: "polygon"): SVGPolygonElement;
export function create(name: "polyline"): SVGPolylineElement;
export function create(name: "radialGradient"): SVGRadialGradientElement;
export function create(name: "rect"): SVGRectElement;
export function create(name: "svg"): SVGSVGElement;
export function create(name: "script"): SVGScriptElement;
export function create(name: "stop"): SVGStopElement;
export function create(name: "style"): SVGStyleElement;
export function create(name: "switch"): SVGSwitchElement;
export function create(name: "symbol"): SVGSymbolElement;
export function create(name: "tspan"): SVGTSpanElement;
export function create(name: "textContent"): SVGTextContentElement;
export function create(name: "text"): SVGTextElement;
export function create(name: "textPath"): SVGTextPathElement;
export function create(name: "textPositioning"): SVGTextPositioningElement;
export function create(name: "title"): SVGTitleElement;
export function create(name: "use"): SVGUseElement;
export function create(name: "view"): SVGViewElement;
export function create(name: string): SVGElement;
export function create(name: string, attrs?: KeyValue): Element;


export function on(node: Node, event: string, listener: Function, useCapture?: boolean): void;
export function off(node: Node, event: string, listener: Function, useCapture?: boolean): void;

export function createPoint(): SVGPoint;
export function createPoint(x: number, y: number): SVGPoint;

export function createMatrix(): SVGMatrix;
export function createMatrix(a: number, b: number, c: number, d: number, e: number, f: number): SVGMatrix;

export function createTransform(matrix?: SVGMatrix): SVGTransform;

export function innerSVG(element: Element, svg: string): typeof element;
export function innerSVG(element: Element): string;
export function innerSVG(element: Element, svg?: string): typeof element | string;

export function select(node: Node, selector: string): Node | null;

export function select<K extends keyof HTMLElementTagNameMap>(node: K, selector: string): HTMLElementTagNameMap[K] | null;
export function select<K extends keyof SVGElementTagNameMap>(node: K, selector: string): SVGElementTagNameMap[K] | null;
export function select<E extends Element = Element>(node: E, selector: string): E | null;

export function selectAll<K extends keyof HTMLElementTagNameMap>(node: K, selector: string): HTMLElementTagNameMap[K][];
export function selectAll<K extends keyof SVGElementTagNameMap>(node: K, selector: string): SVGElementTagNameMap[K][];
export function selectAll<E extends Element = Element>(node: E, selector: string): E[];

export function remove(el: Node): void;

export function replace(element: Node, replacement: Node): typeof replacement;

export function transform(node: Node): SVGTransform;
export function transform(node: Node, transforms?: SVGTransform | SVGTransform[]): SVGTransform | void;
