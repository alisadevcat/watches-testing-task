import React from "react";

export const Checkbox = ({ isUTC, handleCheckbox }) => {
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