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
 * Component for BoxPlotChart
 *
 * @returns BoxplotChart for given /?dataset?/
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

/**
 *
 */

/**
 *
 * @param root0
 * @param root0.dataForPlot
 */
export default function BoxPlotChart({ dataForPlot }): JSX.Element {
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
            <VictoryLabel dx={-10} dy={-10} textAnchor="middel" />
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
      {dataForPlot}
      <p>Hej</p>
    </div>
  );
}
