import React from "react";

import "./Selector.css";

export type Props = {
  value: string;
  selected: boolean;
  onClick: () => void;
};

const Selector: React.FC<Props> = (props: Props) => {
  const { value, selected, onClick } = props;
  const color = selected ? "#f00" : "black";

  return (
    <div className="selector" style={{ color }} onClick={onClick}>
      {value}
    </div>
  );
};

export default Selector;
