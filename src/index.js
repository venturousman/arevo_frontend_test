import React from "react";
import ReactDOM from "react-dom";
import { data, totalTrackLength } from "./sampleData";
import { process } from "./utils";
import "./styles.css";

const TimelineSegment = ({ segment, totalTrackLength }) => {
  const widthPX = (segment.end - segment.start + 10) + 'px';
  const startPosition = segment.start + 'px';
  const endPosition = segment.end + 'px';
  return (
    <div className="segment">
      <div className="start" style={{ left: startPosition, width: widthPX }}>{segment.start}</div>
      <div className="end" style={{ left: endPosition }}>{segment.end}</div>
    </div>
  )
};

// assume all data is valid and sorted by start time
const TimelineSegments = ({ data, totalTrackLength }) => {
  const result = process(data);
  return (
    <div className="container">
      {
        result.map((array, index1) => {
          return (
            <div className="segments" key={index1}>
              {
                array.map((item, index2) => {
                  const index = index1 + '.' + index2;
                  return <TimelineSegment key={index} segment={item} totalTrackLength={totalTrackLength}></TimelineSegment>
                })
              }
            </div>
          )
        })
      }
    </div>
  );
};

// boilerplate
ReactDOM.render(
  <TimelineSegments data={data} totalTrackLength={totalTrackLength} />,
  document.getElementById("root")
);
