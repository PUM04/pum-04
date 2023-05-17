/**
 *
 * @file Contains a simple datastructure for a histogram.
 */

import Bar from './Bar';

/**
 * Simple datastructure for a histogram
 */
class Histogram {
  public bars: Array<Bar>;

  public siteName: string;

  /**
   * Constructor for creating datastructure used to draw a single histogram
   *
      @param bars Datastructure for drawing a histogram
      Example
   * {bars = [
        { x: '500', y: 20, fill: 'yellow' },
        { x: '600', y: 150, fill: 'yellow' },
        { x: '700', y: 200, fill: 'yellow' },
      ];}
   * @param siteName name of the site
   */
  constructor(bars: Array<Bar> = [], siteName: string = '') {
    this.bars = bars;
    this.siteName = siteName;
  }
}

export default Histogram;
