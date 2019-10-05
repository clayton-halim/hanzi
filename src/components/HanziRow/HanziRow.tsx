import React from "react";

import HanziBox from "../HanziBox";
import "./HanziRow.css";

type Props = {
  boxes: number;
  character: string;
};

const HanziRow: React.FC<Props> = ({ boxes, character }: Props) => {
  return (
    <div className="hanzi-row">
      {new Array(boxes).fill(0).map((_, index) => (
        <HanziBox character={index < 3 ? character : ""} />
      ))}
    </div>
  );
};

export default HanziRow;
