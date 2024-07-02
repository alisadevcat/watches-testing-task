import React, { useState, useEffect } from "react";

const formatTime = (d, isUtc) => {
  if (isUtc) {
    return d.toUTCString().slice(17, 26);
  } else {
    return d.toLocaleTimeString();
  }
};

export const TimeAndCheckbox = () => {
  const [displayedTime, setDisplayedTime] = useState(() => new Date());
  const [isUTC, setIsUTC] = useState(false);
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    const startTime = Date.now();

    let myTimeout = setTimeout(() => {
      setDisplayedTime(new Date());

      const elapsedTime = new Date() - startTime;
      const difference = elapsedTime - 1000;
  
      setDelay((d) => difference ? d - difference: 1000);
      setCount((c) => c + 1);
    }, delay);

    return () => {
     clearTimeout(myTimeout);
    };
  }, [count, delay]);

  const handleCheckbox = () => {
    setIsUTC((i) => !i);
  };

  // console.log(formatTime(displayedTime, isUTC), formatTime(displayedTime, isUTC).endsWith('0'));
  // console.log(new Date().toLocaleString("ge-GE").slice(11, 20), displayedTime);

  return (
    <>
      <div className="heading-1">{formatTime(displayedTime, isUTC)}</div>
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
    </>
  );
};
