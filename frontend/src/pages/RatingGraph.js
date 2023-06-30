import "./RatingGraph.css";
import React from 'react';
import {useSyncExternalStore} from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";



function RatingGraph(props) {


  return (
    <div id={"Graph"}>
      <RadarChart
      outerRadius={190}
      width={600}
      height={500}
      data={props.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0,10]}/>
        <Radar
          name="Graph"
          dataKey="A"
          stroke="rgb(27, 99, 162)"
          fill="rgb(27, 99, 162)"
          fillOpacity={0.7}
        />
      </RadarChart>
    </div>

  );
}

export default RatingGraph;