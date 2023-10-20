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



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

//issues: the chart scaling is a bit weird with sudden shifts between
//        mobile and web view but that shouldn't be an issue to be honest

function RatingGraph(props) {
  const {DEVICE_WIDTH, DEVICE_HEIGHT} = useWindowDimensions() 
  const MIN_CHART_WIDTH = 200;

  return (
    <div id={"Graph"}>
      <RadarChart
      outerRadius={Math.min(window.innerWidth - 10, 500) / 3.2}
      width={Math.min(window.innerWidth - 10, 500)}
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