/**
 *
 * @file xxx
 */

import React from 'react';
import {} from '@mui/material';
import {
  VictoryBoxPlot,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryBar,
  VictoryHistogram,
} from 'victory';

/**
 * Component for buildning all the charts.
 *
 * @returns A Chart for given /?dataset?/
 */

const vicData = [
  { x: 'site 1', y: [2, 3, 4, 4, 3, 10] },
  { x: 'site 2', y: [2, 3, 4, 4] },
  { x: 'site 3', y: [0, 3, 4, 4, 4, 3, 6] },
  { x: 'site 4', y: [0, 3, 6, 4, 5, 3, 6] },
  { x: 'site 5', y: [1, 2, 8, 4, 5, 3, 6] },
  { x: 'site 6', y: [0, 3, 9, 4, 5, 3, 7] },
  { x: 'site 7', y: [3, 2, 8, 5, 5, 3, 7] },
  { x: 'site 8', y: [0, 2, 8, 5, 5, 3, 7] },
  { x: 'site 9', y: [1, 2, 3, 5, 4, 4, 6] },
  { x: 'site 10', y: [2, 2, 3, 4, 4, 6, 6] },
];

const vicData2 = [
  { x: 1, y: 7 },
  { x: 2, y: 9 },
  { x: 3, y: 4 },
  { x: 13, y: 3 },
];

const vicData3 = [{ x: 1 }, { x: 2 }, { x: 10 }];

/**
 *  Component for BoxPlotChart
 *
 * @returns BoxplotChart for given /?dataset?/
 */
export function BoxPlotChart(): JSX.Element {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
        <VictoryAxis
          dependentAxis
          label="Time for call"
          style={{
            axis: { strokeWidth: 2, stroke: 'gray' },
            tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
          }}
        />
        <VictoryAxis
          label="Site"
          tickValues={[vicData]}
          tickFormat={['Lin', 'Man', 'Stock', 'Tokyo']}
          style={{
            axis: { strokeWidth: 2, stroke: 'gray' },
            tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
          }}
        />
        <VictoryBoxPlot
          data={vicData}
          maxLabels
          maxLabelComponent={
            <VictoryLabel dx={-10} dy={-10} textAnchor="middle" />
          }
          style={{
            min: { stroke: 'red' },
            max: { stroke: 'green' },
            q1: { fill: 'orange' },
            q3: { fill: 'orange' },
            median: { stroke: 'black', strokeWidth: 1 },
            maxLabels: { fill: 'orange' },
          }}
        />
      </VictoryChart>
    </div>
  );
}

/**
 *  Component for BarChart
 *
 * @returns BarChart for given /?dataset?/
 */
export function BarChart(): JSX.Element {
  return (
    <div>
      <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
        <VictoryAxis
          dependentAxis
          style={{
            axis: { strokeWidth: 2, stroke: 'gray' },
            tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
          }}
        />
        <VictoryAxis
          style={{
            axis: { strokeWidth: 2, stroke: 'gray' },
            tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
          }}
        />
        <VictoryBar
          style={{
            data: {
              fill: 'orange',
              stroke: 'gray',
              strokeWidth: 1,
              strokeOpacity: 0.7,
            },
          }}
          data={vicData2}
        />
      </VictoryChart>
    </div>
  );
}

/**
 * Component for HistChart
 *
 * @returns HistChart for given /?dataset?/
 */
export function HistChart(): JSX.Element {
  return (
    <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
      <VictoryAxis
        dependentAxis
        style={{
          axis: { strokeWidth: 2, stroke: 'gray' },
          tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
        }}
      />
      <VictoryAxis
        style={{
          axis: { strokeWidth: 2, stroke: 'gray' },
          tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
        }}
      />
      <VictoryHistogram
        style={{
          data: {
            fill: 'orange',
            stroke: 'gray',
            strokeWidth: 1,
            strokeOpacity: 0.7,
          },
        }}
        binSpacing={10}
        bins={[0, 2, 5, 10]}
        data={vicData3}
      />
    </VictoryChart>
  );
}
