import React, { useState, useEffect, useMemo, useCallback } from "react";

import HanziRow, { Props as HanziRowProps } from "./components/HanziRow";
import SelectorPanel, { FilterOptions } from "./components/SelectorPanel";

import rawData from "./data/hanzi.json";
import "./App.css";

import { HanziData } from "./types";

const hanziMap = new Map<string, HanziData>();
const invalidHanzi = {
  character: "",
  pinyin: "INVALID",
  meaning: "INVALID",
  reading: "INVALID"
};

const data = rawData.map(datum => ({ ...datum, value: datum.character }));
data.forEach(entry => hanziMap.set(entry.character, entry));

const filterOptions: FilterOptions = [
  { name: 'Hanzi Frequency', value: 'freq'},
  { name: 'HSK 1', value: 'hsk1'}, 
  { name: 'HSK 2', value: 'hsk2'}, 
  { name: 'HSK 3', value: 'hsk3'}, 
  { name: 'HSK 4', value: 'hsk4'}, 
  { name: 'HSK 5', value: 'hsk5'}, 
  { name: 'HSK 6', value: 'hsk6'}
]

function filterData(filterOption: string) {
  console.log('filtering')
  if (filterOption === 'freq') return data;
  
  const hskLevel = parseInt(filterOption.charAt(filterOption.length - 1));
  return data.filter(entry => entry.hsk === hskLevel);
}

const App: React.FC = () => {
  const [selectedHanzi, setSelectedHanzi] = useState<Set<string>>(new Set());
  const [filterOption, setFilterOption] = useState(filterOptions[0].value);

  useEffect(() => {
    console.log('Rendering App')
  });

  const filteredData = useMemo(() => filterData(filterOption), [filterOption]);

  const MemoizedHanziRow = (props: Omit<HanziRowProps, 'onRemove'>) => {
    const onRemove = useCallback(() => 
      setSelectedHanzi(selectedHanzi => {
      const newSet = new Set(selectedHanzi);
      newSet.delete(props.character);
      return newSet;
    }), [props.character]);

    return <HanziRow {...props} onRemove={onRemove} />
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Hanzi Worksheets</h1>
        {Array.from(selectedHanzi).map(entry => {
          const hanzi = hanziMap.get(entry) || invalidHanzi;
          return (
            <MemoizedHanziRow
              key={hanzi.character}
              boxes={18}
              character={hanzi.character}
              meaning={hanzi.meaning}
              reading={hanzi.pinyin}
            />
          );
        })}
        <SelectorPanel
          data={filteredData}
          filterOption={filterOption}
          filterOptions={filterOptions}
          setFilterOption={setFilterOption}
          selectedData={selectedHanzi}
          setSelectedData={setSelectedHanzi}
        />
      </div>
    </div>
  );
};

export default App;
