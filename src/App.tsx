import React from "react";
import "./App.css";
import HanziRow from "./components/HanziRow";
import SelectorPanel from "./components/SelectorPanel";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>Hanzi Worksheets</h1>
        <HanziRow
          boxes={18}
          character="与"
          meaning="Part, Understand"
          reading="fun"
        />
        <SelectorPanel />
      </div>
    </div>
  );
};

export default App;
