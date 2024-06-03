
import './App.css';
import React, { useState, useEffect, memo } from "react";


const formatTime = (date) => {
  const d = new Date(date).toLocaleString('ge-GE');
  return `${d.slice(11, 20)}`;
};



const ImageComponent = memo(function ImageComponent({ ...isRound }) {
  const [url, setUrl] = useState("https://picsum.photos/200/300");

  useEffect(() => {
    if (isRound) {
      // console.log("round", url);
      //fetch("https://picsum.photos/200/300").then((data) => setUrl(data.url));
    }
  });

  // console.log(url);
  return (
    <>
      <div className="img">
        <img src={url} alt="img" />
      </div>
    </>
  );
});

export default function App() {
  const [time, setTime] = useState(formatTime(new Date()));
  const [isUTC, setIsUTC] = useState(false);
  // const [isRound, setIsRound] = useState(false);
  // const checkedValue = isUTC ? "checked" : "";

  useEffect(() => {
    let start = Date.now();

    const myTimeout = setTimeout(() => {
      const delayMargin = Date.now() - start;
      let diff = delayMargin - 1000;
      setTime(formatTime(new Date( Date.now() - diff)));
    }, 1000);

    //console.log(newMilliseconds);

    // setIsRound(checkIfSecondsAreRound(isUTC, date));

    return () => {
      clearTimeout(myTimeout);
    };
  });

  const handleCheckbox = () => {
    setIsUTC(!isUTC);
  };

  //console.log("render", time);

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading-1">{time}</h1>
        {/* 
        {/* <div className="row">
          <p>Switch to UTC</p>
          <input
            type="checkbox"
            className="utc-checkbox"
            checked={checkedValue}
            onChange={handleCheckbox}
          />
        </div> */}

        {/* <ImageComponent isRound={isRound} /> */}
      </div>
    </div>
  );
}
