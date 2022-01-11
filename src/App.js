import React from "react";
import reactDOM from "react-dom";
import "./App.css";
import City from "./components/City";

function App() {
  const getResults = async (zip) => {
    try {
      let response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Invalid zipcode");
      }

      let data = await response.json();
      console.log("data", data);
      return data;} 
      catch (error) {
      console.log("error", error);
    }
  };
 
  const displayResults = async () => {
    const zip = document.querySelector("#zip-input").value;
    const data = await getResults(zip);
    
    if (!data) {
      alert("Invalid zipcode");
      return;
    }

    const resultDiv = document.querySelector("#results");

    let results = [];

    for (const dataSet of data) {
      results.push(
        <City
          cityName={dataSet.City}
          city={dataSet.LocationText}
          population={dataSet.EstimatedPopulation}
          income={dataSet.TotalWages}>
          </City>
      );
    }

    reactDOM.render(results, resultDiv);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>ZIP Search</h1>
      </div>
      <div className="App-body">
        <div className="submit-area">
          <label for="zip-input" >Enter Your ZipCode Here: </label>
          <input placeholder="ZipCode" type="text" id="zip-input"></input>
        </div>
        <button onClick={displayResults}>Search</button>
        <div id="results"></div>
      </div>
    </div>
  );
}

export default App;