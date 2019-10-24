import React, { useState, useEffect } from "react";
import FuzzySearch from "fuzzy-search";

import Selector from "../Selector";
import { HanziData } from "../../types";
import "./SelectorPanel.css";

export type Props = {
  data: HanziData[];
  selectedHanzi: Set<string>;
  onClick: (selected: boolean, hanzi: string) => void;
};

type FilterView = "freq" | "hsk1" | "hsk2" | "hsk3" | "hsk4" | "hsk5" | "hsk6";

function filterData(data: HanziData[], view: FilterView) {
  switch (view) {
    case "freq":
      return [...data].sort(entry => entry.frequency_rank);
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

const SelectorPanel: React.FC<Props> = ({
  data,
  onClick,
  selectedHanzi
}: Props) => {
  const [view, setView] = useState<FilterView>("freq");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = filterData(data, view);
  const [searchedData, setSearchedData] = useState<HanziData[]>(filteredData);
  const searcher = new FuzzySearch(filteredData, ["meaning"], { sort: true });
  let timeout: NodeJS.Timeout | undefined;

  useEffect(() => {
    setSearchedData(searcher.search(searchQuery));
  }, [view]);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) =>
    setView(event.currentTarget.value as FilterView);

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);

    const query = event.currentTarget.value;
    setSearchQuery(query);

    timeout = setTimeout(() => {
      setSearchedData(searcher.search(query));
    }, 700);
  };

  return (
    <div className="selector-panel">
      <div className="select-tool">
        <p>Search: </p>
        <input value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="select-tool">
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
        {searchedData.map(entry => (
          <Selector
            key={entry.character}
            character={entry.character}
            selected={selectedHanzi.has(entry.character)}
            onClick={selected => onClick(selected, entry.character)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectorPanel;
