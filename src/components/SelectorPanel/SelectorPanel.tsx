import React from "react";

import Selector from "../Selector";
import "./SelectorPanel.css";

type HanziData = {
  character: string;
  piyin: string;
  meaning: string;
  hsk: number;
  freq_rank: number;
};

type Props = {
  data: HanziData[];
};

const SelectorPanel: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className="selector-panel">
      {data.map((entry, index) => (
        <Selector key={index} character={entry.character} />
      ))}
    </div>
  );
};

export default SelectorPanel;
