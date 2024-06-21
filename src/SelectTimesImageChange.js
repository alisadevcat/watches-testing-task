import React, { useState, useEffect } from "react";

export const SelectTimesImageChange = () => {
  const [timesImageChange, setTimesImageChange] = useState(1);
  const [url, setUrl] = useState("https://picsum.photos/200/300");

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


  const handleSelect = (e) => {
    setTimesImageChange(e.target.value);
  };

  return (
    <>
      <div className="img">
        <img src={url} alt="img" />
      </div>
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
    </>
  );
};
