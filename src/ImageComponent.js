import React from "react";

export const ImageComponent = ({ url }) => {
    return (
      <div className="img">
        <img src={url} alt="img" />
      </div>
    );
  };
  