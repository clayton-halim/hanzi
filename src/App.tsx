import React from "react";
import "./App.css";
import HanziRow from "./components/HanziRow";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Hanzi Worksheets</h1>
        <HanziRow boxes={18} character="分" />
      </div>
    </div>
  );
};

export default App;
