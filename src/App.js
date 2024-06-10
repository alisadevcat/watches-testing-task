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

const checkIfSecondsAreRound = (time) => {
  return time.endsWith("0");
};

const handleTimesImageChanged = (changetTime, time) => {
  const variants = {
    2: ['30','00'],
    3: ['20','40','00'],
    4: ['15', '30', '45', '60'],
    5: ['12', '24', '36', '48', '60'],
    6: ['10', '20', '30', '40', '50', '60']
  }
 return variants[changetTime];
};

export default function App() {
  const [time, setTime] = useState(formatTime(new Date()));
  const [isUTC, setIsUTC] = useState(false);
  const [isRound, setIsRound] = useState(false);
  const [changeImageTime, setChangeImageTime] = useState(1);
  const [url, setUrl] = useState("https://picsum.photos/200/300");
  const checkedValue = isUTC ? "checked" : "";

  useEffect(() => {
    const myTimeout = setInterval(() => {
      const formatedTime = formatTime(new Date(Date.now()), isUTC);
      setTime(formatedTime);
      setIsRound(checkIfSecondsAreRound(time));
    }, 1000);

    return () => {
      clearInterval(myTimeout);
    };
  }, [isUTC, time]);


  useEffect(() => {
  
    if (changeImageTime === 1) {
      if (isRound) {
        fetch("https://picsum.photos/200/300").then((data) => {
          setUrl(data.url);
        });
      } 
    } else {
    const seconds = handleTimesImageChanged(changeImageTime, time);
    
    seconds.forEach((sec)=>{
      if(time.endsWith(`${sec}`)){
        fetch("https://picsum.photos/200/300").then((data) => {
          setUrl(data.url);
        });
      };
    })
    }
  }, [changeImageTime, time, isRound]);

  const handleCheckbox = () => {
    setIsUTC(!isUTC);
  };

  const handleSelect = (e) => {
    setChangeImageTime(e.target.value);
  };

  return (
    <div className="container column ">
      <div className="heading-1">{time}</div>

      <div className="pt-1">
        <label htmlFor="utc-checkbox">Switch to UTC</label>
        <input
          type="checkbox"
          className="utc-checkbox"
          checked={checkedValue}
          name="utc"
          onChange={handleCheckbox}
        />
      </div>

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
    </div>
  );
}
