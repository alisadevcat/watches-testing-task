import React from "react";

export const SelectTimesImageChange = ({ handleSelect }) => {
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
