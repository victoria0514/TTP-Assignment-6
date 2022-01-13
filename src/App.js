import React from "react";
import reactDOM from "react-dom";
import City from "./components/City";
import "./App.css";

function App() {
  const getResults = async (zip) => {
    try {
      // fetching the request
      // let response = await fetch('resource[, options]');
      let response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`);
      // waits until the request completes  
      console.log("response", response);

      // throwing an error
      if (!response.ok) {
        throw new Error("Invalid zipcode");
      }
      // Fetching data using promise
      let data = await response.json();
      // gets the data
      console.log("data", data);
      return data;} 
      catch (error) {
        // if something goes wrong, will catch here
      console.log("error", error);
    }
  };
  
  // inputting zipcode and getting data
  const displayResults = async () => {
    const zip = document.querySelector("#zip-input").value;
    const data = await getResults(zip);
    
    // if the zipcode is not located in the data
    if (!data) {
      alert("Invalid zipcode");
      return;
    }

    const resultDiv = document.querySelector("#results");

    let results = [];

    // pushing the results
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
    // using render to pass everything in
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

// Couple Lines from render function and getData to new data - adapted from here:
// URL: https://stackoverflow.com/questions/39866876/how-to-setstate-to-new-data-in-react


export default App;