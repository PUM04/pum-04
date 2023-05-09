/**
 * A single bar used in Histogram
 *
 * @file
 */

/**
 *
 * Data for drawing a single bar in a histogram
 * { x: '700', y: 200, fill: 'yellow' }
 */
class Bar {
  public x: string;

  public y: number;

  public fill: string;

  /**
   * Constructor for a single bar
   *
   * @param x x value in a histogram
   * @param y y value in a histogram
   * @param fill Color for a single bar
   */
  constructor(x: string = '0', y: number = 0, fill = 'black') {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
}

export default Bar;
