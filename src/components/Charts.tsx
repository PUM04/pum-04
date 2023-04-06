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
  VictoryTooltip,
  VictoryCandlestick
} from 'victory';

/**
 * Component for buildning all the charts.
 *
 * @returns A Chart for given /?dataset?/
 */

//metric
const vicData = [
  { x: 1, open: 5, close: 10, high: 22, low: 0 }, //s1
  { x: 2, open: 10, close: 15, high: 20, low: 5 }, //s2
  { x: 3, open: 15, close: 20, high: 22, low: 10 }, // s3
 
];

const vicData1 = [
  { x: 1, open: 5, close: 10, high: 25, low: 1 },
  { x: 2, open: 6, close: 8, high: 15, low: 3 },
  { x: 3, open: 4, close: 14, high: 17, low: 2 },
];

const vicData11 = [
  { x: 1, open: 1, close: 6, high: 10, low: 0 },
  { x: 2, open: 7, close: 8, high: 8, low: 7 },
  { x: 3, open: 3, close: 8, high: 12, low: 2 },]

/**
 *  Component for BoxPlotChart
 *  Indata Sites och Metrics valda i menyn
 * @returns BoxplotChart for given /?dataset?/
 */
export function BoxPlotChart(props:any): JSX.Element {

  const metrics = props.metrics; //Lista med metrics
  const sites = props.sites; //Lista med sites
  var width = 10;
  var victoryCandles = []


  //For metrics in props.metric skapa victorychart som innehåller alla props.sites

  for(let i = 0; i < metrics.length; i++){
    var data = getCandleChartData(metrics[i],sites)
    victoryCandles.push(drawVictoryCandle(data,width))
    //bygga m1,m2,m3 .. osv
    //pusha till victoryCandles
    
  }

  
  


  return (
    <VictoryChart
    
      
    >
      <VictoryAxis
        dependentAxis
        style={{
          
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        
        style={{
          
          tickLabels: { fontSize: 10,transform: 'translate(0, 10)'
          , angle:45,},
        }}
      />
    <VictoryGroup offset={width + 5}
      domainPadding={{x:width}}
      >
       {victoryCandles}
       
      </VictoryGroup>
    </VictoryChart>
  );
}

function getCandleChartData(metric:any, sites:any){

  var data:any =[]
  
  if(metric == 'getPatient' && sites[0] == 'stockholm' && sites[1] == 'linköping'){
    data = [
      { x: 1, open: 5, close: 10, high: 22, low: 0 }, //s1
      { x: 2, open: 10, close: 15, high: 20, low: 5 }, //s2
      
    ];
  }
  if(metric == 'getBucket' && sites[0] == 'stockholm' && sites[1] == 'linköping'){
    data = [
      { x: 1, open: 5, close: 10, high: 25, low: 1 },
      { x: 2, open: 6, close: 8, high: 15, low: 3 },
    ];
  }
  return data

}

function drawVictoryCandle(data:any,width:any){

  return(

    <VictoryCandlestick
    labelComponent={<VictoryTooltip
      cornerRadius={0}
      pointerLength={0} 
      
      //dy = {-10}
    />}
    labels={({ datum }) => `min:${datum.low}\nmax:${datum.high}\nclose:${datum.close}\nopen:${datum.open}\nmean:${"30"}`}
    //wickStrokeWidth={2}
   // height={1000}
   // candleRatio={0.7}
   candleWidth={width}
    data={data}
    style={{
      data: {
        fill: 'orange',
        fillOpacity: 0.8,
        stroke: 'gray',
      },
    }}
  />

  )



}


function drawVictoryBar(data:any,index:any){
  console.log("drawVictoryBar")
  console.log(data);
 
  return(
    
    <VictoryBar key ={index}
            
            labelComponent={<VictoryTooltip
              cornerRadius={0}
              pointerLength={0} 
              dy = {-10}
            />}
            
            barRatio = {0.7}
            labels={({ datum }) => datum.y}
            
            style={{
              data: {
                fill:({ datum }) => datum.fill ,
                
              },
            }}
            
            data={data}
            
          />
          
  )
  
}

function drawHistogram(sites:any, metric:any){
  const victoryBars = [];
 
  for(let i = 0; i < sites.length; i++){
    console.log(sites[i]);
    victoryBars.push(drawVictoryBar(sites[i],i));
  }


  return (
    
    <VictoryChart key={metric}
    domainPadding={{ x: [20, 20], y: [20, 20] }}>
     <VictoryAxis
        dependentAxis
        style={{
          
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis
        
        style={{
          
          tickLabels: { fontSize: 10,transform: 'translate(0, 10)'
          , angle:45,},
        }}
      />

      <VictoryGroup
    offset={5}
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
 
  const metrics = props.metrics; //Lista med metrics
  const sites = props.sites; //Lista med sites

  var barGraphList = []

  for(let i = 0; i < metrics.length; i++){
    var barGraph = []
    for(let t = 0; t < sites.length; t++){
        var data = getBarChartData(sites[t],metrics[i])
        barGraph.push(data)
    }
      barGraphList.push(drawHistogram(barGraph,2)) 
  }

  //Backend
  //Funktion hämta metrics/sites


  //SAmmanställ data för ett histogram(1-n sites). Inkluderat information om färg för histogram
 // for(let i = 0; i < ANTAL METRICS; i++){ // test.push(DATA FÖR ETT HISTOGRAM)}

  return (
    <div>
      {barGraphList}
    </div>
  );
}

function getBarChartData(site:any,metric:any){

  var data:any =[]
  if(site == 'stockholm' && metric == 'getPatient'){
    data = [
      { x: '500',  y: 20, fill:"yellow"},
      { x: '600',  y: 150,fill:"yellow" },
      { x: '700',  y: 200,fill:"yellow" },
      { x: '2800', y: 900,fill:"yellow" },
      { x: '3200', y: 200,fill:"yellow"},
      { x: '3300', y: 150,fill:"yellow" },
      { x: '4200', y: 200,fill:"yellow" },
      { x: '5800', y: 805,fill:"yellow" },
      { x: '6200', y: 600,fill:"yellow" },
     
    ]
  }
  else if(site == 'stockholm' && metric == 'getBucket'){

    data = [
      { x: '500', y: 20 ,fill: "yellow"},
      { x: '600', y: 150, fill:"yellow" },
      { x: '700', y: 200,fill: "yellow" },
      { x: '2800', y: 900,fill:"yellow" },
      { x: '3200', y: 200,fill:"yellow"},
      { x: '3300', y: 150,fill:"yellow" },
      { x: '4200', y: 200,fill:"yellow" },
      { x: '5800', y: 85,fill: "yellow" },
      { x: '6200', y: 200,fill:"yellow" },
      { x: '15800', y: 85,fill:"yellow" }
    ]

  }
  else if(site == 'linköping' && metric == 'getPatient'){
    data = [
      { x: '500', y: 20 ,fill:"blue"},
      { x: '600', y: 150, fill: "blue" },
      { x: '700', y: 200,fill:"blue" },
      { x: '2800', y: 900,fill:"blue" },
      { x: '3200', y: 200 ,fill:"blue"},
      { x: '3300', y: 150, fill: "blue" },
      { x: '4200', y: 200,fill:"blue" },
      { x: '5800', y: 85,fill:"blue" },
      { x: '6200', y: 200,fill:"blue" },
      { x: '15800', y: 85,fill:"blue" }
    ]
  }
  else if(site == 'linköping' && metric == 'getBucket'){
     
  data = [
    { x: '500', y: 20 ,fill:  "blue"},
    { x: '600', y: 150, fill: "blue" },
    { x: '700', y: 200,fill:  "blue" },
    { x: '2800', y: 900,fill: "blue" },
    { x: '3200', y: 200 ,fill:"blue"},
    { x: '3300', y: 150, fill:"blue" },
    { x: '4200', y: 200,fill: "blue" },
    { x: '5800', y: 85,fill:  "blue" },
    { x: '6200', y: 200,fill: "blue" },
    { x: '15800', y: 85,fill: "blue" }
  ]
  }
  else if(site == 'manchester' && metric == 'getPatient'){
    data =  [
      { x: '500', y: 20 ,fill: "green"},
      { x: '600', y: 150, fill:"green" },
      { x: '700', y: 200,fill: "green" },
      { x: '800', y: 900,fill: "green" },
      
    ]
  }
  else if(site == 'manchester' && metric == 'getBucket'){
    data = [
      { x: '500', y: 20 ,fill:"green"},
      { x: '600', y: 150,fill:"green" },
      { x: '700', y: 200,fill:"green" },
      { x: '800', y: 900,fill:"green" },
      
    ]
  }
  else if(site == 'tokyo' && metric == 'getPatient'){
    data = [
      { x: '500', y: 20 ,fill:"red"},
      { x: '600', y: 150,fill:"red" },
      { x: '700', y: 200,fill:"red" },
      { x: '800', y: 900,fill:"red" },
      
    ]
  }
  else if(site == 'tokyo' && metric == 'getBucket'){
    data = [
      { x: '500', y: 20 ,fill:"red"},
      { x: '600', y: 150,fill:"red" },
      { x: '700', y: 200,fill:"red" },
      { x: '800', y: 900,fill:"red" },
      
    ]
  }
  //Exempelvis GetPatient för site1
  
  //Exempelvis GetPatient för site2
  return data

}

