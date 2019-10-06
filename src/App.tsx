import React, { useState } from "react";

import "./App.css";
import { HanziData } from "./types";
import HanziRow from "./components/HanziRow";
import SelectorPanel from "./components/SelectorPanel";

const App: React.FC = () => {
  const [hanziList, setHanziList] = useState<HanziData[]>([]);

  const onClick = (selected: boolean, hanzi: HanziData) => {
    if (selected) {
      setHanziList(prevHanziList => [...prevHanziList, hanzi]);
    } else {
      setHanziList(prevHanziList =>
        [...prevHanziList].filter(entry => entry.character != hanzi.character)
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Hanzi Worksheets</h1>
        {hanziList.map(entry => (
          <HanziRow
            key={entry.character}
            boxes={18}
            character={entry.character}
            meaning={entry.meaning}
            reading={entry.pinyin}
          />
        ))}
        <SelectorPanel onClick={onClick} />
      </div>
    </div>
  );
};

export default App;
