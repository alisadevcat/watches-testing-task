import "./App.css";
import React, { useState, useEffect } from "react";
import { ImageComponent } from "./ImageComponent";
import { SelectTimesImageChange } from "./SelectTimesImageChange";
import { Checkbox } from "./Checkbox";

const formatTime = (d, isUtc) => {
  let date;
  if (isUtc) {
    date = new Date(d).toISOString();
    date = date.slice(11, 19);
  } else {
    date = new Date(d).toLocaleString("ge-GE");
    date = date.slice(11, 20);
  }
  return date;
};

export default function App() {
  const [displayedTime, setDisplayedTime] = useState(Date.now());
  const [isUTC, setIsUTC] = useState(false);
  const [timesImageChange, setTimesImageChange] = useState(1);
  const [url, setUrl] = useState("https://picsum.photos/200/300");

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setDisplayedTime(Date.now());
    }, 1000);

    return () => {
      clearTimeout(myTimeout);
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let totalInterval = 0;

    let intervalMs = (60 / timesImageChange) * 1000; // Convert minutes to milliseconds

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      totalInterval += intervalMs;
      intervalMs -= elapsedTime - totalInterval;
      fetch("https://picsum.photos/200/300").then((data) => {
        setUrl(data.url);
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [timesImageChange]);

  const handleCheckbox = (e) => {
    setIsUTC((prev)=>!prev);
    setDisplayedTime(Date.now());
  };

  const handleSelect = (e) => {
    setTimesImageChange(e.target.value);
  };

  return (
    <div className="container column">
      <div className="heading-1">{formatTime(displayedTime, isUTC)}</div>

      <Checkbox isUTC={isUTC} handleCheckbox={handleCheckbox} />

      <ImageComponent url={url} />

      <SelectTimesImageChange handleSelect={handleSelect} />
    </div>
  );
}
