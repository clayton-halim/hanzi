import React, { useEffect, useState } from "react";
import FuzzySearch from "fuzzy-search";

import Selector from "../Selector";
import "./SelectorPanel.css";

export type FilterOptions = { name: string, value: string }[];

export type Props = {
  data: { value: string, [ other: string ]: any }[];
  filterOption: string,
  filterOptions: FilterOptions,
  setFilterOption: Function;
  selectedData: Set<string>;
  setSelectedData: Function;
};


const SelectorPanel: React.FC<Props> = ({
  data,
  filterOption,
  filterOptions,
  setFilterOption,
  selectedData,
  setSelectedData
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searcher = new FuzzySearch(data, ["meaning"], { sort: true });
  const searchedData = searcher.search(searchQuery);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterOption(event.target.value);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  console.log('Rendering SelectorPanel');

  useEffect(() => {
    console.log('Rendered SelectorPanel');
  })

  // const handleSelectAll = () => {
  //   searchedData.forEach(entry => {
  //     if (hanziSet.has(entry.character)) return
  //     onClick(true, entry.character);
  //   })
  // }

  // const handleRemoveSelected = () => {
    
  // }

  const handleOnClick = (selected: boolean, value: string) => {
    if (selected) {
      return () => {
        const newSet = new Set(selectedData)
        if (newSet.delete(value)) setSelectedData(newSet)
      }
    } else { 
      return () => setSelectedData(new Set(selectedData).add(value))
    }
  }

  return (
    <div className="selector-panel">
      <div className="select-tool">
        <p>Search: </p>
        <input value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="select-tool">
        <p>Filter: </p>
        <select value={filterOption} onChange={handleChange}>
          { filterOptions.map(({ name, value }) => <option key={value} value={value}>{name}</option>)}
        </select>
      </div>
      {/* <div className="select-tool">
        <button onClick={handleSelectAll}>Select all</button>
        <button onClick={handleSelectAll}>Remove selected</button>
      </div> */}
      <div className="view">
        {searchedData.map(entry => {
          const isSelected = selectedData.has(entry.value);
          return (
            <Selector
              value={entry.value}
              selected={isSelected}
              onClick={handleOnClick(isSelected, entry.value)}
            />
         )})}
      </div>
    </div>
  );
};

export default SelectorPanel;
