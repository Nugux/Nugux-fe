import React from "react";

function TouristPlace({ imageSrc, placeName }) {
  return (
    <div>
      <img src={imageSrc} />
      <h2>{placeName}</h2>
    </div>
  );
}

export default TouristPlace;