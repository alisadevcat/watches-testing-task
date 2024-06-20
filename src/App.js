import "./App.css";
import React, { useState, useEffect } from "react";

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

const Checkbox = ({ isUTC, handleCheckbox }) => {
  return (
    <div className="pt-1">
      <label htmlFor="utc-checkbox">Switch to UTC</label>
      <input
        type="checkbox"
        className="utc-checkbox"
        checked={isUTC}
        name="utc"
        onChange={handleCheckbox}
      />
    </div>
  );
};

const SelectTimesImageChange = ({ handleSelect }) => {
  return (
    <select className="control" onChange={handleSelect}>
      <option value="1" defaultValue>
        1 time
      </option>
      <option value="2">2 times</option>
      <option value="3">3 times</option>
      <option value="4">4 times</option>
      <option value="5">5 times</option>
      <option value="6">6 times</option>
    </select>
  );
};

const ImageComponent = ({ url }) => {
  return (
    <div className="img">
      <img src={url} alt="img" />
    </div>
  );
};

export default function App() {
  const [displayedTime, setDisplayedTime] = useState(formatTime(Date.now()));
  const [isUTC, setIsUTC] = useState(false);
  const [timesImageChange, setTimesImageChange] = useState(1);
  const [url, setUrl] = useState("https://picsum.photos/200/300");

  useEffect(() => {
    const startTime = Date.now(); //not changed
    let totalTime = 0;
    let delay = 1000;

    const myTimeout = setInterval(() => {
      const elapsedTime = Date.now() - startTime; //how much time really have gone  = 1001/1000

      totalTime += 1000; //how much should have gone - 1000

      const difference = elapsedTime - totalTime;
      delay -= difference;

      setDisplayedTime(formatTime(Date.now(), isUTC));
    }, delay);

    return () => {
      clearTimeout(myTimeout);
    };
  });

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
    e.preventDefault();
    setIsUTC(!isUTC);
    setDisplayedTime(formatTime(Date.now(), isUTC));
  };

  const handleSelect = (e) => {
    setTimesImageChange(e.target.value);
  };

  return (
    <div className="container column">
      <div className="heading-1">{displayedTime}</div>

      <Checkbox isUTC={isUTC} handleCheckbox={handleCheckbox} />

      <ImageComponent url={url} />

      <SelectTimesImageChange handleSelect={handleSelect} />
    </div>
  );
}
