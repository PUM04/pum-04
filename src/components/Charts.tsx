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
  VictoryGroup,
} from 'victory';

/**
 * Component for buildning all the charts.
 *
 * @returns A Chart for given /?dataset?/
 */

const metric1 = [
  { x: 1, y: [2, 3, 4, 4, 3, 10] },
  { x: 2, y: [2, 3, 4, 4] },
  { x: 3, y: [0, 3, 4, 4, 4, 3, 6] },
  { x: 4, y: [0, 3, 6, 4, 5, 3, 6] },
  { x: 5, y: [1, 2, 8, 4, 5, 3, 6] },

];
const metric2 = [
  { x: 1, y: [0, 3, 9, 4, 5, 3, 7] },
  { x: 2, y: [3, 2, 8, 5, 5, 3, 7] },
  { x: 3, y: [0, 2, 8, 5, 5, 3, 7] },
  { x: 4, y: [1, 2, 3, 5, 4, 4, 6] },
  { x: 5, y: [2, 2, 3, 4, 4, 6, 6] },
 
];

const vicData2 = [
  { x: 1, y: 7 ,fill:"green"},
  { x: 2, y: 9, fill: "blue" },
  { x: 3, y: 4,fill:"yellow" },
  { x: 13, y: 3,fill:"red" },
];

const vicData3 = [{ x: 1 , fill: "red"}, { x: 2 , fill: "green"}, { x: 10,fill:"blue" }];

/**
 *  Component for BoxPlotChart
 *
 * @returns BoxplotChart for given /?dataset?/
 */
export function BoxPlotChart(): JSX.Element {


  return (
    <div>
      {/*
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
          //tickValues={[vicData]}
          //tickFormat={['Lin', 'Man', 'Stock', 'Tokyo']}
          style={{
            axis: { strokeWidth: 2, stroke: 'gray' },
            tickLabels: { fontSize: 10, padding: 5, stroke: 'orange' },
          }}
        />
        <VictoryBoxPlot
          x={(d) => d.x + 0.25}
          maxLabels
          maxLabelComponent={
            <VictoryLabel dx={-10} dy={-10} textAnchor="middle" />
          }
          style={{
           
            q1: { fill: "blue" },
           
          }}
          data={vicData}
        />
        <VictoryBoxPlot
           x={(d) => d.x - 0.25}
          maxLabels
          maxLabelComponent={
            <VictoryLabel dx={-10} dy={-10} textAnchor="middle" />
          }
          style={{
           
            q1: { fill: "blue" },
           
          }}
          data={vicData2}
        />
       
     
        </VictoryChart>*/}
     <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>
     <VictoryGroup
  offset={25}
  colorScale={["tomato", "orange", "gold"]}
>
        <VictoryBoxPlot
    //x={(d) => d.x - 0.25}
    data={[
      { x: 1, y: [5, 10, 9, 2] },
      { x: 2, y: [1, 15, 6, 8] },
      { x: 3, y: [3, 5, 6, 9] },
      { x: 4, y: [5, 20, 8, 12] },
      { x: 5, y: [2, 11, 12, 13] }
    ]}
  />
  <VictoryBoxPlot
    //x={(d) => d.x + 0.25}
    data={[
      { x: 1, y: [1, 2, 3, 2] },
      { x: 2, y: [1, 15, 6, 8] },
      { x: 3, y: [13, 15, 16, 19] },
      { x: 4, y: [5, 2, 8, 12] },
      { x: 5, y: [2, 1, 12, 13] }
    ]}
    style={{ q1: { fill: "red" }, q3: { fill: "red" }}}
  />
  </VictoryGroup>
  </VictoryChart>
    </div>
  );
}
function drawVictoryBar(data:any){
  console.log("drawVictoryBar")
  console.log(data);
  return(
    
    <VictoryBar
            style={{
              data: {
                fill:({ datum }) => datum.fill ,
                stroke: 'gray',
                strokeWidth: 1,
                strokeOpacity: 0.7,
              },
            }}
            data={data}
            
          />
          
  )
  
}

function drawHistogram(sites:any){

//sites är en lista med
  console.log("drawHist: ");
  console.log( sites);
  
  const victoryBars = [];
  /*for (const data in sites){
    console.log("data:");
    console.log(data);
    victoryBars.push(drawVictoryBar([data]));
  }*/
  console.log("SITE LEN" + sites.length);
  for(let i = 0; i <= sites.length; i++){
    console.log(sites[i]);
    victoryBars.push(drawVictoryBar(sites[i]));
  }
  //victoryBars.push(drawVictoryBar(sites[0]));

  console.log("VICTORY BARS");
  console.log(victoryBars);


  return (
    
    <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>

      <VictoryGroup
    offset={25}
    colorScale={["tomato", "orange", "gold"]}
  >
    {victoryBars}
     
  </VictoryGroup>
  </VictoryChart>
  
    );
 
}

/**
 *  Component for BarChart
 *
 * @returns BarChart for given /?dataset?/
 */
export function BarChart(props:any): JSX.Element {
 
  const metrics = props.metrics; //Antal grafer
  const sites = props.sites; //Färger i grafen

  //Backend
  //Funktion hämta metrics/sites

  const test = [];

  const d1 = [
    { x: 1, y: 7 ,fill:"green"},
    { x: 2, y: 9, fill: "blue" },
    { x: 3, y: 4,fill:"brown" },
    { x: 13, y: 3,fill:"red" },
  ]
  const dataInput =[]
  dataInput.push(d1);

  test.push(drawHistogram(dataInput));
  /*for(const m in props.metrics){
    //Anropa funktion för att rita en graf
    //Indata data lista med [ data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]},
    //data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}]
    //alert("hej");
    test.push((drawHistogram([[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}],
    [{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]
  ])));*/

  //}

  return (
    <div>
    
    {test}
        
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
      <VictoryBar
    style={{
      data: {
        fill: ({ datum }) => datum.fill,
      }
    }}
    data={[
      { x: 1, y: 2, fill: "red" },
      { x: 2, y: 4 , fill: "orange" },
      { x: 3, y: 6, fill: "gold" }
    ]}
  />
      <VictoryHistogram
        style={{
          data: {
            fill: ({datum}) => datum.fill,
          },
        }}
        binSpacing={10}
        bins={[0, 2, 5, 10]}
        data={vicData3}
      />
    </VictoryChart>
  );
}

export function GroupTest(props:any): JSX.Element {
  return (

  <VictoryChart domainPadding={{ x: [20, 20], y: [20, 20] }}>

    <VictoryGroup
  offset={25}
  colorScale={["tomato", "orange", "gold"]}
>
  <VictoryBar
    data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
  />
  <VictoryBar
    data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
  />
   <VictoryBar
          style={{
            data: {
              fill:({ datum }) => datum.fill ,
              stroke: 'gray',
              strokeWidth: 1,
              strokeOpacity: 0.7,
            },
          }}
          data={props.data}
          
        />
</VictoryGroup>
</VictoryChart>



  );

}
