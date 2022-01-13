import React from "react";

function City(props) {
  return (
    <div>
      <div className="header">
        <h2>{props.cityName}</h2>
      </div>
      <div className="box">
        <ul>
          <li>City, State: {props.city}</li>
          <li>Est. Population: {props.population}</li>
          <li>Total Income Earnings: ${props.income}</li>
        </ul>
      </div>
    </div>
  );
}

export default City;