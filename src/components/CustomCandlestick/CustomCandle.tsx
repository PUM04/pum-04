/* eslint-disable */

/*
 * @file Victory charts Candle customized with top, bottom and mean lines.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helpers, CommonProps, Line, Rect } from 'victory-core';
import { assign, defaults, isFunction } from 'lodash';
import { CandleProps } from 'victory';

const getCandleWidth = (candleWidth: number, props: CandleProps) => {
  const { style } = props;
  if (candleWidth) {
    return isFunction(candleWidth)
      ? Helpers.evaluateProp(candleWidth, props)
      : candleWidth;
  }
  if (style.width) {
    return style.width;
  }
  return candleWidth;
};

const getCandleProps = (props: CandleProps, style: CandleProps) => {
  const { id, x, close, open, horizontal, candleWidth } = props;
  const candleLength = Math.abs(close - open);
  return {
    key: `${id}-candle`,
    style: Helpers.omit(style, ['width']),
    x: horizontal ? Math.min(open, close) : x - candleWidth / 2,
    y: horizontal ? x - candleWidth / 2 : Math.min(open, close),
    width: horizontal ? candleLength : candleWidth,
    height: horizontal ? candleWidth : candleLength,
  };
};

const getHighWickProps = (props: CandleProps, style: CandleProps) => {
  const { horizontal, high, open, close, x, id } = props;
  return {
    key: `${id}-highWick`,
    style: Helpers.omit(style, ['width']),
    x1: horizontal ? high : x,
    x2: horizontal ? Math.max(open, close) : x,
    y1: horizontal ? x : high,
    y2: horizontal ? x : Math.min(open, close),
  };
};

const getLowWickProps = (props: CandleProps, style: CandleProps) => {
  const { horizontal, low, open, close, x, id } = props;
  return {
    key: `${id}-lowWick`,
    style: Helpers.omit(style, ['width']),
    x1: horizontal ? Math.min(open, close) : x,
    x2: horizontal ? low : x,
    y1: horizontal ? x : Math.max(open, close),
    y2: horizontal ? x : low,
  };
};

/*
 * Adds top line for candelstick
 */
const getFloorProps = (props: CandleProps, style: CandleProps) => {
  const { low, candleWidth, id, x } = props;
  return {
    key: `${id}-floor`,
    style: Helpers.omit(style, ['width']),
    x1: x - candleWidth / 2,
    x2: x + candleWidth / 2,
    y1: low,
    y2: low,
  };
};

/*
 * Adds mean line for candelstick
 */
const getMeanProps = (props: CandleProps, style: CandleProps) => {
  const { mean, candleWidth, id, x } = props;
  // console.log(mean);
  return {
    key: `${id}-mean`,
    style: Helpers.omit(style, ['width']),
    x1: x - candleWidth / 2,
    x2: x + candleWidth / 2,
    y1: mean,
    y2: mean,
  };
};

/*
 * Adds bottom line for candelstick
 */
const getRoofProps = (props: CandleProps, style: CandleProps) => {
  const { high, candleWidth, id, x } = props;
  return {
    key: `${id}-roof`,
    style: Helpers.omit(style, ['width']),
    x1: x - candleWidth / 2,
    x2: x + candleWidth / 2,
    y1: high,
    y2: high,
  };
};

const evaluateProps = (props: CandleProps) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `cornerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `desc`
   * `id`
   * `tabIndex`
   */
  const style = Helpers.evaluateStyle(
    assign({ stroke: 'black' }, props.style),
    props
  );
  const candleWidth = getCandleWidth(
    props.candleWidth,
    assign({}, props, { style })
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, {
    ariaLabel,
    style,
    candleWidth,
    desc,
    id,
    tabIndex,
  });
};

/**
 *
 * @param props
 */
function CustomCandle(props: CandleProps) {
  props = evaluateProps(props);
  const {
    ariaLabel,
    events,
    groupComponent,
    clipPath,
    rectComponent,
    lineComponent,
    role,
    shapeRendering,
    className,
    wickStrokeWidth,
    transform,
    style,
    desc,
    tabIndex,
  } = props;
  const wickStyle = defaults({ strokeWidth: wickStrokeWidth }, style);
  const sharedProps = {
    ...events,
    'aria-label': ariaLabel,
    role,
    shapeRendering,
    className,
    transform,
    clipPath,
    desc,
    tabIndex,
  };
  const candleProps = assign(getCandleProps(props, style), sharedProps);
  const highWickProps = assign(getHighWickProps(props, wickStyle), sharedProps);
  const lowWickProps = assign(getLowWickProps(props, wickStyle), sharedProps);
  const roofProps = assign(getRoofProps(props, wickStyle), sharedProps);
  const floorProps = assign(getFloorProps(props, wickStyle), sharedProps);
  const meanProps = assign(getMeanProps(props, wickStyle), sharedProps);

  return React.cloneElement(groupComponent, {}, [
    React.cloneElement(rectComponent, candleProps),
    React.cloneElement(lineComponent, highWickProps),
    React.cloneElement(lineComponent, lowWickProps),
    React.cloneElement(lineComponent, roofProps),
    React.cloneElement(lineComponent, floorProps),
    React.cloneElement(lineComponent, meanProps),
  ]);
}

CustomCandle.propTypes = {
  ...CommonProps.primitiveProps,
  candleRatio: PropTypes.number,
  candleWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  close: PropTypes.number,
  datum: PropTypes.object,
  groupComponent: PropTypes.element,
  high: PropTypes.number,
  lineComponent: PropTypes.element,
  low: PropTypes.number,
  open: PropTypes.number,
  rectComponent: PropTypes.element,
  wickStrokeWidth: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  mean: PropTypes.number,
};

CustomCandle.defaultProps = {
  groupComponent: <g />,
  lineComponent: <Line />,
  rectComponent: <Rect />,
  role: 'presentation',
  shapeRendering: 'auto',
};

export default CustomCandle;
