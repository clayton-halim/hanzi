import React, { useState } from "react";

import Selector from "../Selector";
import { HanziData } from "../../types";
import "./SelectorPanel.css";

export type Props = {
  data: HanziData[];
  onClick: (selected: boolean, hanzi: HanziData) => void;
};

type FilterView = "freq" | "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5" | "hsk6";

function filterData(data: HanziData[], view: FilterView) {
  switch (view) {
    case "freq":
      return [...data].sort(entry => entry.freq_rank);
    case "hsk1":
      return data.filter(entry => entry.hsk === 1);
    case "hsk2":
      return data.filter(entry => entry.hsk === 2);
    case "hsk3":
      return data.filter(entry => entry.hsk === 3);
    case "hsk4":
      return data.filter(entry => entry.hsk === 4);
    case "hsk5":
      return data.filter(entry => entry.hsk === 5);
    case "hsk6":
      return data.filter(entry => entry.hsk === 6);
  }
}

const SelectorPanel: React.FC<Props> = ({ data, onClick }: Props) => {
  const [view, setView] = useState<FilterView>("freq");

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) =>
    setView(event.currentTarget.value as FilterView);

  const filteredData = filterData(data, view);

  return (
    <div className="selector-panel">
      <div className="filter">
        <p>Filter: </p>
        <select value={view} onChange={handleChange}>
          <option value="freq">Hanzi Frequency</option>
          <option value="hsk1">HSK 1</option>
          <option value="hsk2">HSK 2</option>
          <option value="hsk3">HSK 3</option>
          <option value="hsk4">HSK 4</option>
          <option value="hsk5">HSK 5</option>
          <option value="hsk6">HSK 6</option>
        </select>
      </div>
      <div className="view">
        {filteredData.map(entry => (
          <Selector
            key={entry.character}
            character={entry.character}
            onClick={selected => onClick(selected, entry)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorPanel;
