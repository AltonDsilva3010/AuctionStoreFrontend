import React from "react";

const EpochCalc = (epochTime) => {
  const date = new Date(epochTime * 1000);

  // You can customize the date format here using various Date methods
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year} `;
};

export default EpochCalc;
