import React from "react";

import HanziBox from "../HanziBox";
import "./HanziRow.css";

type Props = {
  boxes: number;
  character: string;
  meaning: string;
  reading: string;
  onRemove: () => void;
};

const HanziRow: React.FC<Props> = ({
  boxes,
  character,
  meaning,
  reading,
  onRemove
}: Props) => {
  return (
    <div className="hanzi-row">
      <div className="details">
        <p className="detail-text">
          <span>MEANING:</span> {meaning}
        </p>
        <p className="detail-text">
          <span>READING:</span> {reading}
        </p>
        <button className="remove-button" onClick={onRemove}>×</button>
      </div>
      <div className="boxes">
        {new Array(boxes).fill(0).map((_, index) => (
          <HanziBox key={index} character={index < 3 ? character : ""} />
        ))}
      </div>
    </div>
  );
};

export default HanziRow;
