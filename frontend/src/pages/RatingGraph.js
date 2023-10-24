import "./RatingGraph.css";
import React from 'react';
import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";


//issues: the chart scaling is a bit weird with sudden shifts between
//        mobile and web view but that shouldn't be an issue to be honest

function RatingGraph(props) {
  const MAX_CHART_SIZE = 500;


  //picks the max of window width and max chart size to ensure fit in all mobile 
  //and desktop devices
  return (
    <div id={"Graph"}>
      <RadarChart
      outerRadius={Math.min(window.innerWidth - 10, MAX_CHART_SIZE) / 3.2}
      width={Math.min(window.innerWidth - 10, MAX_CHART_SIZE)}
      height={400}
      data={props.data}>
        <PolarGrid gridType={"circle"}/>
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[-1,10]} scale={"linear"}/>
        <Radar
          name="Graph"
          dataKey="A"
          stroke="rgb(27, 99, 162)"
          fill="rgb(27, 99, 162)"
          fillOpacity={0.7}
          dot={true}
        />
      </RadarChart>
    </div>

  );
}

export default RatingGraph;