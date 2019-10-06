import React from "react";

import Selector from "../Selector";
import { HanziData } from "../../types";
import "./SelectorPanel.css";

export type Props = {
  data: HanziData[];
  onClick: (selected: boolean, hanzi: HanziData) => void;
};

const SelectorPanel: React.FC<Props> = ({ data, onClick }: Props) => {
  return (
    <div className="selector-panel">
      {data.map((entry, index) => (
        <Selector
          key={index}
          character={entry.character}
          onClick={selected => onClick(selected, entry)}
        />
      ))}
    </div>
  );
};

export default SelectorPanel;
