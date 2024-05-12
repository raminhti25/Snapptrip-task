import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useFetchData from "./useFetchData";

function App() {
  const { loading, error, data, refetch } = useFetchData(
    "https://swapi.dev/api/people"
  );

  if (loading) {
    return <img src={logo} className="App-logo" alt="logo" />;
  }

  if (error) {
    return <p>Something went wrong. please try again</p>;
  }

  return (
    <div className="App">
      <ul>
        {(data?.results ?? []).map((item: { name: string }) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
      <button onClick={refetch}>Refetch Data</button>
    </div>
  );
}

export default App;
