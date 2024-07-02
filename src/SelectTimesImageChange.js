import React, { useState, useEffect, useRef } from "react";

const convertToMiliseconds = (timesImageChange) => {
  return (60 / timesImageChange) * 1000;
};

export const SelectTimesImageChange = () => {
  const [intervalMs, setIntervalMs] = useState(6000);
  const [url, setUrl] = useState("https://picsum.photos/200/300");
  // const [ setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startTime = Date.now();

    const myTimeout = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const dif = elapsedTime - intervalMs;
      countRef.current +=1;
      setIntervalMs((i) => i - dif);

      fetch("https://picsum.photos/200/300").then((data) => {
        setUrl(data.url);
      });

      // console.log(intervalMs, new Date());
    }, intervalMs);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [intervalMs, countRef]);

  const handleSelect = (e) => {
    setIntervalMs(convertToMiliseconds(e.target.value));
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
