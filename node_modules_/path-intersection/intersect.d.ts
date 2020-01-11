
/**
 * Find or counts the intersections between two SVG paths.
 *
 * Returns a number in counting mode and a list of intersections otherwise.
 *
 * A single intersection entry contains the intersection coordinates (x, y)
 * as well as additional information regarding the intersecting segments
 * on each path (segment1, segment2) and the relative location of the
 * intersection on these segments (t1, t2).
 *
 * The path may be an SVG path string or a list of path components
 * such as `[ [ 'M', 0, 10 ], [ 'L', 20, 0 ] ]`.
 *
 * @example
 *
 * var intersections = findPathIntersections(
 *   'M0,0L100,100',
 *   [ [ 'M', 0, 100 ], [ 'L', 100, 0 ] ]
 * );
 *
 * // intersections = [
 * //   { x: 50, y: 50, segment1: 1, segment2: 1, t1: 0.5, t2: 0.5 }
 * // ];
 *
 * @param {String|Array<PathComponent>} path1
 * @param {String|Array<PathComponent>} path2
 * @param {Boolean} [justCount=false]
 *
 * @return {Array<Intersection>|Number}
 */
declare function findPathIntersections(path1: Path, path2: Path, justCount: true): number;
declare function findPathIntersections(path1: Path, path2: Path, justCount: false): Intersection[];
declare function findPathIntersections(path1: Path, path2: Path): Intersection[];
declare function findPathIntersections(path1: Path, path2: Path, justCount?: boolean): Intersection[] | number;

export = findPathIntersections;

/**
 * A string in the form of 'M150,150m0,-18a18,18,0,1,1,0,36a18,18,0,1,1,0,-36z'
 * or something like:
 * [
 *  ['M', 1, 2],
 *  ['m', 0, -2],
 *  ['a', 1, 1, 0, 1, 1, 0, 2 * 1],
 *  ['a', 1, 1, 0, 1, 1, 0, -2 * 1],
 *  ['z']
 * ]
 */
declare type Path = string | PathComponent[];
declare type PathComponent = any[];

declare interface Intersection {
  /**
   * Segment of first path.
   */
  segment1: number;

  /**
   * Segment of first path.
   */
  segment2: number;

  /**
   * The x coordinate.
   */
  x: number;

  /**
   * The y coordinate.
   */
  y: number;

  /**
   * Bezier curve for matching path segment 1.
   */
  bez1: number[];

  /**
   * Bezier curve for matching path segment 2.
   */
  bez2: number[];

  /**
   * Relative position of intersection on path segment1 (0.5 => in middle, 0.0 => at start, 1.0 => at end).
   */
  t1: number;

  /**
   * Relative position of intersection on path segment2 (0.5 => in middle, 0.0 => at start, 1.0 => at end).
   */
  t2: number;
}
