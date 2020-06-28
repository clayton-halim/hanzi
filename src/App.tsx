import React, { useState } from "react";

import HanziRow from "./components/HanziRow";
import SelectorPanel from "./components/SelectorPanel";

import data from "./data/hanzi.json";
import "./App.css";

import { HanziData } from "./types";

const hanziMap = new Map<string, HanziData>();
const invalidHanzi = {
  character: "",
  pinyin: "INVALID",
  meaning: "INVALID",
  reading: "INVALID"
};

data.forEach(entry => hanziMap.set(entry.character, entry));

const App: React.FC = () => {
  const [hanziList, setHanziList] = useState<string[]>([]);

  const onClick = (selected: boolean, hanzi: string) => {
    if (selected) {
      setHanziList(hanziList => [...hanziList, hanzi]);
    } else {
      setHanziList(hanziList => hanziList.filter(h => h !== hanzi));
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Hanzi Worksheets</h1>
        {hanziList.map(entry => {
          const hanzi = hanziMap.get(entry) || invalidHanzi;
          return (
            <HanziRow
              key={hanzi.character}
              boxes={18}
              character={hanzi.character}
              meaning={hanzi.meaning}
              reading={hanzi.pinyin}
              onRemove={
                () => setHanziList(hanziList => hanziList.filter(h => h !== hanzi.character))
              }
            />
          );
        })}
        <SelectorPanel
          data={data}
          selectedHanzi={new Set(hanziList)}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default App;
