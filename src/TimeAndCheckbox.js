import React, { useState, useEffect } from "react";

const formatTime = (d, isUtc) => {
  if (isUtc) {
    return d.toISOString().slice(11, 19);
  } else {
    return d.toLocaleString("ge-GE").slice(11, 20);
  }
};

export const TimeAndCheckbox = () => {
  const [displayedTime, setDisplayedTime] = useState(new Date());
  const [isUTC, setIsUTC] = useState(false);

  useEffect(() => {
    console.log(new Date().toTimeString().toLocaleString("ge-GE"));

    const myTimeout = setTimeout(() => {
      setDisplayedTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(myTimeout);
    };
  }, []);

  const handleCheckbox = () => {
    setIsUTC((i) => !i);
    // setDisplayedTime(Date.now());
  };

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
